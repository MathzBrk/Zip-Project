import { MensagemResposta } from "./mensagem";

export interface TwillioAdapter {
    enviarParaWhatsapp:(mensafem: string, numero: string) => Promise<MensagemResposta>
}