import { Link } from "react-router-dom";
import "./index.css";

function SearchMovieItems(props) {
  const { item } = props;
  const { id, posterPath, title } = item;
  return (
    <div className="search-movie-items-card">
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="movie-items" />
      </Link>
    </div>
  );
}
export default SearchMovieItems;