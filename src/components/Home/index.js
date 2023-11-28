import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from "js-cookie";
import HomeMovies from "../HomeMovies";
import Header from "../Header";
import Footer from "../Footer";
import "./index.css";

const isHome = true;
function Home() {
  const [posterView, setPosterView] = useState([]);
  const [trendingMoviesData, setTrendingMoviesData] = useState([]);
  const [originalMoviesData, setOriginalMoviesData] = useState([]);
  const [loader, setLoader] = useState("initial");
  const [originalLoader, setOriginalLoader] = useState("initial");

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 340,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const fetchTrendingApi = async () => {
    setLoader("loading");
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/Json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const trendingApiResponse = await fetch(
      "https://apis.ccbp.in/movies-app/trending-movies",
      options
    );
    const data = await trendingApiResponse.json();
    if (trendingApiResponse.ok) {
      const fetchedTrendingData = data.results.map((eachData) => ({
        id: eachData.id,
        backdropPath: eachData.backdrop_path,
        title: eachData.title,
        posterPath: eachData.poster_path,
        overview: eachData.overview,
      }));
      setTrendingMoviesData(fetchedTrendingData);
      setLoader("success");
    } else {
      setLoader("fail");
    }
  };

  const fetchOriginalApi = async () => {
    setOriginalLoader("loading");
    const originalJwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${originalJwtToken}`,
      },
    };
    const originalResponse = await fetch(
      "https://apis.ccbp.in/movies-app/originals",
      options
    );
    const originalData = await originalResponse.json();
    if (originalResponse.ok) {
      const fetchedOriginalData = originalData.results.map((eachData) => ({
        id: eachData.id,
        backdropPath: eachData.backdrop_path,
        posterPath: eachData.poster_path,
        title: eachData.title,
        overview: eachData.overview,
      }));
      setOriginalMoviesData(fetchedOriginalData);
      const randomNum = Math.floor(Math.random() * fetchedOriginalData.length);
      const posterUrlData = fetchedOriginalData[randomNum];
      setPosterView(posterUrlData);
      setOriginalLoader("success");
    } else {
      setOriginalLoader("fail");
    }
  };

  const succesPosterView = () => {
    const { overview, title, backdropPath } = posterView;
    return (
      <div
        style={{ backgroundImage: `url(${backdropPath})` }}
        className="poster-bg-image"
      >
        <Header isHome={isHome} />
        <div className="poster-items">
          <h2 className="poster-heading">{title}</h2>
          <p className="poster-desc">{overview}</p>
          <button type="button">Play</button>
        </div>
      </div>
    );
  };

  const trendingSuccessApi = () => {
    return (
      <div className="trending-success-container">
        <Slider {...settings}>
          {trendingMoviesData.map((eachMovie) => (
            <HomeMovies key={eachMovie.id} movieDetails={eachMovie} />
          ))}
        </Slider>
      </div>
    );
  };

  const originalSuccesApi = () => (
    <div className="trending-success-container">
      <Slider {...settings}>
        {originalMoviesData.map((eachMovie) => (
          <HomeMovies key={eachMovie.id} movieDetails={eachMovie} />
        ))}
      </Slider>
    </div>
  );

  const retryTrendingMoviesData = () => {
    setLoader("loading");
    trendingSuccessApi();
  };

  const trendingFailureApi = () => {
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
            onClick={retryTrendingMoviesData}
            className="thumbnail-try-again-btn"
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  };

  const retryOriginalMoviesData = () => {
    setOriginalLoader("loading");
    originalSuccesApi();
  };

  const originalFailureApi = () => (
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
          onClick={retryOriginalMoviesData}
          className="thumbnail-try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const retryPosterMoviesData = () => {
    succesPosterView();
  };

  const posterFailureView = () => (
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
          onClick={retryPosterMoviesData}
          className="thumbnail-try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const trendingLoader = () => (
    <div className="loader-container" testid="loader">
      <TailSpin type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  );

  const originalLoadingView = () => (
    <div className="loader-container" testid="loader">
      <TailSpin type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  );

  const posterLoadingView = () => (
    <div className="loader-container" testid="loader">
      <TailSpin type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  );

  useEffect(() => {
    fetchTrendingApi();
    fetchOriginalApi();
  }, []);

  const trendingSwitchCase = () => {
    switch (loader) {
      case "loading":
        return trendingLoader();
      case "success":
        return trendingSuccessApi();
      case "fail":
        return trendingFailureApi();
      default:
        return null;
    }
  };

  const originalSwitchCase = () => {
    switch (originalLoader) {
      case "loading":
        return originalLoadingView();
      case "success":
        return originalSuccesApi();
      case "fail":
        return originalFailureApi();
      default:
        return null;
    }
  };

  const posterSwitchCase = () => {
    switch (originalLoader) {
      case "loading":
        return posterLoadingView();
      case "success":
        return succesPosterView();
      case "fail":
        return posterFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="home-page-container">
      {posterSwitchCase()}
      <h2 className="items-heading">Trending Now</h2>
      {trendingSwitchCase()}
      <h2 className="items-heading">Orginals</h2>
      {originalSwitchCase()}
      <Footer />
      <p
        style={{
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
          paddingTop: "10px",
        }}
      >
        ContactUs
      </p>
    </div>
  );
}

export default Home;