
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  episodeList.map((episode) => {
    const episodeCard = document.createElement("div")
    episodeCard.id = "episode-card"
    const episodeName = document.createElement("h2")
    episodeName.innerHTML = episode.name
    episodeCard.appendChild(episodeName)
    // episodeName.innerHTML = episode.name
    rootElem.appendChild(episodeCard)

    const seasonNumber = document.createElement("span")
    if (episode.season < 10) {
      episode.season = `  -  S0${episode.season}`
    } else {
      episode.season = `  -  S${episode.season}`
    }
    seasonNumber.innerHTML = episode.season
    episodeName.appendChild(seasonNumber)

    const episodeNumber = document.createElement("span")
    if (episode.number < 10) {
      episode.number = `S0${episode.number}`
    } else {
      episode.number = `S${episode.number}`
    }
    episodeNumber.innerHTML = episode.number
    seasonNumber.appendChild(episodeNumber)

    const lineBreak = document.createElement("br")
    seasonNumber.appendChild(lineBreak)

    const episodeImage = document.createElement("img")
    episodeImage.src = episode.image.medium
    episodeName.appendChild(episodeImage)

    const episodeSummary = document.createElement("h4")
    episodeSummary.innerHTML = episode.summary
    episodeName.appendChild(episodeSummary)

    const disclaimer = document.createElement("p")
    const episodeLink = episode._links.self.href
    disclaimer.innerHTML = `All data has originally come from TVMaze.com: ${episodeLink}`;
    disclaimer.style.fontSize = '14px'
    episodeName.appendChild(disclaimer)

  })
    
}

window.onload = setup;