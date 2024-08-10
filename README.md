# DateSpark

**DateSpark** is a web application developed as a final project for the CS108 course. It connects users based on their hobbies and interests, allowing them to find their ideal match from a database of available profiles.

## Features

- **Login Page**: Secure login for returning users.
- **Signup Page**: New users can register (Note: This feature requires local deployment with Node.js).
- **Main Page**: Users input their hobbies and interests to find matches in the database.

## Project Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mradul-001/DateSpark.git
   ```
   
2. **Install Dependencies**:
   Navigate to the project directory and install the necessary Node.js packages:
   ```bash
   npm install
   ```

3. **Run the Application**:
   Start the server to run the application locally:
   ```bash
   node server.js
   ```

4. **Access the App**:
   Open your browser and navigate to `http://localhost:3000`.

## Important Notes

- The database (`json` file) containing user profiles and the `login.json` file with user credentials have been deleted for security reasons. Therefore, the app won’t function as expected without these files.
- To test the application fully, create new JSON files following the original structure or add your own data.

## Future Improvements

- Integrating a robust backend database.
- Enhancing the matching algorithm for more accurate results.
- Adding additional features like chat and profile customization.
