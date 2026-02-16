import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaFilm } from 'react-icons/fa';
import useDebounce from '../hooks/useDebounce';

const Navbar = styled.nav`
  background-color: #141414;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  color: #e50914;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  &:hover {
    color: #e50914;
  }
`;

const SearchContainer = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  padding-left: 2rem;
  border-radius: 20px;
  border: 1px solid #333;
  background-color: #333;
  color: #fff;
  outline: none;
  width: 200px;
  transition: width 0.3s, background-color 0.3s;

  &:focus {
    width: 250px;
    background-color: #000;
    border-color: #e50914;
  }

  @media (max-width: 600px) {
    width: 150px;
    &:focus {
      width: 180px;
    }
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.8rem;
  color: #999;
  font-size: 0.8rem;
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState(() => {
    // Initialize state from URL to avoid initial redirect issues
    if (window.location.pathname === '/search') {
        const params = new URLSearchParams(window.location.search);
        return params.get('q') || '';
    }
    return '';
  });

  const debouncedQuery = useDebounce(query, 500);
  const prevDebouncedQuery = useRef(debouncedQuery);

  // Sync state with URL when navigating (e.g. Back button)
  useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search);
      const q = params.get('q') || '';
      if (q !== query) {
          setQuery(q);
          prevDebouncedQuery.current = q;
      }
    }
  }, [location.pathname, location.search]);

  // Navigate on debounced query change (User Typing)
  useEffect(() => {
    if (prevDebouncedQuery.current !== debouncedQuery) {
        prevDebouncedQuery.current = debouncedQuery;

        if (debouncedQuery) {
            navigate(`/search?q=${encodeURIComponent(debouncedQuery)}`, { replace: true });
        } else {
             if (location.pathname === '/search' && location.search !== '') {
                navigate('/search', { replace: true });
            }
        }
    }
  }, [debouncedQuery, navigate, location.pathname, location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Navbar>
      <Logo to="/">
        <FaFilm /> CineVault
      </Logo>
      <NavLinks>
        <SearchContainer onSubmit={handleSearch}>
            <SearchIcon />
            <SearchInput
                type="text"
                placeholder="Titles, people, genres..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </SearchContainer>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/watchlist">Watchlist</StyledLink>
      </NavLinks>
    </Navbar>
  );
};

export default Header;
