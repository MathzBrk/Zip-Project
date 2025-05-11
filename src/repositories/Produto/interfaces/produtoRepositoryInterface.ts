import { Produtos } from "@prisma/client";
import { ProductResponse, Produto } from "../../../libs/entities/produto";

export interface IProdutoRepository {
  cadastrar(dados: Produto): Promise<Produto>;
  encontrarPorId(id: string): Promise<Produto | null>;
  listarTodos(): Promise<Produto[]>;
  deletar(id: string): Promise<Produto>;
  atualizar(produto: Produto): Promise<void>;
}
