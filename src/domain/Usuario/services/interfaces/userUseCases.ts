import { UsuarioResponse } from "../../../domain/entities/usuario";
import { DadosCadastroUsuario } from "../../../domain/entities/usuario";

export interface UserUseCases {
    criarUsuario(dados: DadosCadastroUsuario): Promise<UsuarioResponse>;
    deletarUsuario(userId: string): Promise<UsuarioResponse>;
}