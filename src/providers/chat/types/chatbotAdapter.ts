export interface Chatbot {
    responderParaUsuario(mensagem: string, telefone: string): Promise<void>;
}
  