import { Form, Formik } from "formik";
import React from "react";
import { Modal } from "../../ui/Modal";
import { InputField } from "../../form-fields/InputField";
import { Button } from "../../ui/Button";
import { useActualizarEstudianteMutation } from "../../generated/graphql";
import { toErrorMapEstudiante } from "../../utils/toErrorMapEstudiante";
import { ButtonLink } from "../../ui/ButtonLink";
import { withUrqlClient } from "next-urql";
import { createUrlClient } from "../../utils/createUrqlClient";
import { useColorModeValue } from "@chakra-ui/react";

interface StudentRequiredProps {
  id_persona: number;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  dni: string;
  email: string;
  numero: string;
}

interface StudentEditModalProps {
  onRequestClose: () => void;
  studentData: StudentRequiredProps;
}
interface StudentFormData {
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  dni: string;
  email: string;
  numero: string;
}

const StudentEditModal: React.FC<StudentEditModalProps> = ({
  studentData,
  onRequestClose,
}) => {
  const [, actualizarEstudiante] = useActualizarEstudianteMutation();

  return (
    <Modal
      isOpen
      onRequestClose={onRequestClose}
      variant={useColorModeValue("default", "userPreview")}
    >
      <Formik<StudentFormData>
        initialValues={{
          nombre: studentData.nombre,
          primer_apellido: studentData.primer_apellido,
          segundo_apellido: studentData.segundo_apellido,
          dni: studentData.dni,
          email: studentData.email,
          numero: studentData.numero,
        }}
        validateOnBlur={false}
        onSubmit={async (values, { setErrors }) => {
          const response = await actualizarEstudiante({
            input: {
              id_persona: studentData.id_persona,
              ...values,
            },
          });

          if (response.data?.actualizarEstudiante.errors) {
            setErrors(
              toErrorMapEstudiante(response.data.actualizarEstudiante.errors)
            );
          } else if (response.data.actualizarEstudiante.persona) {
            onRequestClose();
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <InputField
              name="nombre"
              label="Nombre"
              placeholder="Ingrese nombre"
              autoFocus
              maxLength={60}
              value={values.nombre}
              style={{
                color: "#69707A",
                backgroundColor: useColorModeValue("#FCFCFC", "#000"),
                border: "1px solid #D4D6D9",
              }}
            />

            <div className={`flex mt-3`}>
              <InputField
                name="primer_apellido"
                label="Primer Apellido"
                placeholder="Ingrese Primer apellido"
                maxLength={60}
                value={values.primer_apellido}
                style={{
                  color: "#69707A",
                  backgroundColor: useColorModeValue("#FCFCFC", "#000"),
                  border: "1px solid #D4D6D9",
                }}
              />
            </div>
            <div className={`flex mt-3`}>
              <InputField
                name="segundo_apellido"
                label="Segundo Apellido"
                placeholder="Ingrese Segundo apellido"
                maxLength={60}
                value={values.segundo_apellido}
                style={{
                  color: "#69707A",
                  backgroundColor: useColorModeValue("#FCFCFC", "#000"),
                  border: "1px solid #D4D6D9",
                }}
              />
            </div>
            <div className={`flex mt-3`}>
              <InputField
                name="email"
                label="Email"
                placeholder="Ingrese Email"
                maxLength={60}
                value={values.email}
                style={{
                  color: "#69707A",
                  backgroundColor: useColorModeValue("#FCFCFC", "#000"),
                  border: "1px solid #D4D6D9",
                }}
              />
            </div>
            <div className={`grid grid-cols-2 gap-4 focus:outline-none w-full`}>
              <div className={`flex mt-3`}>
                <InputField
                  name="dni"
                  label="DNI"
                  placeholder="Ingrese DNI"
                  maxLength={30}
                  value={values.dni}
                  style={{
                    color: "#69707A",
                    backgroundColor: useColorModeValue("#FCFCFC", "#000"),
                    border: "1px solid #D4D6D9",
                  }}
                />
              </div>
              <div className={`flex mt-3`}>
                <InputField
                  name="numero"
                  label="Numero"
                  placeholder="Ingrese Numero"
                  maxLength={60}
                  value={values.numero}
                  style={{
                    color: "#69707A",
                    backgroundColor: useColorModeValue("#FCFCFC", "#000"),
                    border: "1px solid #D4D6D9",
                  }}
                />
              </div>
            </div>
            <div className={`flex pt-4 space-x-3 col-span-full items-center`}>
              <Button
                loading={isSubmitting}
                type="submit"
                className={`mr-3`}
                color="create"
              >
                Editar
              </Button>
              <ButtonLink type="button" onClick={onRequestClose}>
                Cancelar
              </ButtonLink>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
export default withUrqlClient(createUrlClient)(StudentEditModal);
