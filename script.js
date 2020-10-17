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
      // a) make episode name lowercase
      const episodeName = episode.name.toLowerCase();
      // b) split name into separate words
      const episodeNameLower = episodeName.split(" ");
      // c) make summary lowercase
      const summary = episode.summary.toLowerCase();
      // d) split summary into separate words
      const summaryLower = summary.split(" ");
      // e) create season and episode numbers
      // const seasonNumber = document.createElement("span");
      if (episode.season < 10) {
        episode.season = `  -  S0${episode.season}`;
      } else if (episode.season > 10) {
        episode.season = `  -  S${episode.season}`;
      } else if (episode.number < 10) {
        episode.number = `E0${episode.number}`;
      } else if (episode.number < 10) {
        episode.number = `E${episode.number}`;
      }
      const seasonNumber = `${episode.season}${episode.number}`;

      searchResults = [];
      allEpisodes = "";
      if (
        episodeNameLower.includes(searchTermLower) ||
        summaryLower.includes(searchTermLower)
      ) {
        searchResults.push(episodeNameLower);

        searchResults.map((result) => {
          console.log(result);

          const rootElem = document.getElementById("root");
          rootElem.innerHTML = "";

          const filteredEpisode = document.createElement("h2");
          filteredEpisode.innerHTML = `${episode.name}${seasonNumber}`;
          rootElem.appendChild(filteredEpisode);

          const lineBreak = document.createElement("br");
          filteredEpisode.appendChild(lineBreak);

          const episodeImage = document.createElement("img");
          episodeImage.src = episode.image.medium;
          filteredEpisode.appendChild(episodeImage);

          const episodeSummary = document.createElement("h4");
          episodeSummary.innerHTML = episode.summary;
          filteredEpisode.appendChild(episodeSummary);

          const disclaimer = document.createElement("p");
          const episodeLink = episode._links.self.href;
          disclaimer.innerHTML = `All data has originally come from TVMaze.com: ${episodeLink}`;
          disclaimer.style.fontSize = "14px";
          filteredEpisode.appendChild(disclaimer);
        });
      }

      document.getElementById("search-term").value = "";
    });
  });
}

window.onload = setup;
