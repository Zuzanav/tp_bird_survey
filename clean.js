
function cleanBirdName(bird) {
    //clean bird name depending on specified scenarios



    //remove asterisk & remove 'sp' & remove anything inside parantheses 
    bird = bird.replace(/[*]/g, '').replace('sp.', '').replace(/ *\([^)]*\) */g, "").replace(/[-]/g, ' ');

    // switch mispellings with correct name
    switch(bird) {
        case "Allen's Hummingbird":
            bird = "Rufous/Allen's Hummingbird";
            break;
        case "warbler sp. (Parulidae sp.)":
            bird = "Warbler";
            break;
        case "Rock Pigeon (Feral Pigeon)":
            bird = "Rock Pigeon";
            break;
        case "N. Rough winged Swallow":
            bird = "Northern Rough Winged Swallow";
            break;
        case "Rufous/Allen's Hummer":
            bird = "Rufous/Allen's Hummingbird";
            break;
        case "Blk Crowned Nite Heron":
            bird = "Black Crowned Night Heron";
            break;
        case "Kildeer":
            bird = "Killdeer";
            break;
        case "Savannah Sparrow   (Belding's)":
            bird = "Savannah Sparrow";
            break;
        case "Shrt billd/Lng billd Dowitcher":
            bird = "Dowitcher";
            break;
        case "Shrt bled/Lng bled Dowitcher":
            bird = "Dowitcher";
            break;
        case "Short billed/Long billed Dowitcher":
            bird = "Dowitcher";
            break;
        case "Nrthrn Rough winged Swallow":
            bird = "Northern Rough Winged Swallow";
            break;
        case "Sooty/Short tailed Shearwater":
            bird = "Sooty Shearwater";
            break;
        case "Blue winged/Cinnamon Teal":
            bird = "Cinnamon Teal";
            break;
        case "Northern Rgh wnged Swallow":
            bird = "Northern Rough Winged Swallow";
            break;
        case "Rufous Hummingbird":
            bird = "Rufous/Allen's Hummingbird";
            break;
        case "Black crwned Night Heron":
            bird = "Black Crowned Night Heron";
            break;
        case "Bed breasted Merganser":
            bird = "Red Breasted Merganser";
            break;
        case "N. R. winged Swallow":
            bird = "Northern Rough Winged Swallow";
            break;
        case "Dbl crested Cormorant":
            bird = "Double Crested Cormorant";
            break;
        case "Loon ":
            bird = "Common Loon";
            break;
    }

    // Capitalize birdname
    bird = bird.toUpperCase();



return bird;

  }  

 module.exports = { cleanBirdName };