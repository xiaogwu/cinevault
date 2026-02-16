import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchDetails } from '../services/api';
import Loader from '../components/Loader';
import { GlobalContext } from '../context/GlobalState';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #fff;
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Poster = styled.img`
  width: 300px;
  height: auto;
  border-radius: 8px;
  align-self: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Tagline = styled.p`
  font-style: italic;
  color: #ccc;
  margin-bottom: 1rem;
`;

const Overview = styled.p`
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #aaa;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;
  margin-bottom: 2rem;

  &:hover {
    background-color: #f40612;
  }
`;

const CastList = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-top: 1rem;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }
`;

const CastMember = styled.div`
  min-width: 100px;
  text-align: center;
`;

const CastImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const Details = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { watchlist, addMovieToWatchlist, removeMovieFromWatchlist } = useContext(GlobalContext);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchDetails(type, id);
        setDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [type, id]);

  if (loading) return <Loader />;
  if (!details) return <Container>Error loading details.</Container>;

  let storedMovie = watchlist.find(o => o.id === details.id);
  const watchlistDisabled = storedMovie ? true : false;

  const toggleWatchlist = () => {
    if (watchlistDisabled) {
      removeMovieFromWatchlist(details.id);
    } else {
      addMovieToWatchlist(details);
    }
  };

  const posterPath = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const genres = details.genres?.map(g => g.name).join(', ');

  return (
    <Container>
      <Content>
        <Poster src={posterPath} alt={details.title || details.name} />
        <Info>
          <Title>{details.title || details.name}</Title>
          {details.tagline && <Tagline>{details.tagline}</Tagline>}
          <Meta>
            <span>{details.release_date || details.first_air_date}</span>
            <span>★ {details.vote_average?.toFixed(1)}</span>
            <span>{details.runtime || details.episode_run_time?.[0]} min</span>
            {genres && <span>| {genres}</span>}
          </Meta>
          <Button onClick={toggleWatchlist}>
            {watchlistDisabled ? <><FaHeart /> Remove from Watchlist</> : <><FaRegHeart /> Add to Watchlist</>}
          </Button>
          <h3>Overview</h3>
          <Overview>{details.overview}</Overview>

          {details.credits?.cast?.length > 0 && (
            <>
              <h3>Cast</h3>
              <CastList>
                {details.credits.cast.slice(0, 10).map(actor => (
                  <CastMember key={actor.id}>
                    <CastImage
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                      alt={actor.name}
                    />
                    <small>{actor.name}</small>
                  </CastMember>
                ))}
              </CastList>
            </>
          )}
        </Info>
      </Content>
    </Container>
  );
};

export default Details;
