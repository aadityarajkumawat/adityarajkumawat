import React from "react";
import { graphql } from "gatsby";

const sm = ({ data }) => {
  return (
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <h3>{node.frontmatter.title}</h3>
          <section dangerouslySetInnerHTML={{ __html: node.html }}></section>
        </div>
      ))}
    </div>
  );
};

export default sm;

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          excerpt
          html
        }
      }
    }
  }
`;
