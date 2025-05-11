export class ProdutoNotFoundError extends Error {
    public status: number;

    constructor(produtoId: string) {
        super(`Produto com id ${produtoId} não encontrado`);
        this.name = "ProdutoNotFoundError";
        this.status = 404; 
    }
}
