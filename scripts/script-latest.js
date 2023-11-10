// URL to the JSON file
const jsonUrl = 'eval_latest.json';
const jsonUrlBest = 'eval_best.json';

const json_urls = ['eval_latest.json', 'eval_best.json', 'group_names.json']

const promises = json_urls.map(url =>
    fetch(url)
      .then(response => response.json())
      .catch(error => console.error('Error loading JSON:', error))
  );

// Get the div element where you want to display the timestamp
const timestampDiv = document.getElementById('latest-timestamp');

// Get the div element for the table
const tableDiv = document.getElementById('data-table');


document.addEventListener('DOMContentLoaded', function() {
    Promise.all(promises)
        .then(dataArray => {

            const data = dataArray[0]
            const best_data = dataArray[1]
            const group_names = dataArray[2]

            // setting the correct timestamp
            const timestamp = data.timestamp;
            timestampDiv.textContent = `Timestamp: ${timestamp}`;
            
            //filling the table
            // Access the "groups" object within the JSON data
            const groups = data.groups;

            // Convert the groups object into an array of objects
            const groupArray = Object.entries(groups).map(([groupNumber, groupData]) => {
                return { groupNumber, mean: groupData.mean, error: groupData.error};
            });

            groupArray.sort((a, b) => {
                if (a.error && !b.error) {
                    return 1; // Place groups with errors below groups without errors
                } else if (!a.error && b.error) {
                    return -1; // Place groups without errors above groups with errors
                }
                else{
                    return b.mean - a.mean;
                }
            });
            // Iterate over the groups and create table rows
            //Object.keys(groups).forEach(groupNumber => {
            groupArray.forEach(group => {
                //const groupData = groups[groupNumber];
                const row = tableDiv.insertRow(); // Insert a new row into the table
                const cell1 = row.insertCell(); // Insert cells for group number and mean
                const cell2 = row.insertCell();
                const cell3 = row.insertCell();

                // Assign data to the cells
                //cell1.textContent = groupNumber;
                cell1.textContent = group.groupNumber;
                cell2.textContent = group_names[group.groupNumber];
                //cell2.textContent = groupData.mean.toFixed(3);
                if(group.error)
                {
                    cell3.textContent = 'ERROR';
                    cell3.classList.add('error-eval')
                }
                else{
                    cell3.textContent = group.mean.toFixed(3);
                    console.log(best_data.groups[group.groupNumber].error)
                    if(best_data.groups[group.groupNumber].error ||
                        best_data.groups[group.groupNumber].mean >= group.mean)
                    {
                        cell3.classList.add('best-eval')
                    }
                }
            });

        })
        .catch(error => console.error('Error loading JSON:', error));
})

/*
// Fetch JSON data from the file
fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        // Access the timestamp value from the JSON data
        const timestamp = data.timestamp;

        // Update the content of the div with the timestamp value
        timestampDiv.textContent = `Timestamp: ${timestamp}`;
    })
    .catch(error => {
        // Handle errors, e.g., if the JSON file doesn't exist
        console.error('Error loading JSON data:', error);
    });


document.addEventListener('DOMContentLoaded', function() {
    // Fetch JSON data from the file
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            // Access the "groups" object within the JSON data
            const groups = data.groups;

            // Convert the groups object into an array of objects
            const groupArray = Object.entries(groups).map(([groupNumber, groupData]) => {
                return { groupNumber, mean: groupData.mean, error: groupData.error};
            });

            groupArray.sort((a, b) => {
                if (a.error && !b.error) {
                    return 1; // Place groups with errors below groups without errors
                } else if (!a.error && b.error) {
                    return -1; // Place groups without errors above groups with errors
                }
                else{
                    return b.mean - a.mean;
                }
            });

            // Select the HTML table element by its ID
            const table = document.getElementById('data-table');
            fetch(jsonUrlBest)
                .then(response => response.json())
                .then(best_data => {
                    // Iterate over the groups and create table rows
                    //Object.keys(groups).forEach(groupNumber => {
                    groupArray.forEach(group => {
                        //const groupData = groups[groupNumber];
                        const row = table.insertRow(); // Insert a new row into the table
                        const cell1 = row.insertCell(); // Insert cells for group number and mean
                        const cell2 = row.insertCell();
                        const cell3 = row.insertCell();

                        // Assign data to the cells
                        //cell1.textContent = groupNumber;
                        cell1.textContent = group.groupNumber
                        cell2.textContent = 
                        //cell2.textContent = groupData.mean.toFixed(3);
                        if(group.error)
                        {
                            cell3.textContent = 'ERROR';
                            cell3.classList.add('error-eval')
                        }
                        else{
                            cell3.textContent = group.mean.toFixed(3);
                            console.log(best_data.groups[group.groupNumber].error)
                            if(best_data.groups[group.groupNumber].error ||
                                best_data.groups[group.groupNumber].mean >= group.mean)
                            {
                                cell3.classList.add('best-eval')
                            }
                        }
                    });
                })
                .catch(error => {
                    console.error('Error loading JSON data:', error);
                });
                })
        .catch(error => {
            console.error('Error loading JSON data:', error);
        });
});
*/