export class NotGLRParseTableException extends Error {

    private str: string;

    constructor(str?: string) {
        super();
        if (!str) {
            this.str = "NotGLRParseTableException";
        } else {
            this.str = str;
        }
    }
    public toString(): string {
        return this.str;
    }
}
;
