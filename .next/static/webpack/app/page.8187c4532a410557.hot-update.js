"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./firebase/firebase.ts":
/*!******************************!*\
  !*** ./firebase/firebase.ts ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   app: function() { return /* binding */ app; },\n/* harmony export */   auth: function() { return /* binding */ auth; },\n/* harmony export */   db: function() { return /* binding */ db; },\n/* harmony export */   storage: function() { return /* binding */ storage; }\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"(app-pages-browser)/./node_modules/firebase/app/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"(app-pages-browser)/./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/storage */ \"(app-pages-browser)/./node_modules/firebase/storage/dist/esm/index.esm.js\");\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"(app-pages-browser)/./node_modules/next/dist/build/polyfills/process.js\");\n// /Users/aeden/Developer/AI-Interviewer/firebase/firebase.ts\n// Import the functions you need from the SDKs you need\n\n\n\n\nconsole.log(\"AIzaSyDDO9i-3eiHxG9X5hgCMGdNE8NEYU1KqcY\");\n// TODO: Add SDKs for Firebase products that you want to use\n// https://firebase.google.com/docs/web/setup#available-libraries\n// Your web app's Firebase configuration\n// For Firebase JS SDK v7.20.0 and later, measurementId is optional\nconst firebaseConfig = {\n    apiKey: process.env.FIREBASE_API_KEY,\n    authDomain: process.env.FIREBASE_AUTH_DOMAIN,\n    projectId: process.env.FIREBASE_PROJECT_ID,\n    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,\n    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,\n    appId: process.env.FIREBASE_APP_ID\n};\n// Initialize Firebase\nconst app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\n// const analytics = getAnalytics(app);\nconst auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);\nconst storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.getStorage)(app);\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2ZpcmViYXNlL2ZpcmViYXNlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZEQUE2RDtBQUM3RCx1REFBdUQ7QUFDVjtBQUVMO0FBQ1U7QUFDSjtBQUU5Q0ksUUFBUUMsR0FBRyxDQUFDQyx5Q0FBd0M7QUFFcEQsNERBQTREO0FBQzVELGlFQUFpRTtBQUVqRSx3Q0FBd0M7QUFDeEMsbUVBQW1FO0FBQ25FLE1BQU1HLGlCQUFpQjtJQUNyQkMsUUFBUUosT0FBT0EsQ0FBQ0MsR0FBRyxDQUFDSSxnQkFBZ0I7SUFDcENDLFlBQVlOLE9BQU9BLENBQUNDLEdBQUcsQ0FBQ00sb0JBQW9CO0lBQzVDQyxXQUFXUixPQUFPQSxDQUFDQyxHQUFHLENBQUNRLG1CQUFtQjtJQUMxQ0MsZUFBZVYsT0FBT0EsQ0FBQ0MsR0FBRyxDQUFDVSx1QkFBdUI7SUFDbERDLG1CQUFtQlosT0FBT0EsQ0FBQ0MsR0FBRyxDQUFDWSw0QkFBNEI7SUFDM0RDLE9BQU9kLE9BQU9BLENBQUNDLEdBQUcsQ0FBQ2MsZUFBZTtBQUNwQztBQUVBLHNCQUFzQjtBQUN0QixNQUFNQyxNQUFNdEIsMkRBQWFBLENBQUNTO0FBQzFCLHVDQUF1QztBQUN2QyxNQUFNYyxPQUFPdEIsc0RBQU9BLENBQUNxQjtBQUNyQixNQUFNRSxLQUFLdEIsZ0VBQVlBLENBQUNvQjtBQUN4QixNQUFNRyxVQUFVdEIsNERBQVVBLENBQUNtQjtBQUVPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2ZpcmViYXNlL2ZpcmViYXNlLnRzPzllZDUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gL1VzZXJzL2FlZGVuL0RldmVsb3Blci9BSS1JbnRlcnZpZXdlci9maXJlYmFzZS9maXJlYmFzZS50c1xuLy8gSW1wb3J0IHRoZSBmdW5jdGlvbnMgeW91IG5lZWQgZnJvbSB0aGUgU0RLcyB5b3UgbmVlZFxuaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCB9IGZyb20gXCJmaXJlYmFzZS9hcHBcIjtcbmltcG9ydCB7IGdldEFuYWx5dGljcyB9IGZyb20gXCJmaXJlYmFzZS9hbmFseXRpY3NcIjtcbmltcG9ydCB7IGdldEF1dGggfSBmcm9tIFwiZmlyZWJhc2UvYXV0aFwiO1xuaW1wb3J0IHsgZ2V0RmlyZXN0b3JlIH0gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xuaW1wb3J0IHsgZ2V0U3RvcmFnZSB9IGZyb20gXCJmaXJlYmFzZS9zdG9yYWdlXCI7XG5cbmNvbnNvbGUubG9nKHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQSV9LRVkpO1xuXG4vLyBUT0RPOiBBZGQgU0RLcyBmb3IgRmlyZWJhc2UgcHJvZHVjdHMgdGhhdCB5b3Ugd2FudCB0byB1c2Vcbi8vIGh0dHBzOi8vZmlyZWJhc2UuZ29vZ2xlLmNvbS9kb2NzL3dlYi9zZXR1cCNhdmFpbGFibGUtbGlicmFyaWVzXG5cbi8vIFlvdXIgd2ViIGFwcCdzIEZpcmViYXNlIGNvbmZpZ3VyYXRpb25cbi8vIEZvciBGaXJlYmFzZSBKUyBTREsgdjcuMjAuMCBhbmQgbGF0ZXIsIG1lYXN1cmVtZW50SWQgaXMgb3B0aW9uYWxcbmNvbnN0IGZpcmViYXNlQ29uZmlnID0ge1xuICBhcGlLZXk6IHByb2Nlc3MuZW52LkZJUkVCQVNFX0FQSV9LRVksXG4gIGF1dGhEb21haW46IHByb2Nlc3MuZW52LkZJUkVCQVNFX0FVVEhfRE9NQUlOLFxuICBwcm9qZWN0SWQ6IHByb2Nlc3MuZW52LkZJUkVCQVNFX1BST0pFQ1RfSUQsXG4gIHN0b3JhZ2VCdWNrZXQ6IHByb2Nlc3MuZW52LkZJUkVCQVNFX1NUT1JBR0VfQlVDS0VULFxuICBtZXNzYWdpbmdTZW5kZXJJZDogcHJvY2Vzcy5lbnYuRklSRUJBU0VfTUVTU0FHSU5HX1NFTkRFUl9JRCxcbiAgYXBwSWQ6IHByb2Nlc3MuZW52LkZJUkVCQVNFX0FQUF9JRCxcbn07XG5cbi8vIEluaXRpYWxpemUgRmlyZWJhc2VcbmNvbnN0IGFwcCA9IGluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpO1xuLy8gY29uc3QgYW5hbHl0aWNzID0gZ2V0QW5hbHl0aWNzKGFwcCk7XG5jb25zdCBhdXRoID0gZ2V0QXV0aChhcHApO1xuY29uc3QgZGIgPSBnZXRGaXJlc3RvcmUoYXBwKTtcbmNvbnN0IHN0b3JhZ2UgPSBnZXRTdG9yYWdlKGFwcCk7XG5cbmV4cG9ydCB7IGFwcCwgYXV0aCwgZGIsIHN0b3JhZ2UgfTtcbiJdLCJuYW1lcyI6WyJpbml0aWFsaXplQXBwIiwiZ2V0QXV0aCIsImdldEZpcmVzdG9yZSIsImdldFN0b3JhZ2UiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQSV9LRVkiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsIkZJUkVCQVNFX0FQSV9LRVkiLCJhdXRoRG9tYWluIiwiRklSRUJBU0VfQVVUSF9ET01BSU4iLCJwcm9qZWN0SWQiLCJGSVJFQkFTRV9QUk9KRUNUX0lEIiwic3RvcmFnZUJ1Y2tldCIsIkZJUkVCQVNFX1NUT1JBR0VfQlVDS0VUIiwibWVzc2FnaW5nU2VuZGVySWQiLCJGSVJFQkFTRV9NRVNTQUdJTkdfU0VOREVSX0lEIiwiYXBwSWQiLCJGSVJFQkFTRV9BUFBfSUQiLCJhcHAiLCJhdXRoIiwiZGIiLCJzdG9yYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./firebase/firebase.ts\n"));

/***/ })

});