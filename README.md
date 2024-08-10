# DateSpark

**DateSpark** is an innovative web application developed as a final project for the CS108 course. The platform is designed to connect users based on shared hobbies and interests, offering a personalized experience in finding potential matches. 

## Project Overview

### Key Features

- **Login Page**: Users can securely log in with their credentials. The login system ensures that user data is handled securely.
  
- **Signup Page**: New users can create an account, entering their personal details, hobbies, and interests. (Note: The signup feature requires local deployment to function correctly.)

- **Main Page**: After logging in, users are directed to the main page, where they can input their hobbies and interests. The application uses this data to match them with other users who have similar profiles in the database.

### Database and Functionality

- **Database (JSON)**: The application originally used a JSON file as a database to store user profiles and their corresponding data. This database has since been removed, so the app won’t function fully without it. To restore functionality, you can create a new JSON database or modify the existing code to connect to an external database.

- **Login Credentials (login.json)**: Similarly, the `login.json` file, which stored user credentials, has been deleted. This means that while the login interface is still available, it won’t authenticate users without the necessary data. To test this feature, you would need to recreate the credentials file or implement a new authentication system.

### Future Enhancements

- **Database Integration**: To scale and improve functionality, a robust backend database (such as MySQL or MongoDB) could be integrated, allowing for more extensive data management and scalability.

- **Enhanced Matching Algorithm**: The current matching algorithm is based on shared interests and hobbies. Future iterations could include more sophisticated algorithms that account for additional factors like location, activity level, and personality traits.

- **Additional Features**: Introducing features such as chat functionality, profile customization, and notification systems could enhance user engagement and overall experience.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mradul-001/DateSpark.git
   ```

2. **Install Dependencies**:
   Ensure you have Node.js installed, then navigate to the project directory and run:
   ```bash
   npm install
   ```

3. **Run the Application**:
   Start the local server using Node.js:
   ```bash
   node server.js
   ```
   Access the app in your browser at `http://localhost:3000`.

## Known Issues

- The app will not function as expected due to the missing database and login credentials files.
- To fully test the application, you must recreate these files locally or modify the code to connect to an external service.

