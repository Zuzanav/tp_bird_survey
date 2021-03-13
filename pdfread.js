var fs = require("fs");
var moment = require('moment'); // require

fs.readFile("birdsurvey.txt", "utf8", function(error, data) {

    if (error) {
        return console.log(error);
    }
    // split the data by 'new lines' 
    let dataArr = data.split("\n");
    let monthObject = {};
    let months = ["January", "Jan", "February", "Feb", "March", "April", "May", "June", "July", "August", "Aug", "September", 
    "Sep", "October", "Oct", "November", "Nov", "December", "Dec"]

    // BEGIN FOR LOOP -----------------------------------------------------
    for (let i = 0; i < dataArr.length; i++) {
        //if contains a digit and NOT  "+" or "Total Species"
        if (dataArr[i].match(/\d/) && !dataArr[i].match(/[+]/) && !dataArr[i].match("Total of")) {

            // if statement matches month name - that line indicates it is the date
            if (  (months.some(el => dataArr[i].includes(el))) == true ) { 

                //save each date to a variable
                let dateString = dataArr[i]

                // CONVERT FROM STRING TO ACTUAL DATE -----
                // first extract individual month and year, and then create new full date. All dates will start on the first of the month
                let monthNum = new Date(dateString).getMonth();
                let monthName = moment(monthNum + 1, "MM").format('MMMM');

                let dateYear = dateString.substring(dateString.lastIndexOf(", ")+1);

                let monthYear = ` ${monthName} ${dateYear} `;

                let fullDate = new Date(monthYear);

                // save date as a key inside the monthObject
                monthObject[fullDate] = {};
            } 

            // if statement does not match a month, indicates it is not a year but rather a bird and count
            if ( (months.some(el => dataArr[i].includes(el))) == false ) {

                //split string wherever there is a digit (indicating there is a bird count)
                var newArrays = dataArr[i].trim().split(/(\d+)/, 2);

                // save bird names to var and trim
                let bird = newArrays[0].trim();
                
                // bird count is always second in the array, and we want to convert it into an interger ...
                // ... and save to count variable
                let count = parseInt(newArrays[1], 10);

                // create new key pair (bird: count) in the date object
                // monthObject[x][bird] = count
                // x = the specific month that was last added to the object
                // it is to the last monthObject that we add the specific birds and their counts
                (monthObject [ Object.keys(monthObject) [Object.keys(monthObject).length - 1] ]  )[bird] = count;
            } 
        } 

    } // END OF FOR LOOP -----------------------------------------------

    // write data to JSON file
    fs.writeFileSync('data.json', JSON.stringify(monthObject, null, 2) , 'utf-8');

});

