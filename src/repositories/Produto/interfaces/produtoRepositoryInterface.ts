import { Produtos } from "@prisma/client";
import { ProductResponse, Produto } from "../../../domain/entities/produto";

export interface IProdutoRepository {
  cadastrar(tenantId: string, dados: Produto): Promise<Produto>;
  encontrarPorId(tenantId: string, id: string): Promise<Produto | null>;
  listarTodos(tenantId: string): Promise<Produto[]>;
  deletar(tenantId: string, id: string): Promise<Produto>;
  atualizar(tenantId: string, produto: Produto): Promise<void>;
}
