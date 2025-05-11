export class Email {
    private email: string;

    private constructor(email: string) {
        this.email = email;
    }

    public static create(email: string): Email | Error {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Error('Email inválido');
        }
        return new Email(email);
    }
}