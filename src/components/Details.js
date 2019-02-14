import React, { Component } from "react";
import MovieDetail from "./MovieDetail";

class Details extends Component {
  componentDidMount() {
    console.log("mounted", this.props.history.location.results);
    this.setState({
      results: this.props.history.location.results,
      tvOrMovie: this.props.history.location.tvOrMovie,
      searchValue: this.props.history.location.searchValue
    });
  }
  componentWillUnmount() {
    this.props.history.push(this.state);
  }
  state = {
    results: null
  };
  render() {
    return (
      <MovieDetail
        id={this.props.location.id}
        tvOrMovie={this.props.location.tvOrMovie}
      />
    );
  }
}

export default Details;
