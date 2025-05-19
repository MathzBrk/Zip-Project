import { DadosCadastroUsuario } from "../../../../domain/Usuario/entities/usuario";


export interface IUserValidator {
    validarDadosDoUsuario(dados: DadosCadastroUsuario): void;
}