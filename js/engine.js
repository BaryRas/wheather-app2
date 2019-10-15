/*jshint esversion: 8 */

const search = document.querySelector(".city-search");
const matchList = document.getElementById("match-list");

// Search States.json and filter it
const searchStates = async searchText => {
    const res = await fetch("../data/country-capitals.json");
    const states = await res.json();

    // Get matches to current text input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, "gi"); 
        return state.capital.match(regex) || state.abbr.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
    }
    
    outputHtml(matches);
    
};

// Show results in html
const outputHtml =  matches => {
    if (matches.length > 0) {
        const html = matches
        .map(
            match => `
            <div lat="${match.lat}" long="${match.long}" class="card card-body mb-1">
                <h4  class="text-secondary">
                    ${match.country} (${match.abbr})
                    <span class="text-info">${match.capital}</span>
                </h4>
            </div>`
        )
        .join("");

        matchList.innerHTML = html;

        // eventListener for each city
        const boucle = () => {
            for (let index = 0; index < matchList.children.length; index++) {
                const element = matchList.children[index];
                const long = element.getAttribute("long");
                const lat = element.getAttribute("lat");
                element.addEventListener("click", () => {
                    fetchApi (lat, long);
                    matchList.innerHTML = "";
                    search.value = "";
                });
            }
        };
        boucle();
    }
};

search.addEventListener("input", () => searchStates(search.value));

