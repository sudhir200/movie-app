import React from "react";
import Search from "../../components/search/search";
import "./style.css";
import { Box, Pagination } from "@mui/material";
import MovieCard from "../../components/movies/movieCard";
import MovieDetail from "../../components/movies/movieDetail";
import { useSearchParams } from "react-router-dom";

function Movies(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [selectedMovie, setSelectedMovie] = React.useState({});
  const [openDetail, setOpenDetail] = React.useState(false);
  const [page, setPage] = React.useState(Number(searchParams.get("page")) || 1);
  const [pageCount, setPageCount] = React.useState(5);

  const pageCalculator = (movies_count) => {
    let default_limit = 50;
    setPageCount(Math.ceil(movies_count / default_limit));
  };
  return (
    <div>
      <Box
        className={"movies-wrapper"}
        px={{ sm: 2, md: 10, xs: 1 }}
        py={{ sm: 2, md: 2, xs: 1 }}
      >
        <Search
          page={page}
          onMovieSearch={(data, txt) => {
            setMovies(data);
            setSearchText(txt);
            pageCalculator(data?.movie_count);
          }}
        />
      </Box>
      {movies?.page_number ? (
        <Box
          sx={{ background: "#212121", color: "#fff" }}
          minHeight={window.innerHeight}
          height={"100%"}
          px={{ sm: 2, md: 10, xs: 1 }}
          py={{ sm: 2, md: 2, xs: 1 }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <h4>{movies?.movie_count} movies found</h4>
            <Pagination
              onChange={(event, value) => {
                setPage(Number(value));
              }}
              sx={{ color: "#fff" }}
              count={pageCount}
              page={page}
              color={"standard"}
            />
          </Box>
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
          <Box my={4} justifyContent={"center"} display={"flex"}>
            <Pagination
              onChange={(event, value) => {
                setPage(Number(value));
              }}
              sx={{ color: "#fff" }}
              count={pageCount}
              page={page}
              boundaryCount={6}
              color={"standard"}
            />
          </Box>
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
