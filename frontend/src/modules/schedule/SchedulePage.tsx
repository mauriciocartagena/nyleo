import React, { useMemo } from "react";
import { DataTable } from "./DataTable";
import { useGruposQuery } from "../../generated/graphql";
import { COLUMNS } from "./columns";
import { withUrqlClient } from "next-urql";
import { createUrlClient } from "../../utils/createUrqlClient";

interface SchedulePageProps {}

const SchedulePage: React.FC<SchedulePageProps> = () => {
  const [{ data: grupos, fetching }] = useGruposQuery();

  const resp = useMemo(() => grupos?.grupos, [grupos]);

  const columns = useMemo(() => COLUMNS, [COLUMNS]);

  if (fetching) {
    return <div>Loadings...</div>;
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
export default withUrqlClient(createUrlClient)(SchedulePage);
