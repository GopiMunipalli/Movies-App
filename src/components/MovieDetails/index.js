import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import Header from "../Header";
import Footer from "../Footer";
import SimilarMovies from "../HomeMovies";
import FailurePage from "../FailurePage";
import "./index.css";

const AvailableLanguages = (props) => {
  const { languages } = props;
  const { englishName } = languages;
  return (
    <li className="info-items list-item">
      <p>{englishName}</p>
    </li>
  );
};

const GenreList = (props) => {
  const { eachItem } = props;
  const { name } = eachItem;
  return (
    <li className="info-items list-item">
      <p>{name}</p>
    </li>
  );
};

function MovieDetails() {
  const [eachMovie, setEachMovie] = useState([]);
  const [loader, setLoader] = useState("initial");
  const { id } = useParams();

  const getMovieDetails = useCallback(async () => {
    setLoader("loading");
    const jwtToken = Cookies.get("jwt_token");
    const movieDetailsApi = `https://apis.ccbp.in/movies-app/movies/${id}`;
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${jwtToken}` },
    };
    const response = await fetch(movieDetailsApi, options);
    if (response.ok) {
      const data = await response.json();
      const updatedGenreList = data.movie_details.genres.map((eachGenre) => ({
        id: eachGenre.id,
        name: eachGenre.name,
      }));
      const updatedSimilarMovies = data.movie_details.similar_movies.map(
        (eachMovie) => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        })
      );
      const updatedSpokenLanguages = data.movie_details.spoken_languages.map(
        (eachLanguage) => ({
          id: eachLanguage.id,
          englishName: eachLanguage.english_name,
        })
      );
      const updatedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: updatedGenreList,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: updatedSimilarMovies,
        spokenLanguages: updatedSpokenLanguages,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      };
      setEachMovie(updatedData);
      setLoader("success");
    } else {
      setLoader("fail");
    }
  }, [id]);

  useEffect(() => {
    getMovieDetails();
  }, [getMovieDetails]);

  const renderSuccessView = () => {
    if (!eachMovie.genres || !eachMovie.spokenLanguages) {
      return <div>No data available for this movie.</div>;
    }

    const {
      adult,
      backdropPath,
      budget,
      genres,
      overview,
      releaseDate,
      runtime,
      similarMovies,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = eachMovie;
    const inHours = Math.floor(runtime / 60);
    const inMinutes = runtime % 60;
    const runTimeInHoursAndMinutes = `${inHours}h ${inMinutes}m`;
    const certificateName = adult ? "A" : "U/A";
    const releaseYear = new Date(releaseDate).getFullYear();
    const releaseDateFormat = new Date(releaseDate).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    return (
      <>
        <div
          style={{ backgroundImage: `url(${backdropPath})` }}
          className="movie-detail-page"
        >
          <Header />
          <div className="movie-detail-movie-page">
            <h1 className="title">{title}</h1>
            <div className="more-details">
              <p className="duration">{runTimeInHoursAndMinutes}</p>
              <p className="certificate">{certificateName}</p>
              <p className="release-year">{releaseYear}</p>
            </div>
            <p className="over-view">{overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="additional-information">
          <div className="movie-info">
            <div className="info">
              <h1 className="info-heading">Genres</h1>
              <ul className="list-items">
                {genres.map((eachItem) => (
                  <GenreList eachItem={eachItem} key={eachItem.id} />
                ))}
              </ul>
            </div>
            <div className="info">
              <h1 className="info-heading">Audio Available</h1>
              <ul className="list-items">
                {spokenLanguages.map((eachlanguage) => (
                  <AvailableLanguages
                    languages={eachlanguage}
                    key={eachlanguage.id}
                  />
                ))}
              </ul>
            </div>
            <div className="info">
              <h1 className="info-heading">Rating Count</h1>
              <p className="info-items info-name">{voteCount}</p>
              <h1 className="info-heading">Rating Average</h1>
              <p className="info-items info-name">{voteAverage}</p>
            </div>
            <div className="info info1">
              <h1 className="info-heading">Budget</h1>
              <p className="info-items info-name">{budget}</p>
              <h1 className="info-heading">Release Date</h1>
              <p className="info-items info-name">{releaseDateFormat}</p>
            </div>
          </div>
          <div className="similar-movies-container">
            <h1 className="more-like-this-text">More like this</h1>
            <div className="similar-movies-list">
              {similarMovies.map((eachMovie) => (
                <SimilarMovies movieDetails={eachMovie} key={eachMovie.id} />
              ))}
            </div>
          </div>
          <Footer />
          <p
            style={{
              color: "ffffff",
              paddingTop: "10px",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "15px",
            }}
          >
            Contact Us
          </p>
        </div>
      </>
    );
  };

  const renderLoaderView = () => (
    <>
      <Header />
      <div className="loader-container" testid="loader">
        <TailSpin type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  );

  const tryAgain = () => {
    tryAgain();
  };

  const renderFailureView = () => {
    return (
      <div>
        <Header />
        <FailurePage tryAgain={tryAgain} />
      </div>
    );
  };

  const renderSwitchCase = () => {
    switch (loader) {
      case "loader":
        return renderLoaderView();
      case "success":
        return renderSuccessView();
      case "fail":
        return renderFailureView();
      default:
        return null;
    }
  };

  return <div className="movie-details-container">{renderSwitchCase()}</div>;
}

export default MovieDetails;