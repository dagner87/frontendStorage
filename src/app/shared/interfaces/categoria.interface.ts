// Generated by https://quicktype.io

export interface ListadoCategorias {
  total: number;
  categorias: Categoria[];
}

export interface Categoria {
  _id: string;
  name: string;
  descripcion?: string;
  state?: boolean;
  img?: string;
  usuario: Usuario;
}

export interface Usuario {
  _id: string;
  name: string;
}

// Generated by https://quicktype.io

export interface CategoriaItems {
  result: Result;
}

export interface Result {
  itemsList: ItemsList[];
  total: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
}

export interface ItemsList {
  _id: string;
  name: string;
  descripcion?: string;
  img: string;
  usuario: Usuario;
}

export interface Usuario {
  _id: string;
  name: string;
}
