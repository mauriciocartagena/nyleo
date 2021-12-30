import React from "react";
import { Button } from "../../ui/Button";
import { useEliminarEstudianteMutation } from "../../generated/graphql";
import { createUrlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

interface ButtonDeleteProps {
  id_persona: number;
}

const ButtonDelete: React.FC<ButtonDeleteProps> = ({ id_persona }) => {
  const [, eliminarEstudiante] = useEliminarEstudianteMutation();

  return (
    <Button
      size="small"
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
