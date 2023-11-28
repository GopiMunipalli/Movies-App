import { Link } from "react-router-dom";
import "./index.css";

function MovieItems(props) {
  const { itemDetails } = props;
  const { id, posterPath, title } = itemDetails;
  return (
    <li className="movie-items-container">
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="movie-items" />
      </Link>
    </li>
  );
}

export default MovieItems;