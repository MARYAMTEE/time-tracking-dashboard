let data = [];

fetch("data.json")
.then(response => {
    if(!response.ok) {
        throw new Error("Network error or file not found");
    }
    return response.json();
})
.then(json => {
    data = json;

    // Set up button
const buttons = document.querySelectorAll("button[data-time]");
const container = document.querySelector(".cards-container");


function renderCards(timeframe){
    container.innerHTML = "";

    data.forEach(item => {
        const title = item.title;
        const current = item.timeframes[timeframe].current;
        const previous = item.timeframes[timeframe].previous;

    container.innerHTML += `
        <div class="container-card container-${title.toLowerCase()}">
            <div class="card card-${title.toLowerCase()}">
                <div class="info-top">
                    <h3>${title}</h3>
                    <img src="images/icon-ellipsis.svg" alt="${title} icon" />
                </div>
                <div class="info-bottom">
                    <p>${current}hrs</p>
                    <p>Last Week - ${previous}hrs</p>
                </div>
            </div>
        </div>
     `;   
    });
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const timeframe = button.dataset.time;

        //remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove("active"));

        //add active class to clicked buttons
        button.classList.add("active");

        renderCards(timeframe);
    });
});

const defaultTime = "weekly";
renderCards(defaultTime);

// Add active class to the weekly button
document.querySelector(`button[data-time="${defaultTime}"]`).classList.add("active");
})
.catch(error => {
    console.error("Fetch error:", error);
    document.querySelector(".cards-container").innerHTML = "Failed to load data.";
});