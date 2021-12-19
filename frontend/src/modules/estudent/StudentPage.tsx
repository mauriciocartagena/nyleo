import React from "react";
import { LayoutPage } from "../layout/LayoutPage";

interface StudentPageProps {}

export const StudentPage: React.FC<StudentPageProps> = () => {
  return (
    <LayoutPage>
      <div>Estudent Page</div>
    </LayoutPage>
  );
};
