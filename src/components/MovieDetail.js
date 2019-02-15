import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./iframe.css";
class MovieDetails extends Component {
  state = {
    trailer: null,
    poster: null,
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
        "&append_to_response=videos&language=en-US"
    );
    let json = await response.json();

    let videos = await fetch(
      "https://api.themoviedb.org/3/" +
        tvOrMovie +
        "/" +
        id +
        "/videos?api_key=" +
        apiKey
    );
    let videosJson = await videos.json();

    if (
      videosJson.results.length > 0 &&
      videosJson.results[0].type === "Trailer"
    ) {
      this.setState({
        trailer: videosJson.results[0].key
      });
    }

    this.setState({
      poster: json.poster_path,
      name: json.name || json.title,
      overview: json.overview
    });
  }
  componentDidMount() {
    this.id(this.props.id, this.props.tvOrMovie);
  }
  render() {
    if (this.state.trailer != null) {
      return (
        <div className='container-fluid mb-3 mt-3'>
          <Link to={"/"}>
            <button className='btn btn-primary'>Back</button>
          </Link>
          <hr />
          <div className='row justify-content-center '>
            <div className='col-xl-4 col-lg-6 col-md-8 col-sm-9'>
              <div className='card ' style={{ boxShadow: "1px 1px 1px #fff" }}>
                <div className='videoWrapper'>
                  <iframe
                    title='trailer'
                    id='video'
                    width='560'
                    height='315'
                    src={"https://www.youtube.com/embed/" + this.state.trailer}
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>
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
    } else {
      return (
        <div className='container-fluid mb-3 mt-3'>
          <Link to={"/"}>
            <button className='btn btn-primary'>Back</button>
          </Link>
          <hr />
          <div className='row justify-content-center '>
            <div className='col-xl-4 col-lg-6 col-md-8 col-sm-9'>
              <div className='card ' style={{ boxShadow: "1px 1px 1px #fff" }}>
                {this.state.poster ? (
                  <img
                    className='card-img-top img-fluid'
                    src={"http://image.tmdb.org/t/p/w400/" + this.state.poster}
                    alt={this.state.name}
                  />
                ) : null}

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
}

export default MovieDetails;
