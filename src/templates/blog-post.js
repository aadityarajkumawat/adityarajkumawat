import React from "react";
import { graphql, Link } from "gatsby";
import SEO from "../components/seo";

export default function BlogPost({ data }) {
  const post = data.markdownRemark;
  return (
    <div className="blog-container">
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div className="navs center">
        <span className="home-text">
          <Link to="/">Home</Link>
        </span>
      </div>
      <div className="info center">
        <span>
          {post.frontmatter.slug.substr(1, 4) +
            "#" +
            post.frontmatter.slug.substr(5, 6)}
        </span>
        <span>{post.frontmatter.date}</span>
      </div>
      <h1>{post.frontmatter.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
        className="markd"
      ></div>

      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: 50,
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: 25
        }}
      >
        Thank You
      </div>

      <div className="blog-footer">
        Contact me{" "}
        <a href="https://twitter.com/Aaditya86763230" target="__blank">
          @Aaditya86763230
        </a>{" "}
        for queries
      </div>
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
        slug
      }
      excerpt
    }
  }
`;
