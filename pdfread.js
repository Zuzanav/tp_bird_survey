var fs = require("fs");
var moment = require('moment'); // require
var _ = require('lodash')

//===================================================================================================================
// READ IN TXT FILE...
fs.readFile("birdsurvey.txt", "utf8", function(error, data) {

    if (error) {
        return console.log(error);
    }
    // SAVE TXT FILE DATA TO "rawData"
    let rawData = data.split("\n"); // split the data by 'new lines'("\n")


    // ESTABLISH VARIABLES ---------------------------------------------------------------------------------------------------------------------
    let allDataObject = {}; //where clean data will be stored
    let months = ["January", "Jan", "February", "Feb", "March", "April", "May", "June", "July", "August", "Aug", "September", "Sep", "October", "Oct", "November", "Nov", "December", "Dec"]
    let allBirds = [];
    let birdObjects = {};
    //-------------------------------------------------------------------------------------------------------------------------------------------


    //==========================================================================================================================================
    // BEGIN FOR LOOP 1 - loop through raw data and clean up, store on "allDataObject" 

    for (let i = 0; i < rawData.length; i++) {
        //check to see if raw data contains a digit and NOT "+" or "Total of Species"
        if (rawData[i].match(/\d/) && !rawData[i].match(/[+]/) && !rawData[i].match("Total of") && !rawData[i].match("from the COVID")) {

            // if statement matches a month name or month abbreviation - that line is a DATE
            if (  (months.some(el => rawData[i].includes(el))) == true ) { 

                // save each DATE to a variable
                let dateString = rawData[i]

                // CONVERT FROM STRING TO ACTUAL DATE -----
                // first extract individual month and year, and then create new full date. All dates will start on the first of the month
                let monthNum = new Date(dateString).getMonth();
                var monthName = moment(monthNum + 1, "MM").format('MMMM');

                let dateYear = dateString.substring(dateString.lastIndexOf(", ")+1);

                let monthYear = ` ${monthName} ${dateYear} `;

                let fullDate = new Date(monthYear);

                // save date as a key inside the allDataObject
                allDataObject[fullDate] = {};
            } 

            // if statement does NOT match a month, indicates it is a BIRD and COUNT (not a date)
            if ( (months.some(el => rawData[i].includes(el))) == false ) {

                //split string wherever there is a digit(/d+) (indicating there is a bird count)
                var newArrays = rawData[i].trim().split(/(\d+)/, 2);

                // save bird names to var and trim
                let bird = newArrays[0].trim();

                // push all the bird names to a single array
                allBirds.push(bird);
                
                // bird count is always second in the array, and we want to convert it into an interger ...
                // ... and save to count variable
                let count = parseInt(newArrays[1], 10);

                // create new key pair (bird: count) in the date object
                // allDataObject[x][bird] = count
                // x = the specific month that was last added to the object
                // it is to the last allDataObject that we add the specific birds and their counts
                (allDataObject [ Object.keys(allDataObject) [Object.keys(allDataObject).length - 1] ]  )[bird] = count;
            } 
        } 
    } // END OF FOR LOOP 1 ================================================================================================



    // ESTABLISH NEW VARIABLES -----------------------------------------------------------------
    //use '...new Set' to filter out duplicate birds 
    const distinctBirds = [...new Set(allBirds)];

    //get the amount of objects present in 'allDataObject' using lo-dash's _.size method
    const allDataObjectSize = ( _.size(allDataObject) )
    //------------------------------------------------------------------------------------------


    //======================================================================================================================
    // BEGIN FOR LOOP 2 - loop through each unique bird and save an empty object to each one

    for (let bird = 0; bird < distinctBirds.length; bird++) {
        // save each individual bird to variable 'individualBird'
        let individualBird = distinctBirds[bird];

       // birdObjects[individualBird] = {}; //i need a var to access this later

        // BEGIN SUB FOR LOOP ----------------------------------------------------------------------------------
        // iterate over the 'allDataObject' to retrieve the keys(birds) and values(counts) inside the date objects
        for (let eachObj = 0; eachObj < allDataObjectSize; eachObj++) {

            // retrieve all the keys (dates) from the 'allDataObject' Object
            let allTheDateKeys = (Object.keys(allDataObject));

            // retrieve a single key (date) from 'allTheDatesKeys' variable
            let currentDate = allTheDateKeys[eachObj];

            // save each object (BIRDS and their COUNTS) to new a object
            let birdNCountObj = (Object.values(allDataObject))[eachObj];
            //console.log(birdNCountObj);

            // save number of objects inside 'birnNCountObj' object - use this in the for loop
            const birdNCountObjSize = ( _.size(birdNCountObj) )

            // BEGIN SUB-SUB FOR LOOP ----------------------------------------------------
            //iterate over each birdNCountObject to find a distinct bird
            for (let eachBird = 0; eachBird < birdNCountObjSize; eachBird++) {

                // Is bird named ('individualBird') inside birdNCountObj? | will return TRUE (bird was present that month) or FALSE 
                // if the bird does not exist inside birdNCountObj, it means that bird was not counted for that particular month 
                let birdMatch = _.has(birdNCountObj, individualBird); // _.has(myObject, 'stringYouWantToFind')

                // bird count = if bird match is true ? count = birdCountForMonth : 0;
                let birdCountForMonth = birdMatch ? Object.values(birdNCountObj)[bird] : 0;
                console.log(birdCountForMonth)
            } // END SUB-SUB LOOP --------------------------------------------------------



        } // END SUB LOOP -----------------------------------------------------------------------------------






    }; // END OF FOR LOOP 2 ====================================================================================================


    //console.log(    allDataObject[(Object.keys(allDataObject)[0])]    );

    // write data to JSON file
    //fs.writeFileSync('data.json', JSON.stringify(allDataObject, null, 2) , 'utf-8');

});

