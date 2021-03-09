const fs = require('fs');
const pdf = require('pdf-parse');
 
let dataBuffer = fs.readFileSync('/Users/Zuzana/Desktop/pdf_parse/birds-j06-d06-merged.pdf');
 
pdf(dataBuffer).then(function(data) {

    fs.writeFile("birdsurvey.txt", data.text, function(err) {
    
        // If the code experiences any errors it will log the error to the console.
        if (err) {
          return console.log(err);
        }
    
        console.log("written to text file");
      
      });
});
