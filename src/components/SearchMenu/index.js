import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Header from "../Header";
import Cookies from "js-cookie";
import SearchMovieItems from "../SearchMovieItems";
import FailurePage from "../FailurePage";
import "./index.css";

const isSearch = true;
function SearchMenu() {
  const [searchlist, setSearchList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loader, setLoader] = useState("initial");

  const fetchSearchUser = async (search) => {
    setSearchInput(search);
    setLoader("loading");
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${search}`,
      options
    );
    const data = await response.json();
    if (response.ok) {
      const fetchedData = data.results.map((each) => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
        backdropPath: each.backdrop_path,
      }));
      setSearchList(fetchedData);
      setLoader("success");
    } else {
      setLoader("fail");
    }
  };

  useEffect(() => {
    fetchSearchUser();
  }, []);

  const successSearch = () => {
    return searchlist.length > 0 ? (
      <div className="succes-search-card">
        {searchlist.map((eachItem) => (
          <SearchMovieItems key={eachItem.id} item={eachItem} />
        ))}
      </div>
    ) : (
      noResultsView()
    );
  };

  const noResultsView = () => (
    <div className="no-results-view">
      <img
        className="no-results-img"
        alt="no movies"
        src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/No_Views_awtv8d.svg"
      />
      <p className="no-results-text">
        Your search for {searchInput} did not find any matches.
      </p>
    </div>
  );

  const loaderView = () => (
    <div className="loader-container" testid="loader">
      <TailSpin type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  );
  const tryAgainSearchData = () => {
    fetchSearchUser();
  };

  const renderFailureView = () => <FailurePage tryAgain={tryAgainSearchData} />;

  const searchMenuSwitch = () => {
    switch (loader) {
      case "loading":
        return loaderView();
      case "success":
        return successSearch();
      case "fail":
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="search-bg-container">
      <Header fetchSearchUser={fetchSearchUser} isSearch={isSearch} />
      {searchMenuSwitch()}
    </div>
  );
}

export default SearchMenu;