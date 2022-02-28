import React, { useState } from "react";
import { Button } from "../../ui/Button";
import { createUrlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { MdEdit } from "react-icons/md";
import SubjectEditModal from "./SubjectEditModal";

interface ButtonEditProps {
  id_categoria: number;
  nombre: string;
}

const ButtonEdit: React.FC<ButtonEditProps> = ({ id_categoria, nombre }) => {
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
        <SubjectEditModal
          subjectData={{
            id_categoria,
            nombre,
          }}
          pageProps
          onRequestClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
};

export default withUrqlClient(createUrlClient)(ButtonEdit);
