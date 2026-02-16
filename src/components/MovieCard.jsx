import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { GlobalContext } from '../context/GlobalState';

const Card = styled.div`
  position: relative;
  background-color: #222;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
  display: block;
  min-height: 300px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 0;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.span`
  font-size: 0.9rem;
  color: #fbbf24;
  margin-top: 0.5rem;
  display: block;
`;

const FavButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  color: #e50914;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const MovieCard = ({ movie }) => {
  const { watchlist, addMovieToWatchlist, removeMovieFromWatchlist } = useContext(GlobalContext);

  let storedMovie = watchlist.find(o => o.id === movie.id);
  const watchlistDisabled = storedMovie ? true : false;

  const toggleWatchlist = (e) => {
    e.preventDefault();
    if (watchlistDisabled) {
      removeMovieFromWatchlist(movie.id);
    } else {
      addMovieToWatchlist(movie);
    }
  };

  const imagePath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const type = movie.media_type || 'movie';

  return (
    <Card>
      <Link to={`/details/${type}/${movie.id}`} style={{ textDecoration: 'none' }}>
        <Poster src={imagePath} alt={movie.title || movie.name} loading="lazy" />
        <Info>
          <Title title={movie.title || movie.name}>{movie.title || movie.name}</Title>
          <Rating>★ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</Rating>
        </Info>
      </Link>
      <FavButton onClick={toggleWatchlist} aria-label={watchlistDisabled ? "Remove from watchlist" : "Add to watchlist"}>
        {watchlistDisabled ? <FaHeart /> : <FaRegHeart />}
      </FavButton>
    </Card>
  );
};

export default MovieCard;
