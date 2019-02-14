import React, { Component } from "react";
import Item from "./Item.js";
import "./Movies.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.getId = this.getId.bind(this);
  }
  state = {
    results: null,
    tvOrMovie: "tv",
    clickedId: null,
    searchValue: ""
  };

  async fetchMovies(moviesOrTv) {
    let apiKey = "fdcceaee503d65d10f646f384fbc9aec";
    let response = await fetch(
      "https://api.themoviedb.org/3/" +
        moviesOrTv +
        "/top_rated?api_key=" +
        apiKey +
        "&language=en-US&page=1"
    );
    let json = await response.json();
    this.setState({ results: json.results, tvOrMovie: moviesOrTv });
  }

  async search(event) {
    this.setState({
      searchValue: event.target.value
    });
    if (event.target.value.length > 3) {
      let response = await fetch(
        "https://api.themoviedb.org/3/search/" +
          this.state.tvOrMovie +
          "?api_key=fdcceaee503d65d10f646f384fbc9aec&language=en-US&query=" +
          event.target.value +
          "&page=1&include_adult=false"
      );
      let json = await response.json();
      this.setState({
        results: json.results
      });
    }
  }
  clearSearch() {
    this.setState({
      searchValue: ""
    });
  }
  getId(id) {
    console.log(id);
    this.setState({ clickedId: id });
  }

  componentDidMount() {
    if (this.props.history.location.results === undefined) {
      this.fetchMovies("tv");
    } else {
      this.setState({
        results: this.props.history.location.results,
        tvOrMovie: this.props.history.location.tvOrMovie,
        searchValue: this.props.history.location.searchValue
      });
    }
  }
  componentWillUnmount() {
    this.props.history.push(this.state);
  }
  render() {
    return (
      <div>
        <div className='container-fluid mb-3 mt-3'>
          <button
            className={
              this.state.tvOrMovie === "movie" ? "btn btn-primary" : "btn"
            }
            onClick={() => {
              this.fetchMovies("movie");
              this.clearSearch();
            }}
          >
            Movies
          </button>
          <button
            className={
              this.state.tvOrMovie === "tv" ? "btn btn-primary" : "btn"
            }
            onClick={() => {
              this.fetchMovies("tv");
              this.clearSearch();
            }}
          >
            TV Shows
          </button>
        </div>
        <div className='container-fluid mb-3'>
          <input
            onChange={e => this.search(e)}
            className='form-control'
            id='search'
            type='search'
            placeholder='search'
            value={this.state.searchValue}
          />
        </div>
        <div className='container-fluid'>
          <div className='row'>
            {this.state &&
              this.state.results &&
              this.state.results
                .slice(0, 10)
                .map(result => (
                  <Item
                    handleClick={this.getId}
                    key={result.id}
                    id={result.id}
                    tvOrMovie={this.state.tvOrMovie}
                    src={result.poster_path}
                    title={result.title || result.name}
                  />
                ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
