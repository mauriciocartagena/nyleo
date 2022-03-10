import React, { useState } from "react";
import { Button } from "../../ui/Button";
import { createUrlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { MdEdit } from "react-icons/md";
import TurnsEditModal from "./TurnsEditModal";

interface ButtonEditProps {
  id_turno: number;
  nombre: string;
  hora_inicio: string;
  hora_final: string;
}

const ButtonEdit: React.FC<ButtonEditProps> = ({
  id_turno,
  nombre,
  hora_inicio,
  hora_final,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="small"
        color="primary-blue"
        onClick={async () => {
          setOpen(true);
        }}
        icon={
          <MdEdit
            size={17}
            style={{
              marginRight: "-0.2rem",
            }}
          />
        }
        name="Editar Categoria"
      >
        Editar
      </Button>
      {open ? (
        <TurnsEditModal
          turnsData={{
            id_turno,
            nombre,
            hora_inicio,
            hora_final,
          }}
          pageProps
          onRequestClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
};

export default withUrqlClient(createUrlClient)(ButtonEdit);
