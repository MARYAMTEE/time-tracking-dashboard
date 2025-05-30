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
    const container = document.querySelector(".work-container");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const timeframe = button.dataset.time;
            container.innerHTML = "";

            data.forEach(item => {
                const title = item.title;
                const current = item.timeframes[timeframe].current;
                const previous = item.timeframes[timeframe].previous;

                container.innerHTML += `
                <div class="container-card">
                    <div class="card">
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
        });
    });
})
.catch(error => {
    console.log("Fetch error:", error);
    document.querySelector("work-container").innerHTML = "Failed to load data";
});