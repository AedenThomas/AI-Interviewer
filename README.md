# AutomatedInterview.ai

## Project Overview
AutomatedInterview.ai is a sophisticated web application designed to revolutionize the interview process through AI-driven automation. It provides a platform for conducting, analyzing, and providing feedback on interviews, catering to both interviewers and candidates.

## Key Features
- AI-powered interview conduction using Google's Generative AI
- Real-time speech-to-text and text-to-speech capabilities
- Video recording and playback of interviews
- Comprehensive feedback analysis with scoring on various parameters
- User authentication and authorization
- Responsive design for mobile and desktop use
- Interview scheduling and management for employers
- Personalized interview experiences based on candidate profiles

## Technologies Used
- Next.js 13 (React framework)
- TypeScript
- Firebase (Authentication, Firestore, Storage)
- Google Generative AI API
- Microsoft Cognitive Services Speech SDK
- Material-UI (MUI) components
- Tailwind CSS
- Ant Design components

## Setup and Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following variables:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
     NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
     NEXT_PUBLIC_MICROSOFT_SPEECH_API_KEY=your_microsoft_speech_api_key
     ```
4. Run the development server: `npm run dev`

## Usage
1. Register or log in to the application
2. For employers:
   - Create new interview sessions
   - View and manage existing interviews
   - Access feedback and analytics for completed interviews
3. For candidates:
   - Join interview sessions using provided links
   - Participate in AI-driven interviews
   - Receive immediate feedback and performance analysis

## Contributing
Contributions are welcome! Please fork the repository and submit pull requests with any enhancements.

## License
This project is licensed under the MIT License.
