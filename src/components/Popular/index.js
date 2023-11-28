import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import MovieItems from "../MovieItems";
import Header from "../Header";
import Footer from "../Footer";
import "./index.css";

const isPopular = true;
function Popular() {
  const [popularData, setPopularData] = useState([]);
  const [popularLoader, setPopularLoader] = useState("initial");

  const fetchPopularApi = async () => {
    setPopularLoader("loading");
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      "https://apis.ccbp.in/movies-app/popular-movies",
      options
    );
    const data = await response.json();
    if (response.ok) {
      const fetchedData = data.results.map((eachItem) => ({
        id: eachItem.id,
        title: eachItem.title,
        posterPath: eachItem.poster_path,
        backdropPath: eachItem.backdrop_path,
      }));
      setPopularData(fetchedData);
      setPopularLoader("success");
    } else {
      setPopularLoader("fail");
    }
  };

  const successPopularView = () => {
    return (
      <div className="succes-popular-container">
        {popularData.map((each) => (
          <MovieItems key={each.id} itemDetails={each} />
        ))}
      </div>
    );
  };

  const retryPopularMoviesData = () => {
    successPopularView();
  };

  const failurePopularView = () => {
    return (
      <div className="trending-failure-container">
        <div className="thumbnail-error-page">
          <img
            className="thumbnail-warning-icon"
            alt="failure view"
            src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
          />
          <p className="thumbnail-error-msg">
            Something went wrong. Please try again
          </p>
          <button
            onClick={retryPopularMoviesData}
            className="thumbnail-try-again-btn"
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  };

  const loadingPopularView = () => (
    <div className="loader-container" testid="loader">
      <TailSpin type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  );
  useEffect(() => {
    fetchPopularApi();
  }, []);

  const popularSwitchCase = () => {
    switch (popularLoader) {
      case "loading":
        return loadingPopularView();
      case "success":
        return successPopularView();
      case "fail":
        return failurePopularView();
      default:
        return null;
    }
  };
  return (
    <div className="popular-bg-container">
      <Header isPopular={isPopular} />
      {popularSwitchCase()}
      <Footer />
      <p
        style={{
          color: "#fff",
          fontWeight: "thin",
          textAlign: "center",
          fontFamily: "Roboto",
          paddingTop: "10px",
        }}
      >
        Contact Us
      </p>
    </div>
  );
}

export default Popular;