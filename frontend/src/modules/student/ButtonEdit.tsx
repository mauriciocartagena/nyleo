import React from "react";
import { Button } from "../../ui/Button";
import { createUrlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

interface ButtonEditProps {
  id_persona: number;
}

const ButtonEdit: React.FC<ButtonEditProps> = ({ id_persona }) => {
  return (
    <Button
      size="small"
      style={{ backgroundColor: "RGB(38, 95, 158)", color: "white" }}
      onClick={async () => {
        console.log(id_persona);
      }}
    >
      Editar
    </Button>
  );
};

export default withUrqlClient(createUrlClient)(ButtonEdit);
