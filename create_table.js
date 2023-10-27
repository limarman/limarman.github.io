// URL to the JSON file
const jsonUrl = 'eval_latest.json';

// Get the div element
const jsonDataDiv = document.getElementById('table');

// Fetch JSON data from the file
fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        // Update the content of the div with JSON data
        jsonDataDiv.textContent = `Group: 2, Score: ${data.groups.2.mean}`;
    })
    .catch(error => {
        // Handle errors, e.g., if the JSON file doesn't exist
        console.error('Error loading JSON data:', error);
    });