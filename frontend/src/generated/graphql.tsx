import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Categoria = {
  __typename?: 'Categoria';
  id_categoria: Scalars['Int'];
  nombre: Scalars['String'];
};

export type CategoriaInput = {
  nombre: Scalars['String'];
};

export type CategoriaInputEditar = {
  id_categoria: Scalars['Float'];
  nombre: Scalars['String'];
};

export type CategoriaResponse = {
  __typename?: 'CategoriaResponse';
  categoria?: Maybe<Categoria>;
  errors?: Maybe<Array<FieldErrorCategoria>>;
};

export type Curso = {
  __typename?: 'Curso';
  id_curso: Scalars['Int'];
  id_grupo: Grupo;
  id_persona: Persona;
};

export type EstudianteInput = {
  dni: Scalars['String'];
  email: Scalars['String'];
  nombre: Scalars['String'];
  numero: Scalars['String'];
  primer_apellido: Scalars['String'];
  segundo_apellido: Scalars['String'];
};

export type EstudianteInputEditar = {
  dni: Scalars['String'];
  email: Scalars['String'];
  id_persona: Scalars['Float'];
  nombre: Scalars['String'];
  numero: Scalars['String'];
  primer_apellido: Scalars['String'];
  segundo_apellido: Scalars['String'];
};

