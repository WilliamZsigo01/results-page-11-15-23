

// (1a) Import Statements
import { GetToken, SearchRun } from "./API.js";




// async function show() {
//     let value = await GetCannabinoidObject(5);
//     console.log(value);

// }

// show();










// (1b) Constant Definitions
const DEFAULT_IMAGE_SRC = "default.svg";
let currentIndex = 0;
let dataItems = [];
const strainTypeArrays = new Array(12).fill([]);

// (1c) Strain Type Images Mapping
const strainTypeImages = new Map([
    [11, './IMAGES/CBD_icons-12.svg'],
    [12, './IMAGES/CBD_3-04.svg'],
    [2, './IMAGES/CBD_icons-38.svg'],
    [7, './IMAGES/CBD_icons-28.svg'],
    [8, './IMAGES/CBD_3-06.svg'],
    [6, './IMAGES/CBD_3-02.svg'],
]);

let loaderFinished;

// (2) Fetch Data and Display
async function fetchDataAndDisplay() {
    const token = await GetToken();
    const searchIDs = getQueryParamArray('searchID');

    function getQueryParamArray(name) {
        const params = new URLSearchParams(window.location.search);
        const value = params.get(name);
        return value ? value.split(',').map(Number) : [];
    }

    for (const searchID of searchIDs) {
        const searchParams = {
            SearchID: searchID,
            MaxRows: 3
        };

        const searchRunResponse = await SearchRun(searchParams); 
        searchRunResponse.forEach((item, i) => {
            item.rank = `${i + 1}.svg`;
        });
        dataItems.push(...searchRunResponse);
    }

    dataItems.forEach(item => {
        strainTypeArrays[item.StrainTypeID - 1].push(item);
    });

    if (dataItems.length > 0) {
        displayStrain(currentIndex);
    }




} 

console.log('dataItems = ', dataItems);



// (3) Display Strain
function displayStrain(index) {
    if (index < 0 || index >= dataItems.length) return;

    const strainNameElement = document.getElementById("card-strain-name").querySelector("p");
    const strainScoreElement = document.getElementById("card-seeker-score").querySelector("span");
    const strainTypeImage = document.getElementById("card-picture-area").querySelector("img");
    const strainTypeText = document.getElementById("strain-type-text");
    const cardRankDiv = document.getElementById("card-rank");
    const dynamic_thc_level = document.getElementById("dynamic-thc-level");
    const dynamic_unit_price = document.getElementById("dynamic-unit-price");

    dynamic_unit_price.textContent = "$" + (dataItems[index].Price).toFixed(2);
    dynamic_thc_level.textContent = "THC Level: " + (dataItems[index].TotalTHC * 100).toFixed(0) + "%"; // 2 dec places

    strainNameElement.textContent = dataItems[index].Strain;
    strainScoreElement.textContent = dataItems[index].StrainScore;

    strainTypeText.textContent = dataItems[index].StrainType;

    console.log(dataItems[index].StrainType)
    const src = strainTypeImages.get(dataItems[index].StrainTypeID) || DEFAULT_IMAGE_SRC;
    strainTypeImage.src = src;


    const ranking = dataItems[index].rank;
    cardRankDiv.innerHTML = `<img src="./IMAGES/${ranking}" alt="${ranking.split(".")[0]}" />`;

    const rankingNumber = parseInt(ranking.split(".")[0]);

    if (rankingNumber === 1) {
        cardRankDiv.innerHTML = `<img src="./IMAGES/1.svg" alt="1" style="display: block;" />
                                 <img src="./IMAGES/2.svg" alt="2" style="display: none;" />
                                 <img src="./IMAGES/3.svg" alt="3" style="display: none;" />`
        ;

    } else if (rankingNumber === 2) {
        cardRankDiv.innerHTML = `<img src="./IMAGES/1.svg" alt="1" style="display: none;" />
                                 <img src="./IMAGES/2.svg" alt="2" style="display: block;" />
                                 <img src="./IMAGES/3.svg" alt="3" style="display: none;" />`
        ;
    } else if (rankingNumber === 3) {
        cardRankDiv.innerHTML = `<img src="./IMAGES/1.svg" alt="1" style="display: none;" />
                                <img src="./IMAGES/2.svg" alt="2" style="display: none;" />
                                <img src="./IMAGES/3.svg" alt="3" style="display: block;" />`
        ;
    } else {
        // Handle other cases or provide a default image if needed
        cardRankDiv.innerHTML = `<img src="./IMAGES/default.svg" alt="Default" style="display: block;" />`;
    }



    hideLoader();
    if (loaderFinished) {
        hideIrrelevantButtons();
    }

}

