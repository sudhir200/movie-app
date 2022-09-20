import React, { useEffect } from "react";
import "./style.css";
import { Box, Button } from "@mui/material";
import { getMoviesByName } from "../../api/movies";
import { useNavigate, useSearchParams } from "react-router-dom";

function Search(props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = React.useState(
    searchParams.get("q") || ""
  );
  useEffect(() => {
    if (searchText) {
      handleSearch();
    }
  }, [searchText]);
  const handleSearch = () => {
    getMoviesByName(searchText)
      .then((data) => {
        navigate(window.location.pathname + `?q=${searchText}`);
        props?.onMovieSearch(data, searchText);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={"search-wrapper"}>
      <span className={"search-header-text"}>Search Term:</span>
      <Box display={"flex"} gap={3}>
        <input
          onChange={(e) => {
            setSearchText(e?.target?.value);
          }}
          value={searchText}
          className={"search-input"}
        />
        <Button
          sx={{ height: "inherit" }}
          color={"success"}
          variant={"contained"}
          type={"success"}
          onClick={() => {
            handleSearch();
          }}
        >
          Search
        </Button>
      </Box>
    </div>
  );
}

export default Search;
