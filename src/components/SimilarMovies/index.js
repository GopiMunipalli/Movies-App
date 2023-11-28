import "./index.css";

function SimilarMovies(props) {
  const { eachMovie } = props;
  const { posterPath, title } = eachMovie;
  return <img className="similar-movies-img" alt={title} src={posterPath} />;
}
export default SimilarMovies;