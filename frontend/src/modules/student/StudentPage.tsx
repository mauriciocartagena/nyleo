import React, { useMemo } from "react";
import { Table } from "./Table";

import { useEstudiantesQuery } from "../../generated/graphql";
import { COLUMNS } from "./columns";

interface StudentPageProps {}

export const StudentPage: React.FC<StudentPageProps> = ({}) => {
  const [{ data, fetching }] = useEstudiantesQuery();

  const resp = useMemo(() => data?.estudiantes, [data]);

  if (fetching) {
    return <div>Loadings...</div>;
  }

  return (
    <div>
      <Table columns={COLUMNS} data={resp}></Table>
    </div>
  );
};
