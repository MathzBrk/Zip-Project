import { DadosCadastroUsuario } from "../../../../domain/entities/usuario";

export interface IUserValidator {
    validarDadosDoUsuario(dados: DadosCadastroUsuario): void;
}