import React, { Component } from "react";
import { Link } from "react-router-dom";
class MovieDetails extends Component {
  state = {
    trailer: "trailer",
    poster: "poster",
    name: "name",
    overview: "overview"
  };
  async id(id, tvOrMovie) {
    let apiKey = "fdcceaee503d65d10f646f384fbc9aec";
    let response = await fetch(
      "https://api.themoviedb.org/3/" +
        tvOrMovie +
        "/" +
        id +
        "?api_key=" +
        apiKey +
        "&language=en-US"
    );
    let json = await response.json();
    console.log(json);
    this.setState({
      trailer: json.trailer,
      poster: json.poster_path,
      name: json.name || json.title,
      overview: json.overview
    });
    console.log(this.state);
  }
  componentDidMount() {
    this.id(this.props.id, this.props.tvOrMovie);
  }
  render() {
    return (
      <div className='container-fluid mb-3 mt-3'>
        <Link to={"/"}>
          <button className='btn btn-primary'>Back</button>
        </Link>
        <div className='row justify-content-center '>
          <div className='col-xl-4 col-lg-6 col-md-8 col-sm-9'>
            <div className='card ' style={{ boxShadow: "1px 1px 1px #fff" }}>
              <img
                className='card-img-top img-fluid'
                src={"http://image.tmdb.org/t/p/w400/" + this.state.poster}
                alt={this.state.name}
              />
              <div className='card-body'>
                <h4 className='card-title text-center mt-3'>
                  {this.state.name}
                </h4>
                <p className='card-text px-3 -pb-2'>{this.state.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
