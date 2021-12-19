import React from "react";
import { LayoutPage } from "../layout/LayoutPage";
import { TableComponent } from "../../shared-components/TableComponent";

interface StudentPageProps {}

export const StudentPage: React.FC<StudentPageProps> = () => {
  return (
    <LayoutPage>
      <div>Estudent Page</div>
      <TableComponent />
    </LayoutPage>
  );
};
