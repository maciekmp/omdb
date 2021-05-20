import axios from "axios";
import { useCallback, useState } from "react";
import { search } from "./api";
import CenterText from "./components/CenterText";
import Container from "./components/Container";
import Input from "./components/Input";
import Item from "./components/Item";
import List from "./components/List";
import Movie from "./types/movie";

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Movie[]>([]);
  const handleKeyDown = useCallback(e => {
    if(e.code === 'Enter') {
      if (query === '') {
        return;
      }
      setError(false);
      setLoading(true);
      search(query)
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    }
  }, [query])
  return (
    <Container>
      <Input
        placeholder="movie title..."
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onClear={() => {
          setQuery('');
        }}
      />
      {isLoading && (
        <CenterText>loading</CenterText>
      )}
      {!isLoading && isError && (
        <CenterText>There was an error</CenterText>
      )}
      {!isLoading && !isError && !!data.length && (
        <List data-testid="list">
          {data.map(item => (
            <Item key={item.imdbID}>
              <a href={`https://www.imdb.com/title/${item.imdbID}`}>
                {item.Title}
              </a>
            </Item>
          ))}
        </List>
      )}
    </Container>
  );
}

export default App;
