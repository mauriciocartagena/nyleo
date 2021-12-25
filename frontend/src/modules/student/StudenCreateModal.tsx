import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Formik } from "formik";
import React from "react";
import { Modal } from "../../ui/Modal";
import { Input } from "../../ui/Input";
import { InputField } from "../../form-fields/InputField";
import { Button } from "@chakra-ui/react";

interface StudentCreateModalProps {
  onRequestClose: () => void;
  open: boolean;
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

export const StudentCreateModal: React.FC<StudentCreateModalProps> = ({ open, onRequestClose }) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal isOpen={open} onRequestClose={onRequestClose}>
        <Formik<StudentFormData>
          initialValues={{
            nombre: "",
            primer_apellido: "",
            segundo_apellido: "",
            dni: "",
            email: "",
            numero: null,
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values }) => (
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
                <Button type="submit" variantColor="primary" className={`mr-3`}>
                  Registrar
                </Button>
                <Button onClick={onRequestClose}>Cancelar</Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </ThemeProvider>
  );
};
