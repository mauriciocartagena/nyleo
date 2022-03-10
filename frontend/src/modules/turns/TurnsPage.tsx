import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrlClient } from "../../utils/createUrqlClient";

interface TurnsPageProps {}
const TurnsPage: React.FC<TurnsPageProps> = () => {
  return <div>TurnsPage</div>;
};

export default withUrqlClient(createUrlClient)(TurnsPage);
