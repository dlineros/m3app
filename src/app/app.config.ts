import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { provideStore } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(appReducers),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({ "projectId": "m3app-28a25",
        "appId": "1:862456709010:web:cf0d8f1902a04cdd528b4b",
        "storageBucket": "m3app-28a25.firebasestorage.app",
        "apiKey": "AIzaSyCyv9gmBOxXgmBmCrk2Ipf2dx4BIAFJKig",
        "authDomain": "m3app-28a25.firebaseapp.com",
        "messagingSenderId": "862456709010",
        "measurementId": "G-M6BVGSNQXH" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
