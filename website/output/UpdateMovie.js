export default function UpdateMovie(props) {
  const initialValue = {
    movieID: 0,
    //retrieve from movie
    movietitle: '',
    moviedesc: '',
    movieimage: '',
    genreID: 0,
    updatedate: '' //retrieve from movie
  };

  const [movieFields, setMovieFields] = React.useState(initialValue);
  React.useEffect(() => {
    setMovieFields(props.selectedMovie);
  }, [props]);
  function handleChange(e) {
    setMovieFields({
      ...movieFields,
      [e.target.name]: e.target.value
    });
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
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    };
    fetch(`http://localhost:8081/movie/${movieFields.movieID}`, options).then(response => response.json()).then(data => console.log(data));
    props.onPressed(movieFields.movieID, movieFields);
  }
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("label", null, "Title:", /*#__PURE__*/React.createElement("input", {
    name: "movietitle",
    value: movieFields.movietitle,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("label", null, "Description:", /*#__PURE__*/React.createElement("input", {
    name: "moviedesc",
    value: movieFields.moviedesc,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("label", null, "Image:", /*#__PURE__*/React.createElement("input", {
    name: "movieimage",
    value: movieFields.movieimage,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("label", null, "genreID:", /*#__PURE__*/React.createElement("input", {
    name: "genreID",
    value: movieFields.genreID,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Update Movie"));
}