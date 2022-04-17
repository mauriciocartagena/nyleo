import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../../form-fields/InputField";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { withUrqlClient } from "next-urql";
import { createUrlClient } from "../../utils/createUrqlClient";
import { useColorModeValue } from "@chakra-ui/react";
import { useActualizarGrupoMutation } from "../../generated/graphql";
import { toErrorMapGrupo } from "../../utils/toErrorMapGrupo";
import { Modal } from "../../ui/Modal";

interface ScheduleRequiredProps {
  id_grupo: number;
  id_turno: number;
  id_categoria: number;
  fecha_inicio: string;
  fecha_final: string;
  dia_inicio: string;
  dia_final: string;
}

interface ScheduleEditModalProps {
  onRequestClose: () => void;
  scheduleData: ScheduleRequiredProps;
}
interface ScheduleFormData {
  id_turno: number;
  id_categoria: number;
  fecha_inicio: string;
  fecha_final: string;
  dia_inicio: string;
  dia_final: string;
}

const ScheduleEditModal: React.FC<ScheduleEditModalProps> = ({
  scheduleData,
  onRequestClose,
}) => {
  const [, actualizarGrupo] = useActualizarGrupoMutation();
  return (
    <Modal
      isOpen
      onRequestClose={onRequestClose}
      variant={useColorModeValue("default", "userPreview")}
    >
      <Formik<ScheduleFormData>
        initialValues={{
          id_turno: scheduleData.id_turno,
          id_categoria: scheduleData.id_categoria,
          fecha_inicio: scheduleData.fecha_inicio,
          fecha_final: scheduleData.fecha_final,
          dia_inicio: scheduleData.dia_inicio,
          dia_final: scheduleData.dia_final,
        }}
        validateOnBlur={false}
        onSubmit={async (values, { setErrors }) => {
          const response = await actualizarGrupo({
            input: {
              id_grupo: scheduleData.id_grupo,
              ...values,
            },
          });

          if (response.data?.actualizarGrupo.errors) {
            setErrors(toErrorMapGrupo(response.data.actualizarGrupo.errors));
          } else if (response.data.actualizarGrupo.grupo) {
            onRequestClose();
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <InputField
              name="dia_inicio"
              label="Dia Inicio"
              placeholder="Ingrese Dia Inicio"
              autoFocus
              maxLength={60}
              value={values.dia_inicio}
              style={{
                color: "#69707A",
                backgroundColor: useColorModeValue("#FCFCFC", "#000"),
                border: "1px solid #D4D6D9",
              }}
            />

            <div className={`flex mt-3`}>
              <InputField
                name="dia_final"
                label="Dia Final"
                placeholder="Ingrese Dia Final"
                style={{
                  color: "#69707A",
                  backgroundColor: useColorModeValue("#FCFCFC", "#000"),
                  border: "1px solid #D4D6D9",
                }}
                maxLength={60}
                value={values.dia_final}
              />
            </div>
            <div className={`flex mt-3`}>
              <InputField
                name="fecha_inicio"
                label="Fecha Inicio"
                placeholder="Ingrese Fecha Inicio"
                maxLength={60}
                value={values.fecha_inicio}
                style={{
                  color: "#69707A",
                  backgroundColor: useColorModeValue("#FCFCFC", "#000"),
                  border: "1px solid #D4D6D9",
                }}
              />
            </div>
            <div className={`flex mt-3`}>
              <InputField
                name="fecha_final"
                label="Fecha Final"
                placeholder="Ingrese Fecha Final"
                maxLength={60}
                value={values.fecha_final}
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
                  name="id_categoria"
                  label="Categoria"
                  placeholder="Ingrese Categoria"
                  type="number"
                  maxLength={30}
                  value={values.id_categoria}
                  style={{
                    color: "#69707A",
                    backgroundColor: useColorModeValue("#FCFCFC", "#000"),
                    border: "1px solid #D4D6D9",
                  }}
                />
              </div>
              <div className={`flex mt-3`}>
                <InputField
                  name="id_turno"
                  label="Turno"
                  placeholder="Ingrese Turno"
                  maxLength={60}
                  type="number"
                  value={values.id_turno}
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
export default withUrqlClient(createUrlClient)(ScheduleEditModal);