export type EstudianteResponse = {
  __typename?: 'EstudianteResponse';
  errors?: Maybe<Array<FieldErrorEstudiante>>;
  persona?: Maybe<Persona>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrorCategoria = {
  __typename?: 'FieldErrorCategoria';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrorEstudiante = {
  __typename?: 'FieldErrorEstudiante';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrorGrupo = {
  __typename?: 'FieldErrorGrupo';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrorTurno = {
  __typename?: 'FieldErrorTurno';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Grupo = {
  __typename?: 'Grupo';
  dia_final: Scalars['String'];
  dia_inicio: Scalars['String'];
  fecha_final: Scalars['DateTime'];
  fecha_inicio: Scalars['DateTime'];
  id_categoria: Categoria;
  id_grupo: Scalars['Int'];
  id_turno: Turno;
};

export type GrupoInput = {
  dia_final: Scalars['String'];
  dia_inicio: Scalars['String'];
  fecha_final: Scalars['DateTime'];
  fecha_inicio: Scalars['DateTime'];
  id_categoria: Scalars['Float'];
  id_turno: Scalars['Float'];
};

export type GrupoInputEditar = {
  dia_final: Scalars['String'];
  dia_inicio: Scalars['String'];
  fecha_final: Scalars['DateTime'];
  fecha_inicio: Scalars['DateTime'];
  id_categoria: Scalars['Float'];
  id_grupo: Scalars['Float'];
  id_turno: Scalars['Float'];
};

export type GrupoResponse = {
  __typename?: 'GrupoResponse';
  errors?: Maybe<Array<FieldErrorGrupo>>;
  grupo?: Maybe<Grupo>;
};

export type LoginUsuarioPasswordInput = {
  password: Scalars['String'];
  usuario: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  actualizarCategoria: CategoriaResponse;
  actualizarCurso: Curso;
  actualizarEstudiante: EstudianteResponse;
  actualizarGrupo: GrupoResponse;
  actualizarTurno: TurnoResponse;
  crearCategoria: CategoriaResponse;
  crearCurso: Curso;
  crearEstudiante: EstudianteResponse;
  crearGrupo: GrupoResponse;
  crearTurno: TurnoResponse;
  eliminarCategoria: Scalars['Boolean'];
  eliminarCurso: Scalars['Boolean'];
  eliminarEstudiante: Scalars['Boolean'];
  eliminarGrupo: Scalars['Boolean'];
  eliminarTurno: Scalars['Boolean'];
  login: UserResponse;
  registrarUsuario: UserResponse;
};


export type MutationActualizarCategoriaArgs = {
  input: CategoriaInputEditar;
};


export type MutationActualizarCursoArgs = {
  id_curso: Scalars['Int'];
  id_grupo: Scalars['Int'];
  id_persona: Scalars['Int'];
};


export type MutationActualizarEstudianteArgs = {
  input: EstudianteInputEditar;
};


export type MutationActualizarGrupoArgs = {
  input: GrupoInputEditar;
};


export type MutationActualizarTurnoArgs = {
  input: TurnoInputEditar;
};


export type MutationCrearCategoriaArgs = {
  input: CategoriaInput;
};


export type MutationCrearCursoArgs = {
  id_grupo: Scalars['Int'];
  id_persona: Scalars['Int'];
};


export type MutationCrearEstudianteArgs = {
  input: EstudianteInput;
};


export type MutationCrearGrupoArgs = {
  input: GrupoInput;
};


export type MutationCrearTurnoArgs = {
  input: TurnoInput;
};


export type MutationEliminarCategoriaArgs = {
  id_categoria: Scalars['Float'];
};


export type MutationEliminarCursoArgs = {
  id_curso: Scalars['Int'];
};


export type MutationEliminarEstudianteArgs = {
  id_persona: Scalars['Int'];
};


export type MutationEliminarGrupoArgs = {
  id_grupo: Scalars['Int'];
};


export type MutationEliminarTurnoArgs = {
  id_turno: Scalars['Float'];
};


export type MutationLoginArgs = {
  options: LoginUsuarioPasswordInput;
};


export type MutationRegistrarUsuarioArgs = {
  options: UsuarioPasswordInput;
};

export type Persona = {
  __typename?: 'Persona';
  dni: Scalars['String'];
  email: Scalars['String'];
  id_persona: Scalars['Int'];
  nombre: Scalars['String'];
  numero: Scalars['String'];
  primer_apellido: Scalars['String'];
  segundo_apellido: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  categoria?: Maybe<Categoria>;
  categorias: Array<Categoria>;
  curso?: Maybe<Curso>;
  cursos: Array<Curso>;
  estudiante: Array<Persona>;
  estudiantes: Array<Persona>;
  grupo?: Maybe<Grupo>;
  grupos: Array<Grupo>;
  hello: Scalars['String'];
  me?: Maybe<Usuario>;
  turno?: Maybe<Turno>;
  turnos: Array<Turno>;
};


export type QueryCategoriaArgs = {
  id_categoria: Scalars['Int'];
};


export type QueryCursoArgs = {
  id_curso: Scalars['Int'];
};


export type QueryEstudianteArgs = {
  id_persona: Scalars['Int'];
};


export type QueryGrupoArgs = {
  id_grupo: Scalars['Int'];
};


export type QueryTurnoArgs = {
  id_turno: Scalars['Int'];
};

export type Turno = {
  __typename?: 'Turno';
  hora_final: Scalars['String'];
  hora_inicio: Scalars['String'];
  id_turno: Scalars['Int'];
  nombre: Scalars['String'];
};

export type TurnoInput = {
  hora_final: Scalars['String'];
  hora_inicio: Scalars['String'];
  nombre: Scalars['String'];
};

export type TurnoInputEditar = {
  hora_final: Scalars['String'];
  hora_inicio: Scalars['String'];
  id_turno: Scalars['Float'];
  nombre: Scalars['String'];
};

export type TurnoResponse = {
  __typename?: 'TurnoResponse';
  errors?: Maybe<Array<FieldErrorTurno>>;
  turno?: Maybe<Turno>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  usuario?: Maybe<Usuario>;
};

export type Usuario = {
  __typename?: 'Usuario';
  id_persona: Persona;
  password: Scalars['String'];
  usuario: Scalars['String'];
};

export type UsuarioPasswordInput = {
  id_persona: Scalars['Float'];
  password: Scalars['String'];
  usuario: Scalars['String'];
};

export type RegularCategoriaFragment = { __typename?: 'Categoria', id_categoria: number, nombre: string };

export type RegularEstudianteFragment = { __typename?: 'Persona', id_persona: number, nombre: string, primer_apellido: string, segundo_apellido: string, dni: string, numero: string, email: string };

export type RegularGrupoFragment = { __typename?: 'Grupo', id_grupo: number, fecha_inicio: any, fecha_final: any, dia_inicio: string, dia_final: string, id_turno: { __typename?: 'Turno', id_turno: number, nombre: string, hora_inicio: string, hora_final: string }, id_categoria: { __typename?: 'Categoria', id_categoria: number, nombre: string } };

export type RegularGrupoCreateFragment = { __typename?: 'Grupo', id_grupo: number, fecha_inicio: any, fecha_final: any, dia_inicio: string, dia_final: string };

export type RegularGrupoUpdateFragment = { __typename?: 'Grupo', id_grupo: number, fecha_inicio: any, fecha_final: any, dia_inicio: string, dia_final: string };

export type RegularTurnoFragment = { __typename?: 'Turno', id_turno: number, nombre: string, hora_inicio: string, hora_final: string };

export type ActualizarCategoriaMutationVariables = Exact<{
  input: CategoriaInputEditar;
}>;


export type ActualizarCategoriaMutation = { __typename?: 'Mutation', actualizarCategoria: { __typename?: 'CategoriaResponse', errors?: Array<{ __typename?: 'FieldErrorCategoria', field: string, message: string }> | null | undefined, categoria?: { __typename?: 'Categoria', id_categoria: number, nombre: string } | null | undefined } };

export type ActualizarEstudianteMutationVariables = Exact<{
  input: EstudianteInputEditar;
}>;


export type ActualizarEstudianteMutation = { __typename?: 'Mutation', actualizarEstudiante: { __typename?: 'EstudianteResponse', errors?: Array<{ __typename?: 'FieldErrorEstudiante', field: string, message: string }> | null | undefined, persona?: { __typename?: 'Persona', id_persona: number, nombre: string, primer_apellido: string, segundo_apellido: string, dni: string, numero: string, email: string } | null | undefined } };

export type ActualizarGrupoMutationVariables = Exact<{
  input: GrupoInputEditar;
}>;


export type ActualizarGrupoMutation = { __typename?: 'Mutation', actualizarGrupo: { __typename?: 'GrupoResponse', errors?: Array<{ __typename?: 'FieldErrorGrupo', field: string, message: string }> | null | undefined, grupo?: { __typename?: 'Grupo', id_grupo: number, fecha_inicio: any, fecha_final: any, dia_inicio: string, dia_final: string } | null | undefined } };

export type ActualizarTurnoMutationVariables = Exact<{
  input: TurnoInputEditar;
}>;


export type ActualizarTurnoMutation = { __typename?: 'Mutation', actualizarTurno: { __typename?: 'TurnoResponse', errors?: Array<{ __typename?: 'FieldErrorTurno', field: string, message: string }> | null | undefined, turno?: { __typename?: 'Turno', id_turno: number, nombre: string, hora_inicio: string, hora_final: string } | null | undefined } };

export type CrearCategoriaMutationVariables = Exact<{
  input: CategoriaInput;
}>;


export type CrearCategoriaMutation = { __typename?: 'Mutation', crearCategoria: { __typename?: 'CategoriaResponse', errors?: Array<{ __typename?: 'FieldErrorCategoria', field: string, message: string }> | null | undefined, categoria?: { __typename?: 'Categoria', id_categoria: number, nombre: string } | null | undefined } };

export type CrearEstudianteMutationVariables = Exact<{
  input: EstudianteInput;
}>;


export type CrearEstudianteMutation = { __typename?: 'Mutation', crearEstudiante: { __typename?: 'EstudianteResponse', errors?: Array<{ __typename?: 'FieldErrorEstudiante', field: string, message: string }> | null | undefined, persona?: { __typename?: 'Persona', id_persona: number, nombre: string, primer_apellido: string, segundo_apellido: string, dni: string, numero: string, email: string } | null | undefined } };

export type CrearGrupoMutationVariables = Exact<{
  input: GrupoInput;
}>;


export type CrearGrupoMutation = { __typename?: 'Mutation', crearGrupo: { __typename?: 'GrupoResponse', errors?: Array<{ __typename?: 'FieldErrorGrupo', field: string, message: string }> | null | undefined, grupo?: { __typename?: 'Grupo', id_grupo: number, fecha_inicio: any, fecha_final: any, dia_inicio: string, dia_final: string } | null | undefined } };

export type CrearTurnoMutationVariables = Exact<{
  input: TurnoInput;
}>;


export type CrearTurnoMutation = { __typename?: 'Mutation', crearTurno: { __typename?: 'TurnoResponse', errors?: Array<{ __typename?: 'FieldErrorTurno', field: string, message: string }> | null | undefined, turno?: { __typename?: 'Turno', id_turno: number, nombre: string, hora_inicio: string, hora_final: string } | null | undefined } };

export type EliminarEstudianteMutationVariables = Exact<{
  id_persona: Scalars['Int'];
}>;


export type EliminarEstudianteMutation = { __typename?: 'Mutation', eliminarEstudiante: boolean };

export type EliminarGrupoMutationVariables = Exact<{
  id_grupo: Scalars['Int'];
}>;


export type EliminarGrupoMutation = { __typename?: 'Mutation', eliminarGrupo: boolean };

export type CategoriasQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriasQuery = { __typename?: 'Query', categorias: Array<{ __typename?: 'Categoria', id_categoria: number, nombre: string }> };

export type EstudiantesQueryVariables = Exact<{ [key: string]: never; }>;


export type EstudiantesQuery = { __typename?: 'Query', estudiantes: Array<{ __typename?: 'Persona', id_persona: number, nombre: string, primer_apellido: string, segundo_apellido: string, dni: string, numero: string, email: string }> };

export type GruposQueryVariables = Exact<{ [key: string]: never; }>;


export type GruposQuery = { __typename?: 'Query', grupos: Array<{ __typename?: 'Grupo', id_grupo: number, fecha_inicio: any, fecha_final: any, dia_inicio: string, dia_final: string, id_turno: { __typename?: 'Turno', id_turno: number, nombre: string, hora_inicio: string, hora_final: string }, id_categoria: { __typename?: 'Categoria', id_categoria: number, nombre: string } }> };

export type TurnosQueryVariables = Exact<{ [key: string]: never; }>;


export type TurnosQuery = { __typename?: 'Query', turnos: Array<{ __typename?: 'Turno', id_turno: number, nombre: string, hora_inicio: string, hora_final: string }> };

export const RegularEstudianteFragmentDoc = gql`
    fragment RegularEstudiante on Persona {
  id_persona
  nombre
  primer_apellido
  segundo_apellido
  dni
  numero
  email
}
    `;
export const RegularTurnoFragmentDoc = gql`
    fragment RegularTurno on Turno {
  id_turno
  nombre
  hora_inicio
  hora_final
}
    `;
export const RegularCategoriaFragmentDoc = gql`
    fragment RegularCategoria on Categoria {
  id_categoria
  nombre
}
    `;
export const RegularGrupoFragmentDoc = gql`
    fragment RegularGrupo on Grupo {
  id_grupo
  fecha_inicio
  fecha_final
  dia_inicio
  dia_final
  id_turno {
    ...RegularTurno
  }
  id_categoria {
    ...RegularCategoria
  }
}
    ${RegularTurnoFragmentDoc}
${RegularCategoriaFragmentDoc}`;
export const RegularGrupoCreateFragmentDoc = gql`
    fragment RegularGrupoCreate on Grupo {
  id_grupo
  fecha_inicio
  fecha_final
  dia_inicio
  dia_final
}
    `;
export const RegularGrupoUpdateFragmentDoc = gql`
    fragment RegularGrupoUpdate on Grupo {
  id_grupo
  fecha_inicio
  fecha_final
  dia_inicio
  dia_final
}
    `;
export const ActualizarCategoriaDocument = gql`
    mutation ActualizarCategoria($input: CategoriaInputEditar!) {
  actualizarCategoria(input: $input) {
    errors {
      field
      message
    }
    categoria {
      ...RegularCategoria
    }
  }
}
    ${RegularCategoriaFragmentDoc}`;

export function useActualizarCategoriaMutation() {
  return Urql.useMutation<ActualizarCategoriaMutation, ActualizarCategoriaMutationVariables>(ActualizarCategoriaDocument);
};
export const ActualizarEstudianteDocument = gql`
    mutation ActualizarEstudiante($input: EstudianteInputEditar!) {
  actualizarEstudiante(input: $input) {
    errors {
      field
      message
    }
    persona {
      ...RegularEstudiante
    }
  }
}
    ${RegularEstudianteFragmentDoc}`;

export function useActualizarEstudianteMutation() {
  return Urql.useMutation<ActualizarEstudianteMutation, ActualizarEstudianteMutationVariables>(ActualizarEstudianteDocument);
};
export const ActualizarGrupoDocument = gql`
    mutation ActualizarGrupo($input: GrupoInputEditar!) {
  actualizarGrupo(input: $input) {
    errors {
      field
      message
    }
    grupo {
      ...RegularGrupoUpdate
    }
  }
}
    ${RegularGrupoUpdateFragmentDoc}`;

export function useActualizarGrupoMutation() {
  return Urql.useMutation<ActualizarGrupoMutation, ActualizarGrupoMutationVariables>(ActualizarGrupoDocument);
};
export const ActualizarTurnoDocument = gql`
    mutation ActualizarTurno($input: TurnoInputEditar!) {
  actualizarTurno(input: $input) {
    errors {
      field
      message
    }
    turno {
      ...RegularTurno
    }
  }
}
    ${RegularTurnoFragmentDoc}`;

export function useActualizarTurnoMutation() {
  return Urql.useMutation<ActualizarTurnoMutation, ActualizarTurnoMutationVariables>(ActualizarTurnoDocument);
};
export const CrearCategoriaDocument = gql`
    mutation CrearCategoria($input: CategoriaInput!) {
  crearCategoria(input: $input) {
    errors {
      field
      message
    }
    categoria {
      ...RegularCategoria
    }
  }
}
    ${RegularCategoriaFragmentDoc}`;

export function useCrearCategoriaMutation() {
  return Urql.useMutation<CrearCategoriaMutation, CrearCategoriaMutationVariables>(CrearCategoriaDocument);
};
export const CrearEstudianteDocument = gql`
    mutation CrearEstudiante($input: EstudianteInput!) {
  crearEstudiante(input: $input) {
    errors {
      field
      message
    }
    persona {
      ...RegularEstudiante
    }
  }
}
    ${RegularEstudianteFragmentDoc}`;

export function useCrearEstudianteMutation() {
  return Urql.useMutation<CrearEstudianteMutation, CrearEstudianteMutationVariables>(CrearEstudianteDocument);
};
export const CrearGrupoDocument = gql`
    mutation CrearGrupo($input: GrupoInput!) {
  crearGrupo(input: $input) {
    errors {
      field
      message
    }
    grupo {
      ...RegularGrupoCreate
    }
  }
}
    ${RegularGrupoCreateFragmentDoc}`;

export function useCrearGrupoMutation() {
  return Urql.useMutation<CrearGrupoMutation, CrearGrupoMutationVariables>(CrearGrupoDocument);
};
export const CrearTurnoDocument = gql`
    mutation CrearTurno($input: TurnoInput!) {
  crearTurno(input: $input) {
    errors {
      field
      message
    }
    turno {
      ...RegularTurno
    }
  }
}
    ${RegularTurnoFragmentDoc}`;

export function useCrearTurnoMutation() {
  return Urql.useMutation<CrearTurnoMutation, CrearTurnoMutationVariables>(CrearTurnoDocument);
};
export const EliminarEstudianteDocument = gql`
    mutation EliminarEstudiante($id_persona: Int!) {
  eliminarEstudiante(id_persona: $id_persona)
}
    `;

export function useEliminarEstudianteMutation() {
  return Urql.useMutation<EliminarEstudianteMutation, EliminarEstudianteMutationVariables>(EliminarEstudianteDocument);
};
export const EliminarGrupoDocument = gql`
    mutation EliminarGrupo($id_grupo: Int!) {
  eliminarGrupo(id_grupo: $id_grupo)
}
    `;

export function useEliminarGrupoMutation() {
  return Urql.useMutation<EliminarGrupoMutation, EliminarGrupoMutationVariables>(EliminarGrupoDocument);
};
export const CategoriasDocument = gql`
    query Categorias {
  categorias {
    id_categoria
    nombre
  }
}
    `;

export function useCategoriasQuery(options: Omit<Urql.UseQueryArgs<CategoriasQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CategoriasQuery>({ query: CategoriasDocument, ...options });
};
export const EstudiantesDocument = gql`
    query Estudiantes {
  estudiantes {
    id_persona
    nombre
    primer_apellido
    segundo_apellido
    dni
    numero
    email
  }
}
    `;

export function useEstudiantesQuery(options: Omit<Urql.UseQueryArgs<EstudiantesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EstudiantesQuery>({ query: EstudiantesDocument, ...options });
};
export const GruposDocument = gql`
    query Grupos {
  grupos {
    ...RegularGrupo
  }
}
    ${RegularGrupoFragmentDoc}`;

export function useGruposQuery(options: Omit<Urql.UseQueryArgs<GruposQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GruposQuery>({ query: GruposDocument, ...options });
};
export const TurnosDocument = gql`
    query Turnos {
  turnos {
    ...RegularTurno
  }
}
    ${RegularTurnoFragmentDoc}`;

export function useTurnosQuery(options: Omit<Urql.UseQueryArgs<TurnosQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TurnosQuery>({ query: TurnosDocument, ...options });
};