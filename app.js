$( document ).ready(function() { 


    // URL TO JSON ARRAY WITH BIRD DATA -------------------------------------------
    var queryURL = "https://zuz-vol-s3.s3-us-west-2.amazonaws.com/data.json";


    // SET EMPTY ARRAY VARIABLES 
    let rawDates = [];
    let birdCounts = [];
    let birdNames = [];
    let allTheBirds = [];
    let cleanDates = [];


    // AJAX CALL ===================================================================
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        // store response (or all the data) into 'all_data' variable 
        var all_data = response;
        //console.log(all_data);
        
        //-----------------------------------------------------------------
        // retreive all keys and keys' value ( key:value ) and push to empty arrays
        Object.keys(all_data)
        .forEach(function eachKey(key) { 

            // months(key) and count(value)
            let date_count_Object = (all_data[key]) 

            birdNames.push(Object.keys(all_data))
            //console.log(birdNames);

            //console.log(all_data[key]);

             // push only bird COUNTS to empty array
            birdCounts.push(Object.values(date_count_Object));
            //console.log(birdCounts)

            // DATES --- IN FORMAT: "Sun Jan 01 2006 00:00:00 GMT-0800 (Pacific Standard Time)"
            rawDates.push(Object.keys(date_count_Object));
            //console.log(rawDates);
        })
        //---------------------------------------------------------------

        // CLEAN UP DATES DATA ==================================================================================

        // START FOR LOOP ------------------------------------------------------------------------------------

        for (let eachDateArray = 0; eachDateArray < rawDates.length; eachDateArray++)  {

            // START SUB LOOP --------
            for (let eachDate = 0; eachDate < rawDates[eachDateArray].length; eachDate++) {

            // variable 'dates' will look like: "Sun Jan 01 2006 00:00:00 GMT-0800 (Pacific Standard Time)""
            // From the variable 'dates', get the month and the year separately 
            let oneDay = rawDates[eachDateArray]
            
            let thisMonth = new Date(oneDay[eachDate]).getMonth(); // gives a number representing the month
            //console.log(thisMonth);

            //console.log( rawDates[eachDateArray]  );
            let oneYear = rawDates[eachDateArray]
            let thisYear = new Date(oneYear[eachDate]).getFullYear(); // gives the full 4-digit year


            // Format the month number to appear as the month name, abbreviated (Ex: 01 --> "Jan")
            let monthName = moment(thisMonth + 1, "MM").format('MMM');
            
            let fullDate = ` ${monthName} ${thisYear}`
            cleanDates.push(fullDate);

            } // END OF SUB FOR LOOP --------

        } // END OF FOR LOOP ----------------------------------------------------------------------------------

        // ========================================================================================================

        
        for (let j = 0; j < birdNames.length; j++) {
            let newArray = allTheBirds.concat(birdNames[j])
            allTheBirds = newArray;
            
            // filter out duplicates 
        }

        console.log(cleanDates);

        const distinctBirds = [...new Set(allTheBirds)];
        //console.log(distinctBirds, distinctBirds.length);

        //console.log(cleanDates);
        //console.log(birdNames);
        //console.log(birdCounts);
        
        // for (let x = 0; x < 5; x++) {
        //     //add trace1 object here
        //     // create array for data output for plot.ly 

        // }

        //console.log(rawDates[0])

        trace1 = {
            type: 'scatter',
            x: cleanDates, // MONTHS
            y: birdCounts[0], // BIRD COUNT
            mode: 'lines',
            name: distinctBirds[0], // UNIQUE BIRD
            line: {
              color: 'rgb(219, 64, 82)',
              width: 2
            }
          };
          
          trace2 = {
            type: 'scatter',
            x: cleanDates, // MONTHS
            y: birdCounts[1], // BIRD COUNT
            mode: 'lines',
            name: distinctBirds[1], // UNIQUE BIRD
            line: {
              color: 'rgb(55, 128, 191)',
              width: 2
            }
          };
          
          var layout = {
            width: 1200,
            height: 600
          };
          
          var data = [trace1, trace2]; 
          
          Plotly.newPlot('myDiv', data, layout);



    }); // END CALL ==================================================================






});