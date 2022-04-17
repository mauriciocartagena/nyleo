import React from "react";
import { Button } from "../../ui/Button";
import { useEliminarGrupoMutation } from "../../generated/graphql";
import { createUrlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ButtonDeleteProps {
  id_grupo: number;
}

const ButtonDelete: React.FC<ButtonDeleteProps> = ({ id_grupo }) => {
  const [, eliminarGrupo] = useEliminarGrupoMutation();

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
          await eliminarGrupo({ id_grupo });
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
