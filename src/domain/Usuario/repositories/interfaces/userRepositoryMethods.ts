import { Usuario } from "../../../domain/entities/usuario";

export interface IUserRepository {
    criarUsuario(usuario: Usuario): Promise<Usuario>;
    deletarUsuario(usuarioId: string): Promise<Usuario>;
}
