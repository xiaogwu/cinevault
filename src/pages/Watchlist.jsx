import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalState';
import MovieCard from '../components/MovieCard';
import Grid from '../components/Grid';

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

const NoWatchlist = styled.p`
  color: #777;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
`;

const Watchlist = () => {
  const { watchlist } = useContext(GlobalContext);

  return (
    <Container>
      <Title>My Watchlist</Title>
      {watchlist.length > 0 ? (
        <Grid>
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Grid>
      ) : (
        <NoWatchlist>No movies in your watchlist, add some!</NoWatchlist>
      )}
    </Container>
  );
};

export default Watchlist;
