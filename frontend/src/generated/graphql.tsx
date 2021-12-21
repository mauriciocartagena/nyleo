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

export type Curso = {
  __typename?: 'Curso';
  id_curso: Scalars['Int'];
  id_grupo: Grupo;
  id_persona: Persona;
};

export type FieldError = {
  __typename?: 'FieldError';
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

export type LoginUsuarioPasswordInput = {
  password: Scalars['String'];
  usuario: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  actualizarCategoria?: Maybe<Categoria>;
  actualizarCurso: Curso;
  actualizarEstudiante?: Maybe<Array<Persona>>;
  actualizarGrupo: Array<Grupo>;
  actualizarTurno?: Maybe<Turno>;
  crearCategoria: Categoria;
  crearCurso: Curso;
  crearEstudiante: Persona;
  crearGrupo?: Maybe<Grupo>;
  crearTurno: Turno;
  eliminarCategoria: Scalars['Boolean'];
  eliminarCurso: Scalars['Boolean'];
  eliminarEstudiante: Scalars['Boolean'];
  eliminarGrupo: Scalars['Boolean'];
  eliminarTurno: Scalars['Boolean'];
  login: UserResponse;
  registrarUsuario: UserResponse;
};


export type MutationActualizarCategoriaArgs = {
  id_categoria: Scalars['Float'];
  nombre?: InputMaybe<Scalars['String']>;
};


export type MutationActualizarCursoArgs = {
  id_curso: Scalars['Int'];
  id_grupo: Scalars['Int'];
  id_persona: Scalars['Int'];
};


export type MutationActualizarEstudianteArgs = {
  dni: Scalars['String'];
  email: Scalars['String'];
  id_persona: Scalars['Float'];
  nombre: Scalars['String'];
  numero: Scalars['Float'];
  primer_apellido: Scalars['String'];
  segundo_apellido?: InputMaybe<Scalars['String']>;
};


export type MutationActualizarGrupoArgs = {
  dia_final: Scalars['String'];
  dia_inicio: Scalars['String'];
  fecha_final: Scalars['DateTime'];
  fecha_inicio: Scalars['DateTime'];
  id_categoria: Scalars['Int'];
  id_grupo: Scalars['Int'];
  id_turno: Scalars['Int'];
};


export type MutationActualizarTurnoArgs = {
  hora_final: Scalars['String'];
  hora_inicio: Scalars['String'];
  id_turno: Scalars['Float'];
  nombre: Scalars['String'];
};


export type MutationCrearCategoriaArgs = {
  nombre: Scalars['String'];
};


export type MutationCrearCursoArgs = {
  id_grupo: Scalars['Int'];
  id_persona: Scalars['Int'];
};


export type MutationCrearEstudianteArgs = {
  dni: Scalars['String'];
  email: Scalars['String'];
  nombre: Scalars['String'];
  numero: Scalars['Float'];
  primer_apellido: Scalars['String'];
  segundo_apellido: Scalars['String'];
};


export type MutationCrearGrupoArgs = {
  dia_final: Scalars['String'];
  dia_inicio: Scalars['String'];
  fecha_final: Scalars['DateTime'];
  fecha_inicio: Scalars['DateTime'];
  id_categoria: Scalars['Int'];
  id_turno: Scalars['Int'];
};


export type MutationCrearTurnoArgs = {
  hora_final: Scalars['String'];
  hora_inicio: Scalars['String'];
  nombre: Scalars['String'];
};


export type MutationEliminarCategoriaArgs = {
  id_categoria: Scalars['Float'];
};


export type MutationEliminarCursoArgs = {
  id_curso: Scalars['Int'];
};


export type MutationEliminarEstudianteArgs = {
  id_persona: Scalars['Float'];
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
  numero: Scalars['Int'];
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

export type EstudiantesQueryVariables = Exact<{ [key: string]: never; }>;


export type EstudiantesQuery = { __typename?: 'Query', estudiantes: Array<{ __typename?: 'Persona', id_persona: number, nombre: string, primer_apellido: string, segundo_apellido: string, dni: string, numero: number, email: string }> };


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