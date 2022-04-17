import React, { useState } from "react";
import { Button } from "../../ui/Button";
import { createUrlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import ScheduleEditModal from "./ScheduleEditModal";
import { MdEdit } from "react-icons/md";

interface ButtonEditProps {
  id_grupo: number;
  id_turno: number;
  id_categoria: number;
  fecha_inicio: string;
  fecha_final: string;
  dia_inicio: string;
  dia_final: string;
}

const ButtonEdit: React.FC<ButtonEditProps> = ({
  id_grupo,
  id_turno,
  id_categoria,
  fecha_inicio,
  fecha_final,
  dia_inicio,
  dia_final,
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
        name="Editar Grupo"
      >
        Editar
      </Button>
      {open ? (
        <ScheduleEditModal
          scheduleData={{
            id_grupo,
            id_turno,
            id_categoria,
            fecha_inicio,
            fecha_final,
            dia_inicio,
            dia_final,
          }}
          pageProps
          onRequestClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
};

export default withUrqlClient(createUrlClient)(ButtonEdit);
