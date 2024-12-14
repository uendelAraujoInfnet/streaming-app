// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Series from "./pages/Series";
import SerieDetails from "./pages/SerieDetails";
import Search from "./pages/Search";
import Releases from "./pages/Releases";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/releases" element={<Releases />} />

          {/* Rotas privadas */}
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <PrivateRoute>
                <MovieDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/series/:id"
            element={
              <PrivateRoute>
                <SerieDetails />
              </PrivateRoute>
            }
          />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        
      </AuthProvider>
      <Footer />
    </Router>
  );
}

export default App;
