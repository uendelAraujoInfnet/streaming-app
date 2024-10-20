// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Profile from './pages/Profile';
import Header from './components/Header';

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
