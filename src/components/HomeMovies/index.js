import { Link } from "react-router-dom";
import "./index.css";

function HomeMovies(props) {
  const { movieDetails } = props;
  const { id, posterPath, title } = movieDetails;
  return (
    <Link to={`/movies/${id}`}>
      <li key={id} className="home-movies-container">
        <img src={posterPath} alt={title} className="home-movies-items" />
      </li>
    </Link>
  );
}

export default HomeMovies;