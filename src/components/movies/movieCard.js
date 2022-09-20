import React from "react";
import { Box, Typography } from "@mui/material";
import "./style.css";
import { Star } from "@mui/icons-material";

function MovieCard(props) {
  let movie = props?.movie;
  return (
    <>
      <Box
        onClick={() => {
          props?.onMovieClicked(movie);
        }}
        className={"movie-card"}
      >
        <img
          loading={"lazy"}
          src={movie?.medium_cover_image}
          onError={(e) => {
            e.target.src = movie?.background_image;
          }}
          alt={""}
        />
        <Box className={"rating-wrap"} position={"absolute"} top={0} right={0}>
          <span>{movie.rating} / 10</span>
          <Star color={"warning"} fontSize={"inherit"} />
        </Box>
      </Box>
    </>
  );
}

export default MovieCard;
