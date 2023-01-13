import Movie from "./Movie.js";
import UpdateMovie from "./UpdateMovie.js";
function App(props) {
  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setselectedMovie] = React.useState({});
  console.log(selectedMovie);
  console.log(movies);
  React.useEffect(() => {
    fetch('http://localhost:8081/movies').then(response => response.json()).then(data => {
      console.log(data);
      setMovies(data);
    });
  }, []);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(UpdateMovie, {
    movies: movies,
    selectedMovie: selectedMovie,
    onPressed: (id, selectedMovie) => {
      setMovies(movies.map(movie => movie.movieID === id ? selectedMovie : movie));
    }
  }), /*#__PURE__*/React.createElement(Movie, {
    movies: movies,
    onPressed: movie => {
      setselectedMovie(movie);
    }
  }));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(App, null));