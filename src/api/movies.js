import axios from "axios";

export function getMoviesByName(
  query,
  quality,
  genre,
  rating,
  year,
  sort_by,
  order,
  page
) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://yts.mx/api/v2/list_movies.json?query_term=${query}&quality=${quality}&genre=${genre}&minimum_rating=${rating}&${year}&sort_by=${sort_by}&order_by=${order}&page=${page}&limit=50`
      )
      .then((res) => {
        resolve(res?.data?.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getMovieDetailById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then((res) => {
        resolve(res?.data?.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
