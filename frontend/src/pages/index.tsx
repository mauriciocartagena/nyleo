import { withUrqlClient } from "next-urql";
import { createUrlClient } from "../utils/createUrqlClient";

const Index = () => {
  return <div>Hello World</div>;
};

export default withUrqlClient(createUrlClient)(Index);
