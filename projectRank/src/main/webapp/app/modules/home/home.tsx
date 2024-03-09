import './home.scss';

import React from 'react';


import { Row, Col, Alert } from 'reactstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useAppSelector } from 'app/config/store';
export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <body className={"body-homepage"}>



    <div className={"Page-container"}>
      <div className={"PageContent"}>
        <h1 style={{color: "white"}}>Welcome to Project Rank</h1>
        <p style={{color:"whitesmoke"}}> Discover, Showcase and support projects through two different ranking systems.  </p>
      </div>

      <div className={"section-Container"}>


    <div className="section">
      <h2 className="section__title">Elo Ranking</h2>
      <p className="section__description">
        Elo ranking is a method for calculating the relative skill levels of players in two-player games. We use this system by applying it to your choice based on the two different projects you are shown
      </p>
      <Link to={"/elopage"}>
        <button className={"link-to-Post"}>
          Navigate to eloPage
        </button>
      </Link>
    </div>

  <div className="section post">
    <h2 className="section__title">Post Ranking</h2>
    <p className="section__description">
      A standard social media style system where you can show your support through likes.
    </p>
    <Link  to={"/postpage"}>
      <button className={"link-to-Post"} >
        Navigate to post page
      </button>
    </Link>
  </div>
      </div>

        <Link to={"/leaderboard"}>
          <button className={"link-to-Leaderboard"}>
            Navigate to the leaderboards
          </button>
        </Link>


    </div>

    </body>
  );
};

export default Home;
