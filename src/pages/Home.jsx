import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchTrending } from '../services/api';
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

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrending = async () => {
      try {
        const data = await fetchTrending();
        setTrending(data);
      } catch (err) {
        setError('Failed to load trending content.');
      } finally {
        setLoading(false);
      }
    };

    getTrending();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <Title>Trending Now</Title>
      {trending.length > 0 ? (
        <Grid>
          {trending.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </Grid>
      ) : (
        <p>No trending content available.</p>
      )}
    </Container>
  );
};

export default Home;
