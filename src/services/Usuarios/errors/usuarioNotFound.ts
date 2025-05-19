export class UsuarioNotFound extends Error {
    constructor(userId: string) {
        super(`Usuario nao encontrado com o id: ${userId}`);
    }
}