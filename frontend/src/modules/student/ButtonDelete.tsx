import React from "react";
import { Button } from "../../ui/Button";
import { useEliminarEstudianteMutation } from "../../generated/graphql";
import { createUrlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ButtonDeleteProps {
  id_persona: number;
}

const ButtonDelete: React.FC<ButtonDeleteProps> = ({ id_persona }) => {
  const [, eliminarEstudiante] = useEliminarEstudianteMutation();

  return (
    <Button
      size="small"
      color="primary"
      icon={
        <RiDeleteBin6Line
          size={17}
          style={{
            marginRight: "-0.2rem",
          }}
        />
      }
      onClick={async () => {
        try {
          await eliminarEstudiante({ id_persona });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      Eliminar
    </Button>
  );
};

export default withUrqlClient(createUrlClient)(ButtonDelete);
