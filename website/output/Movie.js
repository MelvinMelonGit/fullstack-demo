export default function Movie(props) {
  return /*#__PURE__*/React.createElement("ul", null, props.movies.map(movie => {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("li", {
      key: movie.movieID
    }, movie.movietitle, " ", movie.moviedesc, " ", movie.genreID), /*#__PURE__*/React.createElement("button", {
      onClick: () => props.onPressed(movie)
    }, "Update Me"));
  }));
}