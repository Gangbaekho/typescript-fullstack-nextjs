import NavBar from "../components/NavBar";
import { useQuery } from "urql";

const POSTS_QUERY = {
  query: `
query Posts {
    posts{
      id
      createdAt
      updatedAt
      title
    }
  }
`,
};

const Index = () => {
  const [{ data }] = useQuery(POSTS_QUERY);
  return (
    <>
      <NavBar />
      <div>hello world</div>
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </>
  );
};

export default Index;
