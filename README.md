# Torrey Pines Bird Survey Data Visualization 

## Description
This is a data visualization created from 15 years worth of bird survey data conducted by the Docent Society at the Torrey Pines State Natural Reserve in San Diego, California. 

## Behind the Scenes
The data is stored in PDF form on the torreypine.org website. I used node to read in the text from all the PDF's and converted it to a txt file. Once convereted, I broke down the data to clean and regorganized it. Then I parsed it all into a JSON file which is stored on S3. The graphs pull the data using an AJAX API call. In app.js the data gets further organized (dates are formatted neatly for viewing and birds are sorted) before being pushed into arrays, ready for plotly to use. 

## Technologies Used:
- Node.js
- AWS S3
- JavaScript
- Plotly
- SlimSelect
- MomentJS
- HTML/CSS