export class TypeException extends TypeError {
    constructor(message: string) {
        super("Type Error Exception: " + message, {
            cause: "Type Error"
        });
    }
}
