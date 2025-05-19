export class Email {
    private email: string;

    private constructor(email: string) {
        this.email = email;
    }

    public static create(email: string): Email {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Email inválido');
        }
        return new Email(email);
    }

    public getEmail(): string {
        return this.email;
    }
}