import React, {useMemo} from "react";
import {DataTable} from "./DataTable";

import {useEstudiantesQuery} from "../../generated/graphql";
import {COLUMNS} from "./columns";
import {withUrqlClient} from "next-urql";
import {createUrlClient} from "../../utils/createUrqlClient";

interface StudentPageProps {
}

const StudentPage: React.FC<StudentPageProps> = () => {
    const [{data: estudiantes, fetching}] = useEstudiantesQuery();

    const resp = useMemo(() => estudiantes?.estudiantes, [estudiantes]);

    const columns = useMemo(() => COLUMNS, [COLUMNS]);

    if (fetching) {
        return <div>Loadings...</div>;
    }

    return (
        <div style={{marginTop: "2rem", backgroundColor: "#ffffff", borderRadius: "24px", padding: "30px 16px"}}>
            <DataTable
                columns={columns} data={resp}/>
        </div>
    );


};
export default withUrqlClient(createUrlClient)(StudentPage);
