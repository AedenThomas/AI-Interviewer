"use client";
import { useRouter } from 'next/router'
import Layout from "@/layouts/Layout";
import CallEndIcon from '@material-ui/icons/CallEnd';
import React, { useEffect, useState, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, Typography } from '@mui/material';
import useFirestore from '@/hooks/useFirestore';
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { AudioConfig, ResultReason, SpeechConfig, SpeechRecognizer } from "microsoft-cognitiveservices-speech-sdk";
import { CohereClient } from "cohere-ai";

declare const GazeRecorderAPI: any;
declare const GazePlayer: any;

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // API key for Google Generative AI. Put it in .env
const MICROSOFT_SPEECH_API_KEY = process.env.NEXT_PUBLIC_MICROSOFT_SPEECH_API_KEY || ''; // API key for Microsoft Speech API. Put it in .env

if (!API_KEY || !MICROSOFT_SPEECH_API_KEY) {
    throw new Error("API_KEY and MICROSOFT_SPEECH_API_KEY must be defined in the environment variables");
}

// Define the GazeData type
interface GazeData {
    docX: number;
    docY: number;
    state: number;
}

// Define the GazeCloudAPI interface outside the component
declare const GazeCloudAPI: {
    OnCalibrationComplete: () => void;
    OnCamDenied: () => void;
    OnError: (msg: string) => void;
    UseClickRecalibration: boolean;
    OnResult: (data: GazeData) => void;
    StartEyeTracking: () => void;
    StopEyeTracking: () => void;
};

const speakText = async (text: string, recognizer: sdk.SpeechRecognizer) => {
    console.log("speakText function called with text:", text);
    const speechConfig = sdk.SpeechConfig.fromSubscription(MICROSOFT_SPEECH_API_KEY, "centralindia");
    const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    console.log("Stopping recognizer...");
    await recognizer.stopContinuousRecognitionAsync();
    console.log("Recognizer stopped.");

    return new Promise((resolve, reject) => {
        console.log("Starting to speak text...");
        synthesizer.speakTextAsync(text,
            async function (result) {
                console.log("speakTextAsync callback called with result:", result);
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    console.log("synthesis finished.");
                    synthesizer.close();
                    console.log("Synthesizer closed.");
                    console.log("result.audioDuration:", result.audioDuration);


                    const speechDurationMs = result.audioDuration / 10000;


                    console.log(`Waiting for ${speechDurationMs} ms before starting recognizer...`);
                    await new Promise(resolve => setTimeout(resolve, speechDurationMs));
                    console.log("Starting recognizer...");
                    recognizer.startContinuousRecognitionAsync();
                    console.log("Recognizer started.");

                    resolve(null);
                } else {
                    console.error("Speech synthesis canceled, " + result.errorDetails);
                    reject(result.errorDetails);
                }
            },
            function (err) {
                console.trace("speakTextAsync error callback called with error:", err);
                synthesizer.close();
                console.log("Synthesizer closed due to error.");
                reject(err);
            }
        );
    }).catch((err) => {

        console.log("Error occurred, starting recognizer...");
        recognizer.startContinuousRecognitionAsync();
        console.log("Recognizer started after error.");
        throw err;
    });
}




const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
// const cohere = new CohereClient({ token: "", });

const generationConfig = {
    temperature: 0.4,
    topK: 15,
    topP: 0.8,
    maxOutputTokens: 300,
};



