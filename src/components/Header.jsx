import { debounce } from "lodash";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  MenuItem,
  Menu,
  Button,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Home as HomeIcon,
  NewReleases as NewReleasesIcon,
  Movie as MovieIcon,
  LiveTv as LiveTvIcon,
  Category as CategoryIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import styles from "./Header.module.css";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoriesAnchorEl, setCategoriesAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isCategoriesMenuOpen = Boolean(categoriesAnchorEl);

  const debouncedNavigate = debounce((searchValue) => {
    navigate(`/search?q=${encodeURIComponent(searchValue)}`);
  }, 500);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoriesMenuOpen = (event) => {
    setCategoriesAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCategoriesAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    if (value.trim() !== "") {
      debouncedNavigate(value.trim());
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (searchInput.trim() === "") {
      navigate("/");
    } else {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }

    setSearchInput("");
  };

  // Lista de categorias
  const categories = [
    "Terror",
    "Aventura",
    "Ficção Científica",
    "Ação",
    "Guerra",
    "Religioso",
    "Suspense",
    "Animes",
    "Comédia",
    "Drama",
    "Músical",
    "Familia",
    "Documentário",
    "Mistério",
    "Adulto",
    "Faroeste",
    "Nacional",
    "Biográfia",
  ];

  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        {/* Menu Icon para telas menores */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          className={styles.menuButton}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Link to={"/"}>
          <img
            src="https://img.freepik.com/vecteurs-premium/fond-film-cinema-premiere_41737-251.jpg"
            className={styles.imageLogo}
          />
        </Link>

        {/* Menu para telas maiores */}
        <Box
          sx={{ display: { xs: "none", md: "flex" } }}
          className={styles.navMenu}
        >
          <Button color="inherit" startIcon={<HomeIcon />}>
            <Link to={"/"}>Início</Link>
          </Button>
          <Button color="inherit" startIcon={<NewReleasesIcon />}>
            <Link to={"/releases"} className={styles.link}>
              Lançamentos
            </Link>
          </Button>
          <Button color="inherit" startIcon={<MovieIcon />}>
            <Link to={"/movies"} className={styles.link}>
              Filmes
            </Link>
          </Button>
          <Button color="inherit" startIcon={<LiveTvIcon />}>
            <Link to={"/series"} className={styles.link}>
              Séries
            </Link>
          </Button>
          <Button
            color="inherit"
            startIcon={<CategoryIcon />}
            endIcon={<ExpandMoreIcon />}
            onMouseEnter={handleCategoriesMenuOpen}
            onClick={handleCategoriesMenuOpen}
          >
            Categorias
          </Button>
        </Box>

        {/* Barra de Busca */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar..."
              inputProps={{ "aria-label": "buscar" }}
              value={searchInput}
              onChange={handleSearchChange}
            />
          </Search>
        </form>

        {/* Botão de Login */}
        <Button
          color="inherit"
          startIcon={<AccountCircle />}
          className={styles.loginButton}
          sx={{ marginLeft: "20px" }}
        >
          Login
        </Button>
      </Toolbar>

      {/* Menu Responsivo */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        keepMounted
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link to="/" className={styles.link}>
            <HomeIcon sx={{ marginRight: 1 }} />
            Início
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/releases" className={styles.link}>
            <NewReleasesIcon sx={{ marginRight: 1 }} />
            Lançamentos
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/movies" className={styles.link}>
            <MovieIcon sx={{ marginRight: 1 }} />
            Filmes
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/series" className={styles.link}>
            <LiveTvIcon sx={{ marginRight: 1 }} />
            Séries
          </Link>
        </MenuItem>
      </Menu>

      {/* Submenu de Categorias */}
      <Menu
        anchorEl={categoriesAnchorEl}
        open={isCategoriesMenuOpen}
        onClose={handleMenuClose}
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        MenuListProps={{
          onMouseLeave: handleMenuClose,
        }}
      >
        {categories.map((category) => (
          <MenuItem key={category} onClick={handleMenuClose}>
            <Link to={`/category/${category}`} className={styles.link}>
              {category}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
}

export default Header;

// Estilos para a barra de busca usando styled components do MUI
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#ffffff", 0.15),
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  transition: "background-color 0.3s",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ffffff",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#ffffff",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // Padding vertical + padding do ícone
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
