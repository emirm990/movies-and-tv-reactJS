import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Item.css";

class Item extends Component {
  render() {
    return (
      <Link
        to={{
          pathname: "/details",
          id: this.props.id,
          tvOrMovie: this.props.tvOrMovie
        }}
        onClick={id => this.props.handleClick(this.props.id)}
        className='card col-6 col-sm-6 col-md-4 col-lg-3 mb-3'
      >
        <img
          className='card-img-top img-fluid'
          src={"http://image.tmdb.org/t/p/w400/" + this.props.src}
          alt={this.props.title}
        />
        <h5 className='card-title text-center mt-3'>{this.props.title}</h5>
      </Link>
    );
  }
}

export default Item;
