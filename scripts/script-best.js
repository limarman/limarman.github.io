// URL to the JSON file
const jsonUrlBest = 'eval_best.json';

const json_urls = ['eval_best.json', 'group_names.json']

const promises = json_urls.map(url =>
    fetch(url)
      .then(response => response.json())
      .catch(error => console.error('Error loading JSON:', error))
  );

// Get the div element for the table
const tableDiv = document.getElementById('data-table');

document.addEventListener('DOMContentLoaded', function() {
    Promise.all(promises)
        .then(dataArray => {
            const data = dataArray[0]
            const group_names = dataArray[1]

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

            // Iterate over the groups and create table rows
            groupArray.forEach((group, index) => {
                const row = table.insertRow(); // Insert a new row into the table
                const cell1 = row.insertCell(); // Insert cells for group number and mean
                const cell2 = row.insertCell();
                const cell3 = row.insertCell();
                const cell4 = row.insertCell();

                // Assign data to the cells
                //cell1.textContent = groupNumber;
                cell1.textContent = (index + 1).toString()
                cell2.textContent = group.groupNumber
                cell3.textContent = group_names[group.groupNumber]
                if(group.error)
                {
                    cell4.textContent = 'ERROR';
                    cell4.classList.add('error-eval')
                }
                else{
                    cell4.textContent = group.mean.toFixed(3);
                }

            });
        })
        .catch(error => console.error('Error loading JSON:', error));
})



/*
document.addEventListener('DOMContentLoaded', function() {
    // Fetch JSON data from the file
    fetch(jsonUrlBest)
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

            // Iterate over the groups and create table rows
            groupArray.forEach((group, index) => {
                const row = table.insertRow(); // Insert a new row into the table
                const cell1 = row.insertCell(); // Insert cells for group number and mean
                const cell2 = row.insertCell();
                const cell3 = row.insertCell();

                // Assign data to the cells
                //cell1.textContent = groupNumber;
                cell1.textContent = (index + 1).toString()
                cell2.textContent = group.groupNumber
                if(group.error)
                {
                    cell3.textContent = 'ERROR';
                    cell3.classList.add('error-eval')
                }
                else{
                    cell3.textContent = group.mean.toFixed(3);
                }

    	    });
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
        });
});
*/