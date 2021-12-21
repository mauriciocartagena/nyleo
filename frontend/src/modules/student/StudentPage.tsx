import React from "react";
import { useQuery } from "urql";

interface StudentPageProps {}

const STUDENT_QUERY = `
  query {
    estudiantes {
      id_persona
    }
  }
`;

export const StudentPage: React.FC<StudentPageProps> = ({}) => {
  const [{ data, fetching }] = useQuery({ query: STUDENT_QUERY });

  console.log(data, fetching);

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="">Nombre</th>
          <th className="">Primer Apellido</th>
          <th className="">Segundo Apellido</th>
          <th className="">DNI</th>
          <th className="">Celular</th>
          <th className="">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Intro to CSS</td>
          <td>Adam</td>
          <td>858</td>
        </tr>
        <tr className="">
          <td>A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
          <td>Adam</td>
          <td>112</td>
        </tr>
        <tr>
          <td>Intro to JavaScript</td>
          <td>Chris</td>
          <td>1,280</td>
        </tr>
      </tbody>
    </table>
  );
};
