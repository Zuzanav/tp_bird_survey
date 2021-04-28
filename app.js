
window.onload = function () {

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
        
        //-----------------------------------------------------------------
        // retreive all keys and keys' value ( key:value ) and push to empty arrays
        Object.keys(all_data)
        .forEach(function eachKey(key) { 

            // months(key) and count(value)
            let date_count_Object = (all_data[key]) 

            // push only bird NAMES to empty array
            birdNames.push(Object.keys(all_data))

             // bird COUNTS 
            birdCounts.push(Object.values(date_count_Object));

            // DATES --- IN FORMAT: "Sun Jan 01 2006 00:00:00 GMT-0800 (Pacific Standard Time)"
            rawDates.push(Object.keys(date_count_Object));

        }) //---------------------------------------------------------------
        
        
        
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

        // Retrieve all the bird names, store in single array and ...
        for (let j = 0; j < birdNames.length; j++) {
            let newArray = allTheBirds.concat(birdNames[j])
            allTheBirds = newArray;
        } // END OF FOR LOOP ----------------

        // ... filter out duplicates 
        let distinctBirds = [...new Set(allTheBirds)];
        
        // ==========================================================================================
        // FUNCTIONS -------------------------------------------------------------------
        
        // GET BIRD COUNT FUNCTION - save the current bird count for the selected bird 
        function getBirdData(chosenBird) {
            currentCount = [];
            for (var i = 0 ; i < distinctBirds.length ; i++){
              if ( distinctBirds[i] === chosenBird ) {
                currentCount.push(Object.values(all_data[chosenBird]));
              } 
            }
            return currentCount;
          };

        // GET MOVING AVERAGE BIRD COUNT FUNCTION - find the moving avg for the selected bird 
        function getMovingAvg(chosenBird, n = 15) {
            let count = getBirdData(chosenBird)

            if (!count[0] || count[0].length < n) {
              return [];
            }
           
            let index = n - 1;
            const length = count[0].length + 1;
           
            const getMovingAvg = [];
           
            while (++index < length) {
              const nSlice = count[0].slice(index - n, index);
              const sum = nSlice.reduce((prev, curr) => prev + curr, 0);
              getMovingAvg.push(sum / n);
            }
           
            for (var i = 0 ; i < n-1 ; i++){
                getMovingAvg.unshift(0);
               n-1; 
            }
            return getMovingAvg;
        };
           
    
        // CREATE BIRD COUNTS - GRAPH FUNCTION ----------------------------------------------------
        // two arguments - the selected bird and the number bird (user can only select 5)
        function createGraph(chosenBird) {

        // get the bird counts from function getBirdData
        let thisCurrentCount = getBirdData(chosenBird);
            console.log(thisCurrentCount)
        // create the Plotly trace object with relevant information
        var trace = {
            type: 'scatter',
            x: cleanDates, // MONTHS
            y: thisCurrentCount[0], // BIRD COUNT
            mode: 'lines+markers',
            name: chosenBird, // UNIQUE BIRD
            line: {
              width: 2
            }
          };
          //data.push(trace)
          return trace;
        } // END CREATE GRAPH FUNCTION --------------------------------------------------


        // CREATE MOVING AVERAGE - GRAPH FUNCTION --------------------------------------------
        // two arguments - the selected bird and the number bird (user can only select 5)
        function createMovingAvgGraph(chosenBird) {
            console.log(chosenBird)
            // get the bird counts from function getBirdData
            let thisCurrentCount = getMovingAvg(chosenBird);
            console.log(thisCurrentCount);
            // create the Plotly trace object with relevant information
            var trace = {
                type: 'scatter',
                x: cleanDates, // MONTHS
                y: thisCurrentCount, // BIRD COUNT
                mode: 'lines',
                opacity: .65,
                name: chosenBird, // UNIQUE BIRD
                line: {
                  width: 7,
                  smoothing: 0,
                }
              };
              //data.push(trace)
              return trace;
        } // END CREATE GRAPH FUNCTION --------------------------------------------------
        
        function trendingBirds(selectedBirds) {
            let data = [];
            // for each bird selected by the user...
            for (var i = 0; i < selectedBirds.length; i++) {

                // create a graph for each individual bird by running createGraph function
                let traceBluePrint = createMovingAvgGraph(selectedBirds[i].value)

                // ... and push to empty data array
                data.push(traceBluePrint);
            }

            var layout = {
                width: 1200,
                height: 600,
                title: "Avg",
                colorway : ['#233D4D', '#FE7F2D', '#FCCA46', '#A1C181', '#619B8A']
              };
              
              Plotly.newPlot('plotdiv2', data, layout, {modeBarButtonsToRemove: ['lasso2d', 'toggleSpikelines', 'zoom2d', 'select2d', 'autoScale2d']});

        }


        function grabSelectedBirds(selectedBirds) {
            let data = [];
            // for each bird selected by the user...
            for (var i = 0; i < selectedBirds.length; i++) {

                // create a graph for each individual bird by running createGraph function
                let traceBluePrint = createGraph(selectedBirds[i].value)

                // ... and push to empty data array
                data.push(traceBluePrint);
            }

            var layout = {
                width: 1200,
                height: 600,
                title: "Bird Counts",
                colorway : ['#233D4D', '#FE7F2D', '#FCCA46', '#A1C181', '#619B8A']
              };
              
              Plotly.newPlot('plotdiv', data, layout, {modeBarButtonsToRemove: ['lasso2d', 'toggleSpikelines', 'zoom2d', 'select2d', 'autoScale2d']});

        }

        // =============================================================================
        // SLIM SELECT LIBRARY -----------------------------------------------
        // allows for multiple options to be selected by the user, from a dropdown menu

        // SlimSelect Library requires the values (items in the dropdown) to be formatted thus:
        // {text: "value1"}
        // As a result, the loop below is to correctly format the bird names before giving it to the library to use

        birdValueArray = []
        let sortedDistinctBirds = distinctBirds.sort();

        for (var i = 0; i < sortedDistinctBirds.length;  i++) {
            let birdText = {text: sortedDistinctBirds[i]}
            birdValueArray.push(birdText)
        }

        // create new SlimSelect dropdown with bird names:
       let select = new SlimSelect({
            select: '#multiple',
            data: birdValueArray,
            limit: 5, // limiting user to select maximum of 5 birds
            placeholder: 'Select Bird', 
            searchHighlight: true,
            onChange: (info) => { // anytime a bird is added or deleted, it triggers this event
                grabSelectedBirds(info);
                return info;
            }
        })

        // create new SlimSelect dropdown with bird names:
       let select2 = new SlimSelect({
        select: '#multiple2',
        data: birdValueArray,
        limit: 5, // limiting user to select maximum of 5 birds
        placeholder: 'Select Bird', 
        searchHighlight: true,
        onChange: (info) => { // anytime a bird is added or deleted, it triggers this event
            trendingBirds(info);
            return info;
        }
    })
        // END LIBRARY -----------------------------------------------------
        // ===============================================================================
        select.set('AMERICAN CROW')
        //console.log(select.selected());
        select2.set('AMERICAN CROW')
        

    }); // END CALL ==================================================================





};