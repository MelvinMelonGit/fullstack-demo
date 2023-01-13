import Movie from './Movie';
import UpdateMovie from './UpdateMovie';

function App(props) {
    const [movies, setMovies] = React.useState([]);
    const [selectedMovie, setselectedMovie] = React.useState({});

    console.log(selectedMovie);
    console.log(movies);

    React.useEffect(() => {
        fetch('http://localhost:8081/movies')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setMovies(data);
        });
    }, []);

  return (
    <main>
        <UpdateMovie
            movies={movies}
            selectedMovie={selectedMovie}
            onPressed={(id, selectedMovie) => {setMovies(movies.map(movie => (movie.movieID === id ? selectedMovie : movie)));}
        }/>
        <Movie movies={movies} onPressed={movie => {
            setselectedMovie(movie);}}/>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);