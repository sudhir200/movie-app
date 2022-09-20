import React from "react";
import { Box } from "@mui/material";
import "./style.css";

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
        <img loading={"lazy"} src={movie?.medium_cover_image} alt={""} />
      </Box>
    </>
  );
}

export default MovieCard;
