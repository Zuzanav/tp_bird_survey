$( document ).ready(function() { 


    // URL TO JSON ARRAY WITH BIRD DATA -------------------------------------------
    var queryURL = "https://zuz-vol-s3.s3-us-west-2.amazonaws.com/bird_data.json";


    // SET EMPTY ARRAY VARIABLES 
    let rawDates = [];
    let birdCounts = [];
    let birdNames = [];
    let cleanDates = [];


    // AJAX CALL ===================================================================
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        // store response (or all the data) into 'all_data' variable 
        var all_data = response;
        
        //-----------------------------------------------------------------
        // retreive all keys and keys' value ( key:value ) and push to empty arrays
        Object.keys(all_data)
        .forEach(function eachKey(key) { 

            // DATES --- IN FORMAT: "Sun Jan 01 2006 00:00:00 GMT-0800 (Pacific Standard Time)"
            rawDates.push(key);
            
            // object of birds(key) and count(value)
            let monthlyBirds = (all_data[key]) 

             // push only bird COUNTS to empty array
            birdCounts.push(Object.values(monthlyBirds));

             // push only bird NAMES to empty array
            birdNames.push(Object.keys(monthlyBirds));
        })
        //---------------------------------------------------------------

        console.log(rawDates);
        //console.log(birdCounts);
        //console.log(birdNames);

        for (let i = 0; i < rawDates.length; i++)  {
            // variable 'dates' will look like: "Sun Jan 01 2006 00:00:00 GMT-0800 (Pacific Standard Time)""
            // From the variable 'dates', get the month and the year separately 
            let thisMonth = new Date(rawDates[i]).getMonth(); // gives a number representing the month
            let thisYear = new Date(rawDates[i]).getFullYear(); // gives the full 4-digit year

            // Format the month number to appear as the month name, abbreviated (Ex: 01 --> "Jan")
            let monthName = moment(thisMonth + 1, "MM").format('MMM');
            
            let fullDate = ` ${monthName} ${thisYear}`
            cleanDates.push(fullDate)


        }
        console.log(cleanDates);

        trace1 = {
            type: 'scatter',
            x: [cleanDates[0], cleanDates[1], cleanDates[2], cleanDates[3], cleanDates[4], cleanDates[5]], // MONTH
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
            x: [cleanDates[0], cleanDates[1], cleanDates[2], cleanDates[3], cleanDates[4], cleanDates[5]], // MONTH
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



    }); // END CALL ==================================================================






});