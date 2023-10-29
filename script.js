// URL to the JSON file
const jsonUrl = 'eval_latest.json';

// Get the div element where you want to display the timestamp
const timestampDiv = document.getElementById('home-text1');

// Fetch JSON data from the file
fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        // Access the timestamp value from the JSON data
        const timestamp = data.timestamp;

        // Update the content of the div with the timestamp value
        timestampDiv.textContent = `Latest Results - ${timestamp}`;
    })
    .catch(error => {
        // Handle errors, e.g., if the JSON file doesn't exist
        console.error('Error loading JSON data:', error);
    });