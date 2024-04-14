// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/submit_login', (req, res) => {
    const { username, password } = req.body;
  
    // Read the existing users
    fs.readFile('./login.json', 'utf8', (err, usersJson) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while reading the users file.');
      }
  
      const users = JSON.parse(usersJson || '[]');
  
      // Find the user with the provided email
      const user = users.find(user => user.username === username);
  
      // If the user doesn't exist, or the password doesn't match, send an error
      if (!user || user.password !== password) {
        return res.status(401).send('Invalid email or password.');
      }
  
      // If the email and password match, send a success message

      res.send('Done')

    });
  });


app.post('/submit_signup', (req, res) => {
  const { username, password, secret_question, secret_answer } = req.body;

  // Read the existing users
  fs.readFile('./login.json', 'utf8', (err, usersJson) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while reading the users file.');
    }

    const users = JSON.parse(usersJson || '[]');

    // Add the new user
    users.push({ username, password, secret_question, secret_answer });

    // Write the updated users back to the file
    fs.writeFile('./login.json', JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while writing to the users file.');
      }

      res.send('User registered successfully.');
      res.writeHead(301, { Location: "main.html" })
    });
  });
});

app.listen(5500, () => console.log('Server is running on port 5500'));