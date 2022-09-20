import React from "react";
import Search from "../../components/search/search";
import "./style.css";
import { Box } from "@mui/material";
import MovieCard from "../../components/movies/movieCard";
import MovieDetail from "../../components/movies/movieDetail";

function Movies(props) {
  const [movies, setMovies] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [selectedMovie, setSelectedMovie] = React.useState({});
  const [openDetail, setOpenDetail] = React.useState(false);
  return (
    <div>
      <Box
        className={"movies-wrapper"}
        px={{ sm: 2, md: 10, xs: 1 }}
        py={{ sm: 2, md: 2, xs: 1 }}
      >
        <Search
          onMovieSearch={(data, txt) => {
            setMovies(data);
            setSearchText(txt);
          }}
        />
      </Box>
      {movies?.page_number ? (
        <Box px={{ sm: 2, md: 10, xs: 1 }} py={{ sm: 2, md: 2, xs: 1 }}>
          <h4>
            {movies?.movie_count} movies found for query "{searchText}"
          </h4>
          <div className={"results-wrapper"}>
            {movies?.movies?.map((item) => (
              <MovieCard
                key={item.id}
                onMovieClicked={(movie) => {
                  setSelectedMovie(movie);
                  setOpenDetail(true);
                }}
                movie={item}
              />
            ))}
          </div>
        </Box>
      ) : (
        ""
      )}
      <MovieDetail
        handleClose={() => setOpenDetail(false)}
        open={openDetail}
        movieId={selectedMovie?.id}
      />
    </div>
  );
}

export default Movies;
