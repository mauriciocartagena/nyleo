import React, { useMemo } from "react";
import { withUrqlClient } from "next-urql";
import { createUrlClient } from "../../utils/createUrqlClient";
import { DataTable } from "./DataTable";
import { useCategoriasQuery } from "../../generated/graphql";
import { COLUMNS } from "./Columns";

interface SubjectPageProps {}

const SubjectPage: React.FC<SubjectPageProps> = () => {
  const [{ data: categorias, fetching }] = useCategoriasQuery();

  const resp = useMemo(() => categorias?.categorias, [categorias]);

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

export default withUrqlClient(createUrlClient)(SubjectPage);
