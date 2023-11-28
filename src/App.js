import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Popular from "./components/Popular";
import SearchMenu from "./components/SearchMenu";
import MovieDetails from "./components/MovieDetails";
import Account from "./components/Account";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/popular"
          element={
            <PrivateRoute>
              <Popular />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SearchMenu />
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
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;