export default function InterviewScreen() {
    // console.log('InterviewScreen rendered');

    const hasFetchedAnswers = useRef(false);

    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState<string>('');
    const [answers, setAnswers] = useState<string[]>([]);
    const hasRun = useRef(false);
    const { uuid } = router.query;
    const { getInterviewDetails, addInterviewHistory } = useFirestore();
    const { addFeedbackAnalysis } = useFirestore();
    const [interviewDetails, setInterviewDetails] = useState(null);

    const [recognizedTexts, setRecognizedTexts] = useState<string[]>([]);
    const questions = [
        "Yes, please start the interview",
    ];
    const [currentCalibrationPoint, setCurrentCalibrationPoint] = useState<number>(0);

    const [webGazerInitialized, setWebGazerInitialized] = useState(false);
    const [calibrationDone, setCalibrationDone] = useState(false);
    const calibrationPoints = [
        { x: '10%', y: '20%' },
        { x: '50%', y: '50%' },
        { x: '90%', y: '80%' },
        { x: '90%', y: '20%' },
        { x: '10%', y: '80%' },
        { x: '50%', y: '20%' },
        { x: '50%', y: '80%' },
    ];

    const [validationPoints, setValidationPoints] = useState([
        { x: '20%', y: '30%' },
        { x: '80%', y: '30%' },
        { x: '50%', y: '50%' },
        // Add more points as needed
    ]);
    const [currentValidationPoint, setCurrentValidationPoint] = useState(0);
    const [validationDone, setValidationDone] = useState(false);

    // Function to create a calibration point


    const [faceDetected, setFaceDetected] = useState(false);




    // Create the speech config
    const speechConfig = sdk.SpeechConfig.fromSubscription(MICROSOFT_SPEECH_API_KEY, "centralindia");

    // Create an audio config for the microphone
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

    // Create the speech recognizer
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);





    useEffect(() => {
        // Load GazeCloudAPI script
        const cloudScript = document.createElement('script');
        cloudScript.src = "https://api.gazerecorder.com/GazeCloudAPI.js";
        cloudScript.async = true;
        document.body.appendChild(cloudScript);

        // Load GazeRecorderAPI script
        const recorderScript = document.createElement('script');
        recorderScript.src = "https://app.gazerecorder.com/GazeRecorderAPI.js";
        recorderScript.async = true;
        document.body.appendChild(recorderScript);

        // Load GazePlayer script
        const playerScript = document.createElement('script');
        playerScript.src = "https://app.gazerecorder.com/GazePlayer.js";
        playerScript.async = true;
        document.body.appendChild(playerScript);


        const initializeGazeCloudAPI = () => {
            const processGaze = (GazeData: GazeData) => {
                const x_ = GazeData.docX;
                const y_ = GazeData.docY;
                // console.log(`Gaze X: ${x_}, Gaze Y: ${y_}`);

                const gazeIndicator = document.getElementById('gazeIndicator');
                if (gazeIndicator) {
                    gazeIndicator.style.left = `${x_}px`;
                    gazeIndicator.style.top = `${y_}px`;
                } else {
                    const newGazeIndicator = document.createElement('div');
                    newGazeIndicator.id = 'gazeIndicator';
                    newGazeIndicator.style.position = 'absolute';
                    newGazeIndicator.style.width = '10px';
                    newGazeIndicator.style.height = '10px';
                    newGazeIndicator.style.backgroundColor = 'red';
                    newGazeIndicator.style.borderRadius = '50%';
                    newGazeIndicator.style.left = `${x_}px`;
                    newGazeIndicator.style.top = `${y_}px`;
                    newGazeIndicator.style.zIndex = '9999';
                    document.body.appendChild(newGazeIndicator);
                }
            };

            GazeCloudAPI.OnCalibrationComplete = function () {
                setCalibrationDone(true);
                console.log('Gaze Calibration Complete');
            };
            GazeCloudAPI.OnCamDenied = function () {
                console.log('Camera access denied');
            };
            GazeCloudAPI.OnError = function (msg: string) {
                console.log('Error: ' + msg);
            };
            GazeCloudAPI.UseClickRecalibration = true;
            GazeCloudAPI.OnResult = processGaze;
        };

        cloudScript.onload = () => {
            initializeGazeCloudAPI();
            GazeCloudAPI.StartEyeTracking(); // Start eye tracking
        };

        return () => {
            document.body.removeChild(cloudScript);
            document.body.removeChild(recorderScript);
            document.body.removeChild(playerScript);
        };
    }, []);



    const endCall = async () => {
        // Stop eye tracking and recording
        GazeCloudAPI.StopEyeTracking();
        GazeRecorderAPI.StopRec();
      
        // Get the recorded session data
        const sessionReplayData = GazeRecorderAPI.GetRecData();
      
        // Play the recorded session
        GazePlayer.SetCountainer(document.getElementById('playerdiv'));
        GazePlayer.PlayResultsData(sessionReplayData);



        const uuidFromPath = router.asPath as string;
        const uuid = uuidFromPath.substring(1);
        console.log('UUID:', uuid);
        if (!uuid) {
            console.log("UUID is not defined");
            return;
        }

        console.log("Call ended. Final history:");
        console.log(history);




        // Add the history to Firestore
        const success = await addInterviewHistory(uuid as string, history);
        if (success) {
            console.log("Interview history added successfully");
        } else {
            console.log("Error adding interview history");
        }

        // Send the history to Google's AI
        const chatA = model.startChat({
            history: [
                {
                    role: "user",
                    parts: "Hi."
                },
                {
                    role: "model",
                    parts: "How can I help you?"
                }
            ],
        });

        // Read the response
        const response = await chatA.sendMessageStream(`Analyze the provided interview script and generate a JSON-formatted evaluation of the candidate's performance. The evaluation should include scores out of 100 for overall suitability, communication skills (clarity, articulation, listening skills), confidence (body language, eye contact, posture), and the presence of relevant keywords (industry terms, key phrases, technical jargon).

        For overall suitability, consider the candidate's ability to demonstrate relevant knowledge, experience, and qualifications for the role. Evaluate their responses to ensure they align with the job requirements and company culture.
        
        For communication skills, assess the following:
        
            Clarity: How well the candidate expresses their thoughts and ideas in a clear and concise manner.
            Articulation: The candidate's ability to speak fluently and coherently, without excessive filler words or verbal tics.
            Listening Skills: Whether the candidate actively listens to the interviewer's questions and provides relevant responses.
        
        For confidence, evaluate the following:
        
            Body Language: The candidate's nonverbal cues, such as gestures, facial expressions, and overall presence.
            Eye Contact: Whether the candidate maintains appropriate eye contact with the interviewer.
            Posture: The candidate's physical demeanor, including sitting or standing up straight.
        
        For relevant keywords, assess the following:
        
            Industry Terms: The candidate's use of industry-specific terminology and concepts relevant to the role.
            Key Phrases: The inclusion of key phrases or buzzwords that demonstrate an understanding of the company's goals, values, and expectations.
            Technical Jargon: The candidate's ability to use and explain technical jargon or concepts specific to the role or industry.
        
        Additionally, provide AI insights that highlight the candidate's strengths and areas for improvement, based on the evaluation criteria. Use the following structure as a template for the expected JSON output:

      {
        "evaluation": {
          "overallSuitability": "[Overall Suitability Score]",
          "communicationSkills": {
            "clarity": "[Clarity Score]",
            "articulation": "[Articulation Score]",
            "listeningSkills": "[Listening Skills Score]"
          },
          "confidence": {
            "bodyLanguage": "[Body Language Score]",
            "eyeContact": "[Eye Contact Score]",
            "posture": "[Posture Score]"
          },
          "relevantKeywords": {
            "industryTerms": "[Industry Terms Score]",
            "keyPhrases": "[Key Phrases Score]",
            "technicalJargon": "[Technical Jargon Score]"
          }
        },
        "aiInsights": {
          "strengths": [
            "[List strengths here]"
          ],
          "areasForImprovement": [
            "[List areas for improvement here]"
          ]
        }
      }

     ${history}`);

        let feedbackAnalysis = '';
        for await (const chunk of response.stream) {
            const chunkText = await chunk.text();
            feedbackAnalysis += chunkText;
        }

        // Log the feedbackAnalysis
        feedbackAnalysis = feedbackAnalysis.replace(/```/g, '');
        console.log("Feedback analysis:");
        // console.log("feedbackAnalysis" + feedbackAnalysis);

        // Check if feedbackAnalysis is a valid JSON string
        try {
            let cleanedFeedbackAnalysis = feedbackAnalysis.replace(/^JSON\n/, '').trim();
            let responseJSON = JSON.parse(cleanedFeedbackAnalysis);
            console.log("Response JSON:");
            // console.log("Response JSON:", responseJSON);
        } catch (error) {
            console.error("Invalid JSON string:", feedbackAnalysis);
        }


        const successForFeedback = await addFeedbackAnalysis(uuid as string, feedbackAnalysis);
        if (successForFeedback) {
            console.log("Feedback analysis added successfully");
        } else {
            console.log("Error adding feedback analysis");
        }




    };


    // Google Gemini AI
    const fetchAnswers = async (chat: any) => {
        let newAnswers: string[] = [];

        for (let i = 0; i < questions.length; i++) {
            try {
                console.log(`Fetching answer for question ${i + 1}`);
                setHistory(prevHistory => [...prevHistory, `Candidate: ${questions[i]}`]);
                const response = await chat.sendMessageStream(questions[i]);

                let answer = '';
                for await (const chunk of response.stream) {
                    const chunkText = await chunk.text();
                    answer += chunkText;
                }

                newAnswers.push(answer);
                console.log(`Answer for question ${i + 1} fetched successfully`);
                setHistory(prevHistory => [...prevHistory, `Interviewer: ${answer}`]);
                setAnswers(prevAnswers => [...prevAnswers, answer]);

                await speakText(answer, recognizer);
            } catch (error) {
                console.error("Error fetching answer:", error);
            }
        }
    }





    // Cohere
    // const fetchAnswers = async () => {
    //     let newAnswers: string[] = [];

    //     for (let i = 0; i < questions.length; i++) {
    //         try {
    //             console.log(`Fetching answer for question ${i + 1}`);
    //             setHistory(prevHistory => [...prevHistory, `Candidate: ${questions[i]}`]);
    //             const chatStream = await cohere.chatStream({
    //                 chatHistory: [
    //                     {
    //                         role: "USER",
    //                         message: questions[i]
    //                     }
    //                 ],
    //                 message: questions[i],
    //                 connectors: [{ id: "web-search" }]
    //             });

    //             let answer = '';
    //             for await (const message of chatStream) {
    //                 if (message.eventType === "text-generation") {
    //                     answer += message.text;
    //                 }
    //             }

    //             newAnswers.push(answer);
    //             console.log(`Answer for question ${i + 1} fetched successfully`);
    //             setHistory(prevHistory => [...prevHistory, `Interviewer: ${answer}`]);
    //             setAnswers(prevAnswers => [...prevAnswers, answer]);

    //             await speakText(answer, recognizer);
    //         } catch (error) {
    //             console.error("Error fetching answer:", error);
    //         }
    //     }
    // }






    // Uncomment the following useEffect to fetch answers from the model
    // console.log('Current path:', router.asPath);
    useEffect(() => {

        // if (!hasRun.current) {
        let chat: any;

        // console.log('useEffect is running');

        // console.log('Answers state:', answers);

        if (router.isReady && calibrationDone && router.asPath != '/[id]' && !hasFetchedAnswers.current) {


            // Cohere
            // const fetchData = async () => {
            //     const uuidFromPath = router.asPath.replace('/', '') as string;
            //     const data = await getInterviewDetails(uuidFromPath);
            //     console.log('Data fetched:');
            //     console.log('Data:', data);
            //     setInterviewDetails(data);
            //     let userPrompt: string = "My name is " + data.nameofCandidate + ". This is the content of my resume: " + data.pdfText;

            //     let modelPrompt: string = "I am an AI assistant designed to conduct technical interviews. The job description for this interview is: " + data.description + "I will be asking you these predefined questions at some point in the interview: " + data.questions + "After your response to each question, I may ask follow-up questions based on your answer. I will also be asking questions on these keywords: " + data.keywords + "Please note that I will not acknowledge or confirm if I am an AI model. My role is to simulate a real-life interview experience. I will ask you a series of predefined questions and follow-up questions based on your responses. I expect you to provide detailed, thoughtful, and technically accurate answers. Please note that I will not acknowledge or confirm whether I am an AI model or not. I will keep my questions concise and focused. If your response is incomplete, inaccurate, or lacks sufficient detail, I will provide a short constructive feedback and ask you to clarify or expand your answer. Are you ready to begin the interview?"

            //     console.log('User Prompt:', userPrompt);
            //     const chatStream = await cohere.chatStream({
            //         chatHistory: [

            //             {
            //                 role: "USER",
            //                 message: "Hi"
            //             },
            //             {
            //                 role: "CHATBOT",
            //                 message: "Hi"
            //             }
            //         ],
            //         message: userPrompt,
            //         connectors: [{ id: "web-search" }]
            //     });

            //     console.log("Chat"); // Debugging statement

            //     console.log("Fetching answers...");
            //     await fetchAnswers();
            //     hasFetchedAnswers.current = true;
            //     navigator.mediaDevices.getUserMedia({ audio: true })
            //         .then(stream => {
            //             // Create an audio config from the stream
            //             const audioConfig = AudioConfig.fromStreamInput(stream);

            //             // Create the speech recognizer
            //             const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

            //             // Subscribe to the recognized event
            //             recognizer.recognized = async (s, e) => {
            //                 if (e.result.reason === ResultReason.RecognizedSpeech) {
            //                     console.log(`Text Recognized: ${e.result.text}`);

            //                     setRecognizedTexts(prevTexts => [...prevTexts, e.result.text]);
            //                     setHistory(prevHistory => [...prevHistory, `Candidate: ${e.result.text}`]);

            //                     // Send the recognized text to Cohere API
            //                     const chatStream = await cohere.chatStream({
            //                         chatHistory: [
            //                             {
            //                                 role: "USER",
            //                                 message: e.result.text
            //                             }
            //                         ],
            //                         message: e.result.text,
            //                         connectors: [{ id: "web-search" }]
            //                     });

            //                     let answer = '';
            //                     for await (const message of chatStream) {
            //                         if (message.eventType === "text-generation") {
            //                             answer += message.text;
            //                         }
            //                     }

            //                     setAnswers(prevAnswers => [...prevAnswers, answer]);
            //                     setHistory(prevHistory => [...prevHistory, `Interviewer: ${answer}`]);
            //                     await speakText(answer, recognizer);
            //                 } else if (e.result.reason === ResultReason.NoMatch) {
            //                     console.log("No speech could be recognized.");
            //                 }
            //             };

            //             // Subscribe to the session stopped event
            //             recognizer.sessionStopped = (s, e) => {
            //                 console.log("\n    Session stopped event.");
            //                 recognizer.stopContinuousRecognitionAsync();
            //             };

            //             // Start continuous recognition
            //             recognizer.startContinuousRecognitionAsync();
            //         })
            //         .catch(error => {
            //             console.error(`Error getting user media: ${error}`);
            //         });
            // };

            // Gemini 
            const fetchData = async () => {
                // console.log('Fetching data...');
                const uuidFromPath = router.asPath.replace('/', '') as string;
                const data = await getInterviewDetails(uuidFromPath);
                console.log('Data fetched:');
                console.log('Data:', data);
                setInterviewDetails(data);


                const chat = model.startChat({
                    generationConfig,
                    history: [
                        {
                            role: "user",
                            parts: [{ text: "System prompt: You are an AI assistant designed to conduct thorough and unbiased technical interviews. Your goal is to assess the candidate's technical knowledge, problem-solving abilities, and communication skills objectively and professionally. The job description for this interview is: " + data.description + "You will ask the candidate a series of predefined questions related to the job role: " + data.questions + "After each response, you should critically analyze the answer and ask relevant follow-up questions to probe deeper into the candidate's understanding and experience. Additionally, you will explore the candidate's knowledge and capabilities on these key areas and technical keywords: " + data.keywords + "Throughout the interview, you should maintain a friendly yet professional demeanor. If the candidate's response is incomplete, inaccurate, or lacks sufficient detail, provide constructive feedback and politely ask them to clarify or expand their answer. However, avoid being overly critical or dismissive." + "The candidate's name is " + data.nameofCandidate + ". This is the content of the candidate's resume: " + data.pdfText + "You should incorporate relevant details from their resume into your line of questioning and assessment. Please note that you should not acknowledge or confirm whether you are an AI model or not. Your role is to simulate a real-life interview experience as closely as possible, conducted by a knowledgeable and experienced human interviewer.You should keep your questions concise, focused, and tailored to the specific job role and the candidate's background. Avoid asking irrelevant or overly broad questions that could lead the conversation astray. Throughout the interview, you should maintain objectivity and avoid any form of bias or discrimination based on the candidate's personal characteristics or background. Your responses should be thorough, insightful, and showcase your deep understanding of the technical domain and interviewing best practices. Only ask one question at one time, and do not give the answer. Your role is to just ask questions. Respond understood if you got it." }],
                        },
                        {
                            role: "model",
                            parts: [{ text: "Understood." }],

                        },
                        {
                            role: "user",
                            parts: "I am ready to start the interview."

                        },
                        {
                            role: "model",
                            parts: "Great! I am going to start with the first question"
                        }
                    ],
                });

                console.log("Chat"); // Debugging statement

                // console.log("Fetching answers...");
                // fetchAnswers(chat, data.questions);

                console.log("Fetching answers...");
                await fetchAnswers(chat);
                hasFetchedAnswers.current = true;

                // Camera
                // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                //     navigator.mediaDevices.getUserMedia({ video: true })
                //         .then(stream => {
                //             if (videoRef.current) {
                //                 videoRef.current.srcObject = stream;
                //             }
                //         })
                //         .catch(err => console.error(err));
                // }

                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => {
                        // Create an audio config from the stream
                        const audioConfig = AudioConfig.fromStreamInput(stream);

                        // Create the speech recognizer
                        const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

                        // Subscribe to the recognized event
                        recognizer.recognized = async (s, e) => {
                            if (e.result.reason === ResultReason.RecognizedSpeech) {
                                console.log(`Text Recognized:`);
                                // console.log(`Text Recognized: ${e.result.text}`);

                                setRecognizedTexts(prevTexts => [...prevTexts, e.result.text]);
                                setHistory(prevHistory => [...prevHistory, `Candidate: ${e.result.text}`]);
                                // Send the recognized text to Google AI
                                const response = await chat.sendMessageStream(e.result.text);
                                let answer = '';
                                for await (const chunk of response.stream) {
                                    const chunkText = await chunk.text();
                                    answer += chunkText;
                                    // console.log('Chunk text:', chunkText);
                                }
                                // console.log('Answer:', answer);
                                setAnswers(prevAnswers => [...prevAnswers, answer]);
                                setHistory(prevHistory => [...prevHistory, `Interviewer: ${answer}`]);
                                await speakText(answer, recognizer);
                            } else if (e.result.reason === ResultReason.NoMatch) {
                                console.log("No speech could be recognized.");
                            }
                        };

                        // Subscribe to the session stopped event
                        recognizer.sessionStopped = (s, e) => {
                            console.log("\n    Session stopped event.");
                            recognizer.stopContinuousRecognitionAsync();
                        };

                        // Start continuous recognition
                        recognizer.startContinuousRecognitionAsync();
                    })
                    .catch(error => {
                        console.error(`Error getting user media: ${error}`);
                    });

            };


            fetchData();
        }







        hasRun.current = true;
        // }
    }, [router.isReady, calibrationDone]);



    return (
        <Layout>

            <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <button onClick={endCall} style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px 20px',
                        color: 'red'
                    }}>
                        <CallEndIcon style={{ marginRight: '20px', fontSize: '30px', color: 'red' }} />
                        End Call
                    </button>
                </div>
                <div style={{
                    width: 'calc(40% - 6rem)',
                    backgroundColor: 'white',
                    padding: '2rem',
                    boxSizing: 'border-box'
                }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Questions</div>
                    <div style={{ fontSize: '1.2rem', lineHeight: '1.5', maxHeight: '90%', overflowY: 'auto' }}>
                        {answers.map((answer, index) => {
                            return (
                                <Card key={index} sx={{ marginBottom: '1rem' }}>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom style={{ color: 'black', fontWeight: 'bold' }} component="div">
                                            <ReactMarkdown>{answer}</ReactMarkdown>
                                        </Typography>
                                        <Typography variant="body2" component="div">
                                            Candidate: {recognizedTexts[index]}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>

        </Layout>
    );

}  