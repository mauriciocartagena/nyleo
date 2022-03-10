import { withUrqlClient } from "next-urql";
import React, { useMemo } from "react";
import { createUrlClient } from "../../utils/createUrqlClient";
import { useTurnosQuery } from "../../generated/graphql";
import { COLUMNS } from "./Columns";
import { DataTable } from "./DataTable";

interface TurnsPageProps {}
const TurnsPage: React.FC<TurnsPageProps> = () => {
  const [{ data, fetching }] = useTurnosQuery();

  const resp = useMemo(() => data?.turnos, [data]);

  const columns = useMemo(() => COLUMNS, [COLUMNS]);

  if (fetching) {
    return <div>Cargando ...</div>;
  }

  return (
    <div
      style={{
        marginTop: "2rem",
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        padding: "30px 16px",
      }}
    >
      <DataTable columns={columns} data={resp} />
    </div>
  );
};

export default withUrqlClient(createUrlClient)(TurnsPage);
