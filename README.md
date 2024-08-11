
# Online Video Platform

## Overview

The Online Video Platform is a web application built using the MERN stack (MongoDB, Express.js, React, Node.js) designed for students to watch and manage educational videos. The platform allows users to sign up, log in, and access videos categorized by degree, year of study, and courses.

## Features

- **User Authentication:** Secure sign-up and login with JWT-based authentication.
- **Video Management:** Ability to browse and watch videos organized by degree, year, and course.
- **Responsive Design:** User-friendly interface built with React, TailwindCSS, and DaisyUI.

## Installation

To set up the project locally, follow these steps:

### Prerequisites

- Node.js (version 16 or later)
- MongoDB (running locally or a cloud-based MongoDB service)
- Git

### Clone the Repository

```bash
git clone https://github.com/username/online-video-platform.git
cd online-video-platform
```

### Setup Backend

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install the backend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add your environment variables. Example:

   ```
   MONGO_URI=mongodb://localhost:27017/online_video_platform
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Setup Frontend

1. Navigate to the client directory:

   ```bash
   cd ../client
   ```

2. Install the frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

## Usage

1. **Sign Up:** Visit `/signup` to create a new account.
2. **Log In:** Visit `/login` to access your account.
3. **Browse Videos:** After logging in, navigate to `/degrees` to select your degree, and then proceed to view available years and courses.

## Contributing

Contributions are welcome! Please follow these steps to contribute to the project:

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes with descriptive messages.
4. Push your changes to your forked repository.
5. Open a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).


```

