import axios from "axios";
import { source } from "./App";
import Movie from "./types/movie";

const CancelToken = axios.CancelToken;

type Response = {
  Search: Movie[];
};

let cancelSource;
export const search = (query: string) => {
  if (source) {
    source.cancel();
  }
  cancelSource = CancelToken.source();
  return axios.get<Response>(`https://www.omdbapi.com/?apikey=2591b2c&s=${query}`, {
    cancelToken: cancelSource.token,
  })
    .then(response => {
      if (!response.data.Search) {
        throw new Error();
      }
      return response.data.Search;
    });
};
