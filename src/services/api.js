import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export const fetchTrending = async () => {
    if (!API_KEY) {
        console.warn("API Key missing, using mock data for trending.");
        return mockTrending();
    }
    try {
        const response = await api.get('/trending/all/week');
        return response.data.results;
    } catch (error) {
        console.error("Error fetching trending:", error);
        return mockTrending();
    }
};

export const searchMulti = async (query) => {
    if (!query) return [];
    if (!API_KEY) {
        console.warn("API Key missing, using mock data for search.");
        return mockSearch(query);
    }
    try {
        const response = await api.get('/search/multi', {
            params: { query },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error searching:", error);
        return mockSearch(query);
    }
};

export const fetchDetails = async (type, id) => {
    if (!API_KEY) {
        console.warn("API Key missing, using mock data for details.");
        return mockDetails(id);
    }
    try {
        const response = await api.get(`/${type}/${id}`, {
            params: {
                append_to_response: 'credits,videos',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching details:", error);
        return mockDetails(id);
    }
};

// Mock Data
const mockTrending = () => Promise.resolve([
    {
        id: 550,
        title: 'Fight Club',
        media_type: 'movie',
        poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
        vote_average: 8.4,
        release_date: '1999-10-15'
    },
    {
        id: 1399,
        name: 'Game of Thrones',
        media_type: 'tv',
        poster_path: '/u3bZgnGQ9T01sWNhy95hkfU0Mvs.jpg',
        vote_average: 8.4,
        first_air_date: '2011-04-17'
    },
    {
        id: 27205,
        title: 'Inception',
        media_type: 'movie',
        poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
        vote_average: 8.3,
        release_date: '2010-07-15'
    },
     {
        id: 157336,
        title: 'Interstellar',
        media_type: 'movie',
        poster_path: '/gEU2QniL6C971PNLyfeRT3856OX.jpg',
        vote_average: 8.3,
        release_date: '2014-11-05'
    }
]);

const mockSearch = (query) => Promise.resolve([
    {
        id: 999,
        title: `Result for ${query}`,
        media_type: 'movie',
        poster_path: null,
        vote_average: 6.5,
        release_date: '2023-01-01'
    },
]);

const mockDetails = (id) => Promise.resolve({
    id,
    title: 'Mock Movie Details',
    name: 'Mock TV Show Details',
    overview: 'This is a detailed overview of the mock movie. It is very interesting and full of action.',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdrop_path: '/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
    vote_average: 8.5,
    release_date: '1999-10-15',
    genres: [{id: 1, name: 'Drama'}, {id: 2, name: 'Thriller'}],
    credits: {
        cast: [
            { id: 1, name: 'Brad Pitt', character: 'Tyler Durden', profile_path: '/cckcYc2v0yh1tc9QjRelptcOBko.jpg' },
            { id: 2, name: 'Edward Norton', character: 'The Narrator', profile_path: '/5XBzD5WuTyVQZeS4VI25z2moPrY.jpg' }
        ],
    },
});
