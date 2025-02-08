# LiveTrackingApp

## Overview

LiveTrackingApp is a React Native application that tracks a user's live location, updates a backend server, and receives real-time location updates via WebSockets. The app integrates **react-native-maps**, **@react-native-community/geolocation**, and **socket.io-client** to provide seamless location tracking.

## Features

- Request location permission on both Android and iOS
- Track and update live location
- Send location data to a backend server
- Receive real-time location updates via WebSockets
- Display the location on a map using **react-native-maps**

## Tech Stack

- **React Native**
- **react-native-maps**
- **@react-native-community/geolocation**
- **axios** (for HTTP requests)
- **socket.io-client** (for real-time updates)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- React Native CLI or Expo CLI (if using Expo)
- Android Studio / Xcode (for emulator/simulator)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/LiveTrackingApp.git
   cd LiveTrackingApp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Link dependencies (if using React Native CLI):
   ```sh
   npx react-native link
   ```
4. Run the app:
   - For Android:
     ```sh
     npx react-native run-android
     ```
   - For iOS:
     ```sh
     cd ios
     pod install
     cd ..
     npx react-native run-ios
     ```

## Configuration

### Backend API

```ts
const BACKEND_API_URL = 'https://managements-api.onrender.com/api/location';
const SOCKET_URL = 'wss://managements-api.onrender.com/api';
```

## Usage

1. Grant location permission when prompted.
2. The app will start tracking the user's location and send updates to the backend.
3. Location updates are received via WebSockets and displayed on the map.

## Troubleshooting

- **Location Permission Denied:** Ensure location permissions are enabled in device settings.
- **Map Not Displaying:** Verify Google Maps API key (for Android) or ensure the iOS simulator has location enabled.
- **Backend Not Receiving Data:** Check if the backend API is running and accessible.

## Author

Prosper - https://github.com/prosper-85
