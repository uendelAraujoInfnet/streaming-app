// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Search from './pages/Search';

import Movies from "./pages/Movies";
import MovieDetails from './pages/MovieDetails';

import Profile from './pages/Profile';
import Releases from './pages/Releases';

import Header from './components/Header';

import Series from './pages/Series';
import SerieDetails from './pages/SerieDetails';


function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />

        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/releases" element={<Releases />} />
        
        <Route path="/series" element={<Series />} />
        <Route path="/serie/:id" element={<SerieDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
