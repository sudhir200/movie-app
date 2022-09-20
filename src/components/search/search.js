import React, { useEffect } from "react";
import "./style.css";
import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";
import { getMoviesByName } from "../../api/movies";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchFields } from "./searchJsons";

function Search(props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = React.useState(
    searchParams.get("q") || ""
  );
  const [quality, setQuality] = React.useState(
    searchParams.get("quality") || "all"
  );
  const [genre, setGenre] = React.useState(searchParams.get("genre") || "all");
  useEffect(() => {
    handleSearch();
  }, [searchText, quality]);
  const handleSearch = () => {
    getMoviesByName(searchText, quality, genre)
      .then((data) => {
        navigate(
          window.location.pathname +
            `?q=${searchText}&quality=${quality}&genre=${genre}`
        );
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
      <Box
        display={"grid"}
        gridTemplateColumns={{ sm: `repeat(${searchFields.length},1fr)` }}
        gap={2}
      >
        {searchFields?.map((item) => (
          <Box display={"grid"} gap={1}>
            <span className={"search-header-text"}>{item?.name}</span>
            <select
              className={"search-select"}
              defaultValue={item?.options[0].value}
              onChange={(e) => {
                switch (item.name) {
                  case "Quality":
                    setQuality(e?.target.value);
                    break;
                  case "Genre":
                    setGenre(e?.target.value);
                    break;
                }
              }}
            >
              {item?.options?.map((data) => (
                <option
                  defaultValue={item?.options[0].value}
                  value={data.value}
                >
                  {data.name}
                </option>
              ))}
            </select>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default Search;
