import { Link } from "gatsby";
import React from "react";

const about = () => {
  return (
    <div>
      I am about page
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default about;
