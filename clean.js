
function cleanBirdName(bird) {
    //clean bird name depending on specified scenarios



    //remove asterisk & remove 'sp' & remove anything inside parantheses 
    bird = bird.replace(/[*]/g, '').replace('sp.', '').replace(/ *\([^)]*\) */g, "").replace(/[-]/g, ' ');

    // Capitalize birdname
    bird = bird.toUpperCase().trim();

    // switch mispellings with correct name
    switch(bird) {
        case "ALLEN'S HUMMINGBIRD":
            bird = "RUFOUS/ALLEN'S HUMMINGBIRD";
            break;
        case "N. ROUGH WINGED SWALLOW":
            bird = "NORTHERN ROUGH WINGED SWALLOW";
            break;
        case "RUFOUS/ALLEN'S HUMMER":
            bird = "RUFOUS/ALLEN'S HUMMINGBIRD";
            break;
        case "BLK CROWNED NITE HERON":
            bird = "BLACK CROWNED NIGHT HERON";
            break;
        case "KILDEER":
            bird = "KILLDEER";
            break;
        case "SHRT BILLD/LNG BILLD DOWITCHER":
            bird = "DOWITCHER";
            break;
        case "SHRT BLED/LNG BLED DOWITCHER":
            bird = "DOWITCHER";
            break;
        case "SHORT BILLED/LONG BILLED DOWITCHER":
            bird = "DOWITCHER";
            break;
        case "NRTHRN ROUGHT WINGED SWALLOW":
            bird = "NORTHERN ROUGH WINGED SWALLOW";
            break;
        case "SOOTY/SHORT TAILED SHEARWATER":
            bird = "SOOTY SHEARWATER";
            break;
        case "BLUE WINGED/CINNAMON TEAL":
            bird = "CINNAMON TEAL";
            break;
        case "NORTHERN RGH WNGED SWALLOW":
            bird = "NORTHERN ROUGH WINGED SWALLOW";
            break;
        case "RUFOUS HUMMINGBIRD":
            bird = "RUFOUS/ALLEN'S HUMMINGBIRD";
            break;
        case "BLACK CRWNED NIGHT HERON":
            bird = "BLACK CROWNED NIGHT HERON";
            break;
        case "BED BREASTED MERGANSER":
            bird = "RED BREASTED MERGANSER";
            break;
        case 'N. R. WINGED SWALLOW':
            bird = "NORTHERN ROUGH WINGED SWALLOW";
            break;
        case "DBL CRESTED CORMORANT":
            bird = "DOUBLE CRESTED CORMORANT";
            break;
        case "LOON":
            bird = "COMMON LOON";
            break;
        case "LOON ":
            bird = "COMMON LOON";
            break;
        case "NRTHRN RGH WINGED SWALLOW":
            bird = "NORTHERN ROUGH WINGED SWALLOW";
            break;
        case "RUFOUS/ALLENS HUMMER":
            bird = "RUFOUS/ALLEN'S HUMMINGBIRD";
            break;
        case "HUMMINGBIRD":
            bird = "RUFOUS/ALLEN'S HUMMINGBIRD";
            break;
        case "WESTERN SCRUB JAY":
            bird = "CALIFORNIA SCRUB JAY";
            break;
        case "COMMON CROW":
            bird = "AMERICAN CROW";
            break;
        case "NRTHN RGH WINGED SWALLOW":
            bird = "NORTHERN ROUGH WINGED SWALLOW";
            break;
        case "DBLE CRESTED CORMORANT":
            bird = "DOUBLE CRESTED CORMORANT";
            break;
        case 'NORTHERN ROUGHWINGED SWALLOW':
            bird = "NORTHERN ROUGH WINGED SWALLOW";
            break;
        case "NRTHRN ROUGH WINGED SWALLOW":
            bird = "NORTHERN ROUGH WINGED SWALLOW";
            break;
        case "LONG BILLED DOWITCHER":
            bird = "DOWITCHER";
            break;
        case "CLAPPER RAIL":
            bird = "RIDGWAY'S RAIL";
            break;
        case "BELDING'S SAVANNAH SPARROW":
            bird = "SAVANNAH SPARROW";
            break;
    }




return bird;

  }  

 module.exports = { cleanBirdName };