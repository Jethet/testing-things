function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchEpisodes(allEpisodes);
}

function makePageForEpisodes(allEpisodes) {
  const rootElem = document.getElementById("root");

  allEpisodes.map((episode) => {
    const episodeCard = document.createElement("div");
    episodeCard.id = "episode-card";
    const episodeName = document.createElement("h2");
    episodeName.innerHTML = episode.name;
    episodeCard.appendChild(episodeName);
    // episodeName.innerHTML = episode.name
    rootElem.appendChild(episodeCard);

    const seasonNumber = document.createElement("span");
    if (episode.season < 10) {
      episode.season = `  -  S0${episode.season}`;
    } else {
      episode.season = `  -  S${episode.season}`;
    }
    seasonNumber.innerHTML = episode.season;
    episodeName.appendChild(seasonNumber);

    const episodeNumber = document.createElement("span");
    if (episode.number < 10) {
      episode.number = `E0${episode.number}`;
    } else {
      episode.number = `E${episode.number}`;
    }
    episodeNumber.innerHTML = episode.number;
    seasonNumber.appendChild(episodeNumber);

    const lineBreak = document.createElement("br");
    seasonNumber.appendChild(lineBreak);

    const episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodeName.appendChild(episodeImage);

    const episodeSummary = document.createElement("h4");
    episodeSummary.innerHTML = episode.summary;
    episodeName.appendChild(episodeSummary);

    const disclaimer = document.createElement("p");
    const episodeLink = episode._links.self.href;
    disclaimer.innerHTML = `All data has originally come from TVMaze.com: ${episodeLink}`;
    disclaimer.style.fontSize = "14px";
    episodeName.appendChild(disclaimer);
  });
}

function searchEpisodes(allEpisodes) {
  // create button for search
  const searchButton = document.getElementById("search-button");
  // search on click
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    // get value that is entered for search
    const searchTerm = document.getElementById("search-term").value;
    // make word lowercase
    const searchTermLower = searchTerm.toLowerCase();

    // iterate over all episodes
    allEpisodes.map((episode) => {
      // FOR ALL EPISODES:
      // a) make episodename lowercase
      const episodeName = episode.name.toLowerCase();
      // b) split name into separate words
      const episodeNameLower = episodeName.split(" ");
      // c) make summary lowercase
      const summary = episode.summary.toLowerCase()
      // d) split summary into separate words
      const summaryLower = summary.split(" ")

      if (episodeNameLower.includes(searchTermLower) || summaryLower.includes(searchTermLower)) {
        const episodeName = episodeNameLower.join(" ")
        const summary = summaryLower.join(" ")
        console.log(episodeName, summary);
        return episodeName, summary
      } else {
        console.log("Not found");
      }
    });

    // const summarySearch = episode.summary.split(" ").toLowerCase();
    // const searchItems = nameSearch.concat(summarySearch);
  });
}
// searchTerm.innerHTML = "";

window.onload = setup;

// for(let i=0; i<getAllShows().length; i++){
//   let listofshows=document.getElementById("listofshows")
//       listofshows.classList="col-lg-4 p-2"
//       listofshows.innerHTML="<div class='card' style='width: 18rem'/>
//       <img class='card-img-top' src='#' alt='Card image cap'>
//       <div class='card-body'>
//         <h5 class='card-title'>Card title</h5>
//         <p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//         <a href='#' class='btn btn-primary'>Go somewhere</a>
//       </div>"
