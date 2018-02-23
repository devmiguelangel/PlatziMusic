const API_KEY = '7646706d8ae26db4aba1e4affc394362';
const URL_TOP_ARTISTS = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}&format=json`;

exports.getTopArtists = () => {
  return fetch(URL_TOP_ARTISTS)
    .then((response) => response.json())
    .then((data) => data.artists.artist)
    .then((artists) => artists.map((artist, index) => ({
      key: index.toString(),
      name: artist.name,
      image: artist.image[3]['#text'],
      likes: 200,
      comments: 76,
    })))
    .catch((error) => {
      console.error(error);
    });
}

