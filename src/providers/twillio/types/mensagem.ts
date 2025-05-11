export interface MensagemResposta {
    sid: string;               
    status: string;           
    to: string;               
    body: string;              
    dateCreated?: Date;        
    dateSent?: Date | null;   
    erro?: string;            
  }
  
export interface MensagemRecebida {
  from: string;
  body: string;
  timestamp?: Date;
}