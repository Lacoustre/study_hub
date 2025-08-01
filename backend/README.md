# Backend Setup

## Firebase Configuration

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication with Email/Password, Google, and Facebook providers
3. Create a Firestore database
4. Generate a service account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `serviceAccountKey.json` in the backend directory

## Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your Firebase project details

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
# or for development
npm run dev
```

## API Endpoints

- `GET /api/tutors` - Get all tutors
- `POST /api/bookings` - Create a booking (requires auth)
- `GET /api/user/bookings` - Get user's bookings (requires auth)