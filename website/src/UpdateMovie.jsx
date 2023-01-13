export default function UpdateMovie(props) {

    const initialValue = {
        movieID: 0, //retrieve from movie
        movietitle: '',
        moviedesc: '',
        movieimage: '',
        genreID: 0,
        updatedate: '' //retrieve from movie
    }
  const [movieFields, setMovieFields] = React.useState(initialValue);

    React.useEffect(
        () => {
        setMovieFields(props.selectedMovie)
        },
        [props]
    )

  function handleChange(e) {
        setMovieFields({
            ...movieFields,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const params = {
            movietitle: movieFields.movietitle,
            moviedesc: movieFields.moviedesc,
            movieimage: movieFields.movieimage,
            genreID: movieFields.genreID
        };
        
        const options = {
            method: 'PUT',
            body: JSON.stringify(params) ,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }, 
        };
    
        fetch(`http://localhost:8081/movie/${movieFields.movieID}`, options)
            .then(response => response.json())
            .then(data => console.log(data));

        props.onPressed(movieFields.movieID, movieFields);
        
    }

  return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    name="movietitle"
                    value={movieFields.movietitle}
                    onChange={handleChange}
                />
            </label>
            <label>
                Description:
                <input
                    name="moviedesc"
                    value={movieFields.moviedesc}
                    onChange={handleChange}
                />
            </label>
            <label>
                Image:
                <input
                    name="movieimage"
                    value={movieFields.movieimage}
                    onChange={handleChange}
                />
            </label>
            <label>
                genreID:
                <input
                    name="genreID"
                    value={movieFields.genreID}
                    onChange={handleChange}
                />
            </label>
            <button
                type="submit"
            >
                Update Movie
            </button>
        </form>
    );
}
