export default function Movie(props) {
    return (
        <ul>
            {props.movies.map(movie => {
                return (
                    <div>
                        <li key={movie.movieID}>
                            {movie.movietitle} {movie.moviedesc} {movie.genreID} 
                        </li>
                        <button onClick={() => props.onPressed(movie)}>
                            Update Me
                        </button>
                    </div>
                )
            })}
        </ul>
    )
}