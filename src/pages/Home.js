import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY);

  //if (data) {
  //  console.log(data);
  //}

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h3>Latest Messages</h3>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <PostForm />
          </Grid.Column>
        )}
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h3>Loading messages...</h3>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map(post => (
                <Grid.Column
                  mobile={16}
                  tablet={8}
                  computer={5}
                  key={post.id}
                  style={{ marginBottom: 20 }}
                >
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
