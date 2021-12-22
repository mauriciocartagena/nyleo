import React, { useMemo } from "react";
import { DataTable } from "./DataTable";

import { useEstudiantesQuery } from "../../generated/graphql";
import { COLUMNS } from "./columns";

interface StudentPageProps {}

export const StudentPage: React.FC<StudentPageProps> = ({}) => {
  const [{ data, fetching }] = useEstudiantesQuery();

  const resp = useMemo(() => data?.estudiantes, [data]);

  const columns = useMemo(() => COLUMNS, [COLUMNS]);

  if (fetching) {
    return <div>Loadings...</div>;
  }

  return (
    <div>
      <DataTable columns={columns} data={resp}></DataTable>
    </div>
  );
};
