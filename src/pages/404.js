import React from "react";
import { graphql, Link } from "gatsby";
import SEO from "../components/seo";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div style={{ margin: "auto", width: "680px" }}>
        <SEO title="404: Not Found" />
        <h1>Not Found</h1>
        <p>Oops, this route dosen't exist....</p>
        <div style={{ marginTop: "20px" }}>
          <Link to="/" style={{ color: "#007acc" }}>
            Home
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
