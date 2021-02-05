import React, { Fragment } from "react";
import "../styles/global.css";

export default function Home() {
  const myData = {
    name: "Aditya Raj Kumawat",
    profileImg:
      "https://i.ibb.co/T8zCFw1/Whats-App-Image-2021-01-18-at-4-19-26-PM-copy.jpg",
    location: "Jaipur, RJ",
  };
  return (
    <Fragment>
      <div className="container">
        <div className="main">
          <div className="my-image-and-name">
            <div className="image-container">
              <img src={myData.profileImg} />
            </div>
            <div className="name-container">
              <div className="my-name">
                <a href="https://github.com/aadityarajkumawat" target='__blank'>{myData.name}</a>
              </div>
              <div className="my-location">{myData.location}</div>
            </div>
          </div>
          <div className="my-bio">
            Im a software engineer working on{" "}
            <a
              href="https://github.com/aadityarajkumawat/draftjs-raw-parser"
              target="__blank"
            >
              DraftJS-Parser
            </a>
            . I love doing stastical-probability in free time. Currently
            learning Gatsby. My favourite technologies are React, NodeJS,
            PostgreSQL, GraphQL and Docker.
          </div>

          <div className="my-posts">
            <div>My Posts</div>
            <ul>
              <li>
                <a href="#">How to manage state in react</a>
              </li>
              <li>
                <a href="#">Redux vs Context API(2021)</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
