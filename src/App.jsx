import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import Search from './pages/Search';
import Details from './pages/Details';
import { GlobalProvider } from './context/GlobalState';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details/:type/:id" element={<Details />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