// (4) Event Listeners for Clicks
document.addEventListener('click', function(event) {
    if (event.target.id === "left-arrow") {
        if (currentIndex > 0) {
            currentIndex--;
            displayStrain(currentIndex);
        }
    } else if (event.target.id === "right-arrow") {
        if (currentIndex < dataItems.length - 1) {
            currentIndex++;
            displayStrain(currentIndex);
        }
    }
});


// (5) Initial Data Fetch and Display
fetchDataAndDisplay();



// back and forward arrows
document.getElementById("left-arrow").addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        displayStrain(currentIndex);
    }
});
document.getElementById("right-arrow").addEventListener('click', function() {
    if (currentIndex < dataItems.length - 1) {
        currentIndex++;
        displayStrain(currentIndex);
    }
});



// (6)
function getCustomerIDFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('customerID');
}

// Update the customer number on the webpage
function updateCustomerNumber() {
    const customerNumberElement = document.getElementById("customer-number-value");
    const customerID = getCustomerIDFromURL();

    if (customerID) {
        customerNumberElement.textContent = customerID;
    }
}
updateCustomerNumber();



// (7)
function showLoader() {

typeText("explanation", "Give this number to your budtender for a streamlined shopping experience.", 50);

    const give_this_number_to_your = document.getElementById('explanation-div');
    give_this_number_to_your.style.alignItems = 'center'
    
    const loader = document.getElementById('center-placement');
    loader.style.display = 'none';
    const card_holder = document.getElementById("card-holder");
    card_holder.style.display = 'none';    
    const center_top = document.getElementById("center-top");
    center_top.style.height = '100%'
    // center_top.style.width = '550px'
    const r_div = document.getElementById('r-div');
    r_div.style.display = 'block';
    // r_div.style.height = '50%';
    r_div.style.position = 'absolute';
    r_div.style.bottom = '0';
    r_div.style.clipPath = `polygon(0 20%, 100% 20%, 100% 80%, 0 80%)`
    const doc_center = document.getElementById('center');
    doc_center.style.backgroundColor = '#181f26';

    const customer_number = document.getElementById('customer-number');
    customer_number.style.fontSize = '40px' 

    const customer_number_div = document.getElementById('customer-number-div');
    customer_number_div.style.width = '150px';
    customer_number_div.style.height = '50px';
}
showLoader();





function hideLoader() {
    loaderFinished = true;
    const centerTop = document.getElementById("center-top");
    centerTop.style.transition = 'height 1s ease';
    centerTop.style.height = '20%';
    

    setTimeout(() => {
        const cardHolder = document.getElementById("card-holder");
        cardHolder.style.display = 'block';
        cardHolder.style.display = 'flex';

        if (window.innerWidth < 600) {
            cardHolder.style.width = '100vw'; 
        } else {
            cardHolder.style.width = '550px'; 
        }

        const rDiv = document.getElementById('r-div');
        rDiv.style.display = 'none';
        const docCenter = document.getElementById('center');
        docCenter.style.backgroundColor = '#e2e2e2';
        const customerNumber = document.getElementById('customer-number');
        customerNumber.style.fontSize = '40px';
        const customerNumberDiv = document.getElementById('customer-number-div');
        customerNumberDiv.style.width = '170px';
        customerNumberDiv.style.height = '50px';
        const Main_container = document.getElementById('main-container')
        Main_container.style.backgroundColor = '#f5f5f5';
    }, 1200);
    

}



// (8)
function typeText(elementId, text, speed) {
    let element = document.getElementById(elementId);
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}




// (9)
// Add click event listeners to strain-quick-select-btn elements
const strainQuickSelectBtns = document.querySelectorAll(".strain-quick-select-btn");
strainQuickSelectBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        const strainTypeID = parseInt(btn.querySelector("img").alt);

        // Find the index of the first occurrence of the selected strain type ID
        const newIndex = dataItems.findIndex(function(item) {
            return item.StrainTypeID === strainTypeID;
        });

        if (newIndex !== -1) {
            // Update the currentIndex and display the relevant strain
            currentIndex = newIndex;
            displayStrain(currentIndex);
        }
    });
});





// (10)
// Define a function to hide irrelevant strain-quick-select-btn elements
function hideIrrelevantButtons() {
    // Identify relevant strain type IDs based on the data fetched
    const relevantStrainTypeIDs = dataItems.map(item => item.StrainTypeID);

    // Iterate through all the .strain-quick-select-btn elements
    const strainQuickSelectBtns = document.querySelectorAll(".strain-quick-select-btn");
    strainQuickSelectBtns.forEach(function(btn) {
        const strainTypeID = parseInt(btn.getAttribute("value"));

        // Check if the strain type ID is in the list of relevant IDs
        if (relevantStrainTypeIDs.includes(strainTypeID)) {
            btn.style.display = "block"; // Show the button
        } else {
            btn.style.display = "none";  // Hide the button
        }
    });
}




