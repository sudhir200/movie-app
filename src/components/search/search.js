import React, { useEffect } from "react";
import "./style.css";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
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
  const [year, setYear] = React.useState(searchParams.get("year") || "all");
  const [order, setOrder] = React.useState(
    searchParams.get("order_by") || "desc"
  );
  const [sort_by, setSortBy] = React.useState(
    searchParams.get("sort_by") || "all"
  );
  const [rating, setRating] = React.useState(
    searchParams.get("rating") || "all"
  );
  useEffect(() => {
    handleSearch();
  }, [searchText, quality, genre, rating, sort_by, order, props?.page]);
  const handleSearch = () => {
    getMoviesByName(
      searchText,
      quality,
      genre,
      rating,
      year,
      sort_by,
      order,
      props.page
    )
      .then((data) => {
        handlePath();
        props?.onMovieSearch(data, searchText);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePath = () => {
    navigate(
      window.location.pathname +
        `?q=${searchText}&quality=${quality}&genre=${genre}&rating=${rating}&year=${year}&sort_by=${sort_by}&order_by=${order}&page=${
          props?.page || 1
        }`
    );
  };
  const stateValue = (name) => {
    switch (name) {
      case "Quality":
        return quality;
      case "Genre":
        return genre;
      case "Rating":
        return rating;
      case "Year":
        return year;
      case "Sort By":
        return sort_by;
      case "Order By":
        return order;
    }
  };
  const updateState = (item, e) => {
    switch (item.name) {
      case "Quality":
        setQuality(e?.target.value);
        break;
      case "Genre":
        setGenre(e?.target.value);
        break;
      case "Rating":
        setRating(e?.target.value);
        break;
      case "Year":
        setYear(e?.target.value);
        break;
      case "Sort By":
        setSortBy(e?.target.value);
        break;
      case "Order By":
        setOrder(e?.target.value);
        break;
    }
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
              defaultValue={stateValue(item?.name) ?? item?.options[0].value}
              onChange={(e) => {
                updateState(item, e);
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
