$( document ).ready(function() { 


    // URL TO JSON ARRAY WITH BIRD DATA -------------------------------------------
    var queryURL = "https://zuz-vol-s3.s3-us-west-2.amazonaws.com/bird_data.json";


    // SET EMPTY ARRAY VARIABLES 
    let dates = [];
    let birdCounts = [];
    let birdNames = [];


    // AJAX CALL ===================================================================
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        // store all the data into all_data variable 
        var all_data = response;
        
        // retreive all keys and keys' value ( key:value ) and push to empty arrays
        Object.keys(all_data)
        .forEach(function eachKey(key) { 
            new Date(dates.push(key)); // date

            let monthlyBirds = (all_data[key]) // object of birds(key) and count(value)
            birdCounts.push(Object.values(monthlyBirds)); // push only bird COUNTS to empty array
            birdNames.push(Object.keys(monthlyBirds)); // push only bird NAMES to empty array


        })

        console.log( dates[0] );
        console.log(birdCounts[0]);
        console.log(birdNames[0]);

    }); // END CALL ==================================================================



    trace1 = {
        type: 'scatter',
        x: ["Jan", "Feb", "March", "April", "May", "June"], // MONTH
        y: [3, 25, 45, 17, 19, 12], // BIRD COUNT
        mode: 'lines',
        name: 'Bird 1',
        line: {
          color: 'rgb(219, 64, 82)',
          width: 2
        }
      };
      
      trace2 = {
        type: 'scatter',
        x: ["Jan", "Feb", "April", "May", "June"], // MONTH
        y: [12, 9, 15, 12, 15], // BIRD COUNT
        mode: 'lines',
        name: 'Bird 2',
        line: {
          color: 'rgb(55, 128, 191)',
          width: 2
        }
      };
      
      var layout = {
        width: 600,
        height: 600
      };
      
      var data = [trace1, trace2];
      
      Plotly.newPlot('myDiv', data, layout);


});