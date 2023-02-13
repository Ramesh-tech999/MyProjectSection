let firstNumberElement = document.getElementById("firstNumber");
let secondNumberElement = document.getElementById("secondNumber");
let userNumberElement = document.getElementById("userInput");
let gameResult = document.getElementById("gameResult");

let successMessage = "Congratulation! You got it right.";
let tryAgainmessage = "Please Try Again!";

let firstRandomNum = Math.random() * 100;
let secondRandomNum = Math.random() * 100;
firstNumberElement.textContent = Math.ceil(firstRandomNum);
secondNumberElement.textContent = Math.ceil(secondRandomNum);

function checkButton() {
    let firstRandomInt = parseInt(firstNumberElement.textContent);
    let secondRandomInt = parseInt(secondNumberElement.textContent);
    let gameResultInt = parseInt(userNumberElement.value);
    let sumNum = firstRandomInt + secondRandomInt;

    if (gameResultInt === sumNum) {
        gameResult.textContent = successMessage;
        gameResult.style.backgroundColor = "#028a0f";
    } else {
        gameResult.textContent = tryAgainmessage;
        gameResult.style.backgroundColor = "#1e217c";
    }
}

function restartButton() {
    let firstRandomNumber = Math.random() * 100;
    let secondRandomNumber = Math.random() * 100;

    firstNumberElement.textContent = Math.ceil(firstRandomNumber);
    secondNumberElement.textContent = Math.ceil(secondRandomNumber);
    gameResult.textContent = "";
    userNumberElement.value = "";
}


let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("search-results");
    searchResultsEl.appendChild(resultItemEl);

    let resultTitelEl = document.createElement("a");
    resultTitelEl.classList.add("result-title");
    resultTitelEl.textContent = title;
    resultTitelEl.href = link;
    resultTitelEl.target = "_blank";
    resultItemEl.appendChild(resultTitelEl);

    let breakEl = document.createElement("br");
    resultItemEl.appendChild(breakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.textContent = link;
    urlEl.target = "_blank";
    resultItemEl.appendChild(urlEl);

    let breakEl1 = document.createElement("br");
    resultItemEl.appendChild(breakEl1);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}

function dispalyRrsults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

searchInputEl.addEventListener("keydown", function(element) {
    if (element.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let inputVal = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputVal;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                dispalyRrsults(search_results);
            });
    }
});
