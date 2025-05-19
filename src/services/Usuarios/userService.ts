import { UserUseCases } from "./interfaces/userUseCases";
import { IUserRepository } from "../../domain/Usuario/repositories/interfaces/userRepositoryMethods";
import { IUserValidator } from "./validators/interfaces/iUserValidator";
import { Senha } from "../../domain/Usuario/entities/senha";
import { Email } from "../../domain/Usuario/entities/email";
import { UsuarioNotFound } from "./errors/usuarioNotFound";
import { DadosCadastroUsuario, Usuario, UsuarioResponse } from "../../domain/Usuario/entities/usuario";

export class UserService implements UserUseCases {
    constructor(private userRepository: IUserRepository, private userValidator: IUserValidator) {}

    async criarUsuario(dados: DadosCadastroUsuario): Promise<UsuarioResponse> {
        this.userValidator.validarDadosDoUsuario(dados); 

        const usuario = Usuario.create({
            nome: dados.nome,
            email: Email.create(dados.email),
            senha: Senha.criar(dados.senha)        
        })

        const usuarioSalvo = await this.userRepository.criarUsuario(usuario);

        return {
            id: usuarioSalvo.getId(),
            nome: usuarioSalvo.getNome(),
            email: usuarioSalvo.getEmailString()
        }
    }

    async deletarUsuario(userId: string): Promise<UsuarioResponse> {
        const usuarioDeletado = await this.userRepository.deletarUsuario(userId);

        if(!usuarioDeletado) {
            throw new UsuarioNotFound(userId);
        }

        return {
            id: usuarioDeletado.getId(),
            nome: usuarioDeletado.getNome(),
            email: usuarioDeletado.getEmailString()
        }
    }

}