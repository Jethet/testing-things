const express = require("express");
const port = 3000;

const app = express();

app.use(express.json());

const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
];

app.get("/albums", function (req, res) {
  res.send(albumsData);
});

app.get("/albums/:albumId", (req, res) => {
  const albumId = req.params.albumId;

  const album = albumsData.find((album) => album.albumId === albumId);
  if (album) {
    res.send(album);
  } else {
    res.status(404).send();
  }
});

app.post("/albums", (req, res) => {
  const album = req.body;
  album.albumId = getNextAlbumId();
  albumsData.push(album);
  console.log(("Posted album", req.body));
  res.status(200).send();
});

app.put("/albums/:albumId", (req, res) => {
  const albumId = req.params.albumId;
  const albumUpdated = req.body;
  albumsData.find((album) => {
    if (album.albumId === albumId) {
      albumsData[albumId] = albumUpdated;
    } else {
      res.status(404).send();
    }
  });
  console.log(("Posted album", req.body));
  res.status(200).send();
});

app.delete("/album/:albumId", (req, res) => {
  const albumId = req.params.albumId;

  albumsData.find((album) => {
    if (album.albumId === albumId) {
      albumsData.slice(albumId, 1);
      console.log(`Album with id ${albumId} deleted.`);
    } else {
      res.status(404).send();
    }
  });
});

// returns the next ID in the sequence
function getNextAlbumId() {
  // find the current highest ID (new albums are always added to the end, so we can assume the last one is the highest)
  const highestId = albumsData[albumsData.length - 1].albumId;
  // add 1 to it (we need to convert it to a number first. For some fun, see what happens if you don't!)
  const nextId = parseInt(highestId) + 1;
  // return it as a string
  return nextId.toString();
}

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
