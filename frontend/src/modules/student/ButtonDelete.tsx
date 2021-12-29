import React from "react";
import { Button } from "../../ui/Button";

interface ButtonDeleteProps {
  id_persona: number;
}

export const ButtonDelete: React.FC<ButtonDeleteProps> = ({ id_persona }) => {
  return (
    <Button
      size="small"
      onClick={() => {
        console.log(id_persona);
      }}
    >
      Eliminar
    </Button>
  );
};
