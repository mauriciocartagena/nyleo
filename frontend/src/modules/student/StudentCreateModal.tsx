import { Form, Formik } from "formik";
import React from "react";
import { Modal } from "../../ui/Modal";
import { InputField } from "../../form-fields/InputField";
import { Button } from "../../ui/Button";
import { useCrearEstudianteMutation } from "../../generated/graphql";
import { toErrorMapEstudiante } from "../../utils/toErrorMapEstudiante";
import { ButtonLink } from "../../ui/ButtonLink";
import { withUrqlClient } from "next-urql";
import { createUrlClient } from "../../utils/createUrqlClient";

interface StudentCreateModalProps {
  onRequestClose: () => void;
}
interface StudentFormData {
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  dni: string;
  email: string;
  numero: string;
}

const StudentCreateModal: React.FC<StudentCreateModalProps> = ({
  onRequestClose,
}) => {
  const [, crearEstudiante] = useCrearEstudianteMutation();
  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Formik<StudentFormData>
        initialValues={{
          nombre: "",
          primer_apellido: "",
          segundo_apellido: "",
          dni: "",
          email: "",
          numero: "",
        }}
        validateOnBlur={false}
        onSubmit={async (values, { setErrors }) => {
          const response = await crearEstudiante({
            input: values,
          });

          if (response.data?.crearEstudiante.errors) {
            setErrors(
              toErrorMapEstudiante(response.data.crearEstudiante.errors)
            );
          } else if (response.data.crearEstudiante.persona) {
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
            />

            <div className={`flex mt-3`}>
              <InputField
                name="primer_apellido"
                label="Primer Apellido"
                placeholder="Ingrese Primer apellido"
                maxLength={60}
                value={values.primer_apellido}
              />
            </div>
            <div className={`flex mt-3`}>
              <InputField
                name="segundo_apellido"
                label="Segundo Apellido"
                placeholder="Ingrese Segundo apellido"
                maxLength={60}
                value={values.segundo_apellido}
              />
            </div>
            <div className={`flex mt-3`}>
              <InputField
                name="email"
                label="Email"
                placeholder="Ingrese Email"
                maxLength={60}
                value={values.email}
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
                />
              </div>
              <div className={`flex mt-3`}>
                <InputField
                  name="numero"
                  label="Numero"
                  placeholder="Ingrese Numero"
                  maxLength={60}
                  value={values.numero}
                />
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
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
export default withUrqlClient(createUrlClient)(StudentCreateModal);