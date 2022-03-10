import { useColorModeValue } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { InputField } from "../../form-fields/InputField";
import { useActualizarTurnoMutation } from "../../generated/graphql";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { createUrlClient } from "../../utils/createUrqlClient";
import { toErrorMapTurn } from "../../utils/toErrorMapTurn";

interface TurnsRequiredProps {
  id_turno: number;
  nombre: string;
  hora_inicio: string;
  hora_final: string;
}

interface TurnsEditModalProps {
  onRequestClose: () => void;
  turnsData: TurnsRequiredProps;
}
interface TurnsFormData {
  nombre: string;
  hora_inicio: string;
  hora_final: string;
}

const TurnsEditModal: React.FC<TurnsEditModalProps> = ({
  turnsData,
  onRequestClose,
}) => {
  const [, actualizarTurno] = useActualizarTurnoMutation();

  return (
    <Modal
      isOpen
      onRequestClose={onRequestClose}
      variant={useColorModeValue("default", "userPreview")}
    >
      <Formik<TurnsFormData>
        initialValues={{
          nombre: turnsData.nombre,
          hora_inicio: turnsData.hora_inicio,
          hora_final: turnsData.hora_final,
        }}
        validateOnBlur={false}
        onSubmit={async (values, { setErrors }) => {
          const response = await actualizarTurno({
            input: {
              id_turno: turnsData.id_turno,
              nombre: turnsData.nombre,
              hora_inicio: turnsData.hora_inicio,
              hora_final: turnsData.hora_final,
              ...values,
            },
          });

          if (response.data?.actualizarTurno.errors) {
            setErrors(toErrorMapTurn(response.data.actualizarTurno.errors));
          } else if (response.data.actualizarTurno.turno) {
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
            <InputField
              name="hora_inicio"
              label="Hora Inicio"
              placeholder="Ingrese hora inicio"
              autoFocus
              type={"time"}
              maxLength={60}
              value={values.hora_inicio}
              style={{
                color: "#69707A",
                backgroundColor: useColorModeValue("#FCFCFC", "#000"),
                border: "1px solid #D4D6D9",
              }}
            />
            <InputField
              name="hora_final"
              label="Hora Final"
              placeholder="Ingrese hora final"
              autoFocus
              type={"time"}
              maxLength={60}
              value={values.hora_final}
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
export default withUrqlClient(createUrlClient)(TurnsEditModal);
