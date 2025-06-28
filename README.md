# Second-Hand Car Marketplace

A modern React + Firebase app for buying and selling second-hand cars. Includes role-based access, with admins managing listings and users browsing and sending purchase requests.

## Features

- Firebase Authentication (Google & Email/Password)
- Firestore for storing car listings & purchase requests
- Firebase Storage for car images
- Admin dashboard to add/update/delete cars & manage requests
- Users can view available cars, search/filter, and request to buy
- Responsive design for mobile & desktop

## Tech Stack

- React (with TypeScript)
- Firebase (Auth, Firestore, Storage)
- React Router
- CSS Grid / Flexbox for layout (or optionally Tailwind / Bootstrap)
- Vite / Create React App for setup (adjust as per your actual choice)

## Live Demo

[View Live App](https://your-live-link-here.com)

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Sravanikonapalli/car-marketplace.git
cd car-marketplace
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Firebase

Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).

Enable:
- Authentication (Google & Email/Password)
- Firestore Database
- Storage

Copy Firebase config and update in `src/firebase/firebaseConfig.ts`:

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MSG_ID",
    appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
```

### 4. Run the app
```bash
npm start
```

## App Routes

- `/` — Main user interface to browse, view details of each car, and request to buy cars
- `/admin` — Admin dashboard to manage car listings
- `/admin/requests` — Admin view to manage and review purchase requests

