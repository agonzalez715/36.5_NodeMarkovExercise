/** Command-line tool to generate Markov text. */

// Include the filesystem module to handle file operations
const fs = require('fs');
// Include the axios library for making HTTP requests
const axios = require('axios');
// Import the MarkovMachine class from the markov.js file
const MarkovMachine = require('./markov');

// Function to generate and display Markov text from a given input text
function generateText(text) {
  let mm = new MarkovMachine(text); // Create a new instance of MarkovMachine with the input text
  console.log(mm.makeText()); // Generate Markov text and log it to the console
}

// Retrieve the second command line argument which specifies the operation type ('file' or 'url')
let path = process.argv[2];
// Retrieve the third command line argument which specifies the source file or URL
let source = process.argv[3];

// Check if the operation type is 'file'
if (path === 'file') {
  // Read the file at the given source path with utf-8 encoding
  fs.readFile(source, 'utf8', (err, data) => {
    if (err) { // If an error occurs during file reading
      console.error(`Cannot read file: ${source}`); // Log the error to the console
      process.exit(1); // Exit the program with a status code of 1 (indicating an error)
    }
    generateText(data); // Call generateText with the read data if file is successfully read
  });
} else if (path === 'url') { // Check if the operation type is 'url'
  // Make an HTTP GET request to the specified URL
  axios.get(source)
    .then(res => { // Handle the response asynchronously
      generateText(res.data); // Call generateText with the response data
    })
    .catch(err => { // Handle any errors that occur during the HTTP request
      console.error(`Cannot fetch URL: ${source}`); // Log the error to the console
      process.exit(1); // Exit the program with a status code of 1 (indicating an error)
    });
} else { // If the operation type is neither 'file' nor 'url'
  console.error('Invalid command. Use "file" or "url" as the first argument.'); // Inform the user of the valid command syntax
  process.exit(1); // Exit the program with a status code of 1 (indicating an error)
}
