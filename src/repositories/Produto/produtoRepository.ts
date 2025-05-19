import { PrismaClient } from "@prisma/client";
import { Produto } from "../../domain/entities/produto";
import { IProdutoRepository } from "./interfaces/produtoRepositoryInterface";

export class ProdutoRepository implements IProdutoRepository {
    constructor(private prisma: PrismaClient) {}

    async cadastrar(tenantId: string, produto: Produto): Promise<Produto> {
        const produtoSalvo = await this.prisma.produtos.create({
            data: {
                nome: produto.getNome(),
                preco: produto.getPreco(),
                quantidadeEstoque: produto.getQuantidadeEstoque(),
                tenantId
            },
        });

        const produtoDominio = new Produto(produtoSalvo.nome, produtoSalvo.preco, produtoSalvo.quantidadeEstoque, produtoSalvo.id);

        return produtoDominio;
    }

    async deletar(tenantId: string, id: string): Promise<Produto> {
        const produtoExcluido = await this.prisma.produtos.delete({
            where: {
                id,
                tenantId
            }
        });

        const produtoDominio = new Produto(produtoExcluido.nome, produtoExcluido.preco, produtoExcluido.quantidadeEstoque, produtoExcluido.id);


        return produtoDominio;
    }

    async encontrarPorId(tenantId: string, id: string): Promise<Produto> {
        const produtoASerProcurado = await this.prisma.produtos.findUnique({
            where: {
                id,
                tenantId
            }
        })

        return new Produto(produtoASerProcurado.nome,produtoASerProcurado.preco, produtoASerProcurado.quantidadeEstoque, produtoASerProcurado.id);
    }

    async listarTodos(tenantId: string): Promise<Produto[]> {
        return (await this.prisma.produtos.findMany({
            where: {
                tenantId
            }
        })).map((produto) => {
            return new Produto(produto.nome, produto.preco, produto.quantidadeEstoque, produto.id)
        });
    }

    async atualizar(tenantId: string, produto: Produto): Promise<void> {
        await this.prisma.produtos.update({
            where: {
                id: produto.getId(),
                tenantId
            },
            data: {
                nome: produto.getNome(),
                preco: produto.getPreco(),
                quantidadeEstoque: produto.getQuantidadeEstoque(),
            }
        })
    }
}
