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

        // ========================================================================================================

        // Retrieve all the bird names, store in single array and ...
        for (let j = 0; j < birdNames.length; j++) {
            let newArray = allTheBirds.concat(birdNames[j])
            allTheBirds = newArray;
        } // END OF FOR LOOP ----------------


        // ... filter out duplicates 
        let distinctBirds = [...new Set(allTheBirds)];
        distinctBirds.sort();
        

        // Function to save the current bird count for the selected bird 
        function getBirdData(chosenBird) {
            //currentDate = [];
            currentCount = [];
            for (var i = 0 ; i < distinctBirds.length ; i++){
              if ( distinctBirds[i] === chosenBird ) {
                //currentDate.push(cleanDates);
                //console.log(birdCounts[i]);
                currentCount.push(birdCounts[i]);
              } 
            }
          };

        // CREATE GRAPH FUNCTION -----------------------------------------------------------
        
        //default bird:
        createGraph('ACCIPITER');

        // two arguments - the selected bird and the number bird (user can only select 5)
        function createGraph(chosenBird, num) {

        // get the bird counts from function getBirdData
        getBirdData(chosenBird);

        // create the Plotly trace object with relevant information
        var trace = {
            type: 'scatter',
            x: cleanDates, // MONTHS
            y: currentCount[0], // BIRD COUNT
            mode: 'lines+markers',
            name: chosenBird, // UNIQUE BIRD
            line: {
              color: 'rgb(148, 170, 34)',
              width: 2
            }
          };

          return trace;
        } // END CREATE GRAPH FUNCTION --------------------------------------------------

    
        // =================================================================================
        // FUNCTION FOR ----

        // function assignOptions(textArray, selector) {
        //     for (var i = 0; i < textArray.length;  i++) {
        //         var currentOption = document.createElement('option');
        //         currentOption.text = textArray[i];
        //         selector.appendChild(currentOption);
        //     }
        //   }

        // assignOptions(distinctBirds, birdSelector);

        // function updateBird(){
        //     createGraph(birdSelector.value);
        // }

        // birdSelector.addEventListener('change', updateBird, false);
        
        // =================================================================================

        
        birdValueArray = []

        for (var i = 0; i < distinctBirds.length;  i++) {
            let birdText = {text: distinctBirds[i]}
            birdValueArray.push(birdText)
        }

        function grabBirdsFunction(info) {
            console.log(info)
            let num = 0;
            var data = []; 
            // for each bird selected by the user, run the function createGraph to graph each bird 
            for (var i = 0; i < info.length; i++) {
                num++; //this will be the number 'trace' for each bird
                createGraph(info[i].value, num)
                let traceBluePrint = createGraph();
                data.push(traceBluePrint);
            }

            var layout = {
                width: 1200,
                height: 600,
                title: "BIRD: "
              };
              
              Plotly.newPlot('plotdiv', data, layout, {showSendToCloud: true});

        }

        // SlimSelect Library -----------------------------------------------
        // allows for multiple options to be selected 
       let select = new SlimSelect({
            select: '#multiple',
            data: birdValueArray,
            limit: 5, // limiting user to select maximum of 5 birds
            onChange: (info) => { // anytime a bird is added or deleted, this triggers an event
                grabBirdsFunction(info);
                return info
            }
        })
        // END LIBRARY -----------------------------------------------------

        //console.log(select.selected());

    }); // END CALL ==================================================================





});