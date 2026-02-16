import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { searchMulti } from '../services/api';
import MovieCard from '../components/MovieCard';
import Grid from '../components/Grid';
import Loader from '../components/Loader';

const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #fff;
  margin-bottom: 1.5rem;
  padding-left: 2rem;
  border-left: 5px solid #e50914;
`;

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        setLoading(true);
        try {
          const data = await searchMulti(query);
          setResults(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <Container>
        {query && <Title>Search Results for "{query}"</Title>}
        {loading ? (
            <Loader />
        ) : (
            results.length > 0 ? (
                <Grid>
                    {results.map((item) => (
                        <MovieCard key={item.id} movie={item} />
                    ))}
                </Grid>
            ) : (
                query && <p style={{textAlign: 'center', marginTop: '2rem'}}>No results found.</p>
            )
        )}
    </Container>
  );
};

export default Search;
