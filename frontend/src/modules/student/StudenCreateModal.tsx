import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Formik } from "formik";
import React from "react";
import { Modal } from "../../ui/Modal";
import { InputField } from "../../form-fields/InputField";
import { Button } from "../../ui/Button";
import { useCrearEstudianteMutation } from "../../generated/graphql";
import { toErrorMapEstudiante } from "../../utils/toErrorMapEstudiante";
import { ButtonLink } from "../../ui/ButtonLink";

interface StudentCreateModalProps {
  onRequestClose: () => void;
}
interface StudentFormData {
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  dni: string;
  email: string;
  numero: number;
}

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#ff9800",
    },
  },
});

export const StudentCreateModal: React.FC<StudentCreateModalProps> = ({ onRequestClose }) => {
  const [, register] = useCrearEstudianteMutation();
  return (
    <ThemeProvider theme={theme}>
      <Modal isOpen onRequestClose={onRequestClose}>
        <Formik<StudentFormData>
          initialValues={{
            nombre: "",
            primer_apellido: "",
            segundo_apellido: "",
            dni: "",
            email: "",
            numero: null,
          }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              input: values,
            });

            if (response.data?.crearEstudiante.errors) {
              setErrors(toErrorMapEstudiante(response.data.crearEstudiante.errors));
            } else if (response.data.crearEstudiante.persona) {
              onRequestClose();
            }
          }}
        >
          {({ isSubmitting }) => (
            <form>
              <InputField name="nombre" label="Nombre" placeholder="Ingrese nombre" autoFocus maxLength={60} />

              <div className={`flex mt-3`}>
                <InputField name="primer_apellido" label="Primer Apellido" placeholder="Ingrese Primer apellido" maxLength={60} />
              </div>
              <div className={`flex mt-3`}>
                <InputField name="segundo_apellido" label="Segundo Apellido" placeholder="Ingrese Segundo apellido" maxLength={60} />
              </div>
              <div className={`grid grid-cols-2 gap-4 focus:outline-none w-full`}>
                <div className={`flex mt-3`}>
                  <InputField name="dni" label="DNI" placeholder="Ingrese DNI" maxLength={30} />
                </div>
                <div className={`flex mt-3`}>
                  <InputField name="email" label="Email" placeholder="Ingrese Email" maxLength={60} />
                </div>
              </div>
              <div className={`flex pt-4 space-x-3 col-span-full items-center`}>
                <Button loading={isSubmitting} type="submit" className={`mr-3`}>
                  Registrar
                </Button>
                <ButtonLink type="button" onClick={onRequestClose}>
                  Cancelar
                </ButtonLink>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </ThemeProvider>
  );
};
