export interface LoginUseCases {
    login(email: string, senha: string): Promise<string>;
}