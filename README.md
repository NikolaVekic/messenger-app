# React Firebase Messenger App

![304156290-b0fc26f2-d6bc-4860-8aa9-326af21be073](https://github.com/NikolaVekic/messenger-app/assets/55920607/caa50805-2aff-4e5f-a982-ea067d0fd7c9)
![304156303-511cf96c-18b4-4c0e-9127-f507d4669c3a](https://github.com/NikolaVekic/messenger-app/assets/55920607/ac0bdce4-c50f-4938-a2f1-e9ba43568a14)


This project is a chat application built with React and Firebase, designed to demonstrate real-time messaging capabilities. It features user authentication, chat rooms, and real-time chat functionalities.

### NOTE

This project is still in development, features like video calls and complete mobile responsiveness are still in the works, the core features are enabled, updates will be added over time.

## Features

- User authentication with Firebase Auth.
- Real-time chat using Firebase Firestore.
- Responsive design for various device sizes.
- Environment variable configuration for secure Firebase setup.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js
- npm

 1. Clone the repository:
```bash
git clone https://github.com/your_username_/Project-Name.git
```
2. Install NPM packages:
    
```bash
npm install
```
    
3. Create a `.env` file in the root directory and enter your Firebase configuration:
    
```
plaintext
    REACT_APP_API_KEY=YOUR_API_KEY
    REACT_APP_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
    REACT_APP_PROJECT_ID=YOUR_PROJECT_ID
    REACT_APP_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
    REACT_APP_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
    REACT_APP_APP_ID=YOUR_APP_ID
```
    
4. Start the development server:
    
```bash
    npm start
```
    
This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
    
## Usage
    
After signing in, users can select a chat from the list or start a new conversation with other users. Messages are updated in real-time across devices.
    
## Contributing
    
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
    
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
    
## License
    
Distributed under the MIT License. See `LICENSE` for more information.
