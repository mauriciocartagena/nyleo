import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { InputField } from "../../form-fields/InputField";
import { useCrearCategoriaMutation } from "../../generated/graphql";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { createUrlClient } from "../../utils/createUrqlClient";
import { toErrorMapCategoria } from "../../utils/toErrorMapCategoria";
import { useColorModeValue } from "@chakra-ui/react";

interface SubjectCreateModalProps {
  onRequestClose: () => void;
}

interface SubjectFormData {
  nombre: string;
}

const SubjectCreateModal: React.FC<SubjectCreateModalProps> = ({
  onRequestClose,
}) => {
  const [, crearCateogria] = useCrearCategoriaMutation();
  return (
    <Modal
      isOpen
      onRequestClose={onRequestClose}
      variant={useColorModeValue("default", "userPreview")}
    >
      <Formik<SubjectFormData>
        initialValues={{
          nombre: "",
        }}
        validateOnBlur={false}
        onSubmit={async (values, { setErrors }) => {
          const response = await crearCateogria({
            input: values,
          });

          if (response.data?.crearCategoria.errors) {
            setErrors(toErrorMapCategoria(response.data.crearCategoria.errors));
          } else if (response.data.crearCategoria.categoria) {
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
            <div className={`flex pt-4 space-x-3 col-span-full items-center`}>
              <Button
                loading={isSubmitting}
                type="submit"
                className={`mr-3`}
                color="create"
              >
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
export default withUrqlClient(createUrlClient)(SubjectCreateModal);
