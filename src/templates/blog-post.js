import React from "react";
import { graphql, Link } from "gatsby";
import BackIcon from "../components/BackIcon";

export default function BlogPost({ data }) {
  const post = data.markdownRemark;
  return (
    <div className="blog-container">
      <div className="navs center">
        <span>
          <BackIcon />
        </span>
        <span className="home-text">
          <Link to="/">Home</Link>
        </span>
      </div>
      <h1>{post.frontmatter.title}</h1>
      <div className="date-span">{post.frontmatter.date}</div>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
        className="markd"
      ></div>
    </div>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`;
