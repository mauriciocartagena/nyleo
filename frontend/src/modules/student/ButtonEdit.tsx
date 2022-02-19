import React, { useState } from "react";
import { Button } from "../../ui/Button";
import { createUrlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import StudentEditModal from "./StudentEditModal";
import { MdEdit } from "react-icons/md";
import { useColorModeValue } from "@chakra-ui/react";

interface ButtonEditProps {
  id_persona: number;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  dni: string;
  email: string;
  numero: string;
}

const ButtonEdit: React.FC<ButtonEditProps> = ({
  id_persona,
  nombre,
  primer_apellido,
  segundo_apellido,
  dni,
  email,
  numero,
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
        name="Editar Estudiante"
      >
        Editar
      </Button>
      {open ? (
        <StudentEditModal
          studentData={{
            id_persona,
            nombre,
            primer_apellido,
            segundo_apellido,
            dni,
            email,
            numero,
          }}
          pageProps
          onRequestClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
};

export default withUrqlClient(createUrlClient)(ButtonEdit);
