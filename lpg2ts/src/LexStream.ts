import * as fs from "fs-extra";
import { ParseErrorCodes, errorMsgText } from "./ParseErrorCodes";
import { IMessageHandler } from "./IMessageHandler";
import { IntSegmentedTuple } from "./IntSegmentedTuple";
import { ILexStream, IPrsStream } from "./Protocol";

//
// LexStream contains an array of characters as the input stream to be parsed.
// There are methods to retrieve and classify characters.
// The lexparser "token" is implemented simply as the index of the next character in the array.
// The user must subclass LexStreamBase and implement the abstract methods: getKind.
//
export class LexStream implements ILexStream {
    m77Ac341Feebeb7C0A7Ff8F9C6540531500693Bac: number=0;
    public static readonly DEFAULT_TAB: number = 1;

    private index: number = -1;
    private streamLength: number = 0;
    private inputChars: string="";
    private fileName: string="";
    private lineOffsets: IntSegmentedTuple;
    private tab: number = LexStream.DEFAULT_TAB;

    public prsStream?: IPrsStream;
    private errMsg?: IMessageHandler;

    constructor(fileName: string, inputChars?: string, tab: number = LexStream.DEFAULT_TAB, lineOffsets?: IntSegmentedTuple) {
        this.lineOffsets = new IntSegmentedTuple(12);
        this.setLineOffset(-1);
        this.tab = tab;
        this.initialize(fileName, inputChars, lineOffsets);

    }

    public initialize(fileName: string, inputChars?: string, lineOffsets?: IntSegmentedTuple): void {
      if (!inputChars) {
          try {
              inputChars= fs.readFileSync(fileName, "ascii");
          } catch ($ex$) {
              if ($ex$ instanceof Error) {
                  let e: Error = <Error>$ex$;
                  let io: Error = new Error();
                  console.error(e.message);
                  console.error(e);
                  throw (io);
              } else {
                  throw $ex$;
              }
          }
      }
      if (!inputChars)
          return;

        this.setInputChars(inputChars);
        this.setStreamLength(inputChars.length);
        this.setFileName(fileName);
        if (lineOffsets) {
            this.lineOffsets = lineOffsets;
        } else {
            this.computeLineOffsets();
        }
    }
    public computeLineOffsets(): void {
        this.lineOffsets.reset();
        this.setLineOffset(-1);
        for (let i: number = 0; i < this.inputChars.length; i++) {
            if (this.inputChars.charCodeAt(i) == 0x0A) {
                this.setLineOffset(i);
            }
        }
    }
    public setInputChars(inputChars: string): void {
        this.inputChars = inputChars;
        this.index = -1; // reset the start index to the beginning of the input
    }
    public getInputChars(): string {
        return this.inputChars;
    }
    public setFileName(fileName: string): void {
        this.fileName = fileName;
    }
    public getFileName(): string {
        return this.fileName;
    }
    public setLineOffsets(lineOffsets: IntSegmentedTuple): void {
        this.lineOffsets = lineOffsets;
    }
    public getLineOffsets(): IntSegmentedTuple {
        return this.lineOffsets;
    }
    public setTab(tab: number): void {
        this.tab = tab;
    }
    public getTab(): number {
        return this.tab;
    }
    public setStreamIndex(index: number): void {
        this.index = index;
    }
    public getStreamIndex(): number {
        return this.index;
    }
    public setStreamLength(streamLength: number): void {
        this.streamLength = streamLength;
    }
    public getStreamLength(): number {
        return this.streamLength;
    }
    public setLineOffset(i: number): void {
        this.lineOffsets.add(i);
    }
    public getLineOffset(i: number): number {
        return this.lineOffsets.get(i);
    }
    public setPrsStream(prsStream: IPrsStream): void {
        prsStream.setLexStream(this);
        this.prsStream = prsStream;
    }
    public getIPrsStream(): IPrsStream  | undefined{
        return this.prsStream;
    }

    public orderedExportedSymbols(): string[] {
        return [];
    }
    public getCharValue(i: number): string {
        return this.inputChars[i];
    }
    public getIntValue(i: number): number {
        return this.inputChars.charCodeAt(i);
    }

    public getLineCount(): number {
        return this.lineOffsets.size() - 1;
    }
    public getLineNumberOfCharAt(i: number): number {
        let index: number = this.lineOffsets.binarySearch(i);
        return index < 0 ? -index : index == 0 ? 1 : index;
    }
    public getColumnOfCharAt(i: number): number {
        let lineNo: number = this.getLineNumberOfCharAt(i),
            start: number = this.lineOffsets.get(lineNo - 1);
        if (start + 1 >= this.streamLength) {
            return 1;
        }
        for (let k: number = start + 1; k < i; k++) {
            if (this.inputChars[k] == '\t') {
                let offset: number = (k - start) - 1;
                start -= ((this.tab - 1) - offset % this.tab);
            }
        }
        return i - start;
    }
    public getToken2(): number {
        return this.index = this.getNext(this.index);
    }
    public getToken(end_token?: number ): number {
        if (!end_token) {
            return this.getToken2();
        }
        return this.index = (this.index < end_token ? this.getNext(this.index) : this.streamLength);
    }
    public getKind(i: number): number {
        return 0;
    }
    public next(i: number): number {
        return this.getNext(i);
    }
    public getNext(i: number): number {
        return (++i < this.streamLength ? i : this.streamLength);
    }
    public previous(i: number): number {
        return this.getPrevious(i);
    }
    public getPrevious(i: number): number {
        return (i <= 0 ? 0 : i - 1);
    }
    public getName(i: number): string {
        return i >= this.getStreamLength() ? "" : "" + this.getCharValue(i);
    }
    public peek(): number {
        return this.getNext(this.index);
    }
    public reset(i?: number): void {
        if(i)
            this.index = i - 1;
        else{
            this.index = -1;
        }
    }
    
    public badToken(): number {
        return 0;
    }
    public getLine(i?: number): number {
        if (!i) {
            return this.getLine2();
        }
        return this.getLineNumberOfCharAt(i);
    }
    public getLine2(): number {
        return this.getLineCount();
    }
    public getColumn(i: number): number {
        return this.getColumnOfCharAt(i);
    }
    public getEndLine(i: number): number {
        return this.getLine(i);
    }
    public getEndColumn(i: number): number {
        return this.getColumnOfCharAt(i);
    }
    public afterEol(i: number): boolean {
        return (i < 1 ? true : this.getLineNumberOfCharAt(i - 1) < this.getLineNumberOfCharAt(i));
    }
    public getFirstErrorToken(i: number): number {
        return this.getFirstRealToken(i);
    }
    public getFirstRealToken(i: number): number {
        return i;
    }
    public getLastErrorToken(i: number): number {
        return this.getLastRealToken(i);
    }
    public getLastRealToken(i: number): number {
        return i;
    }
    public setMessageHandler(errMsg: IMessageHandler): void {
        this.errMsg = errMsg;
    }
    public getMessageHandler(): IMessageHandler | undefined {
        return this.errMsg;
    }
    public makeToken(startLoc: number, endLoc: number, kind: number): void {
        if (this.prsStream) {
            this.prsStream.makeToken(startLoc, endLoc, kind);
        } else {
            this.reportLexicalError(startLoc, endLoc);
        }
    }

    public getLocation(left_loc: number, right_loc: number): Int32Array {
        let length: number = (right_loc < this.streamLength ? right_loc : this.streamLength - 1) - left_loc + 1;
        return new Int32Array([left_loc, length, this.getLineNumberOfCharAt(left_loc), this.getColumnOfCharAt(left_loc), this.getLineNumberOfCharAt(right_loc), this.getColumnOfCharAt(right_loc)]);
    }
    public reportLexicalError(left_loc: number, right_loc: number, errorCode?: number,
                              error_left_loc_arg?: number, error_right_loc_arg?: number, errorInfoArg?:  string[]): void {

        let error_left_loc: number = 0;
        if (error_left_loc_arg) {
            error_left_loc = error_left_loc_arg;
        }
        let error_right_loc: number = 0;
        if (error_right_loc_arg) {
            error_right_loc = error_right_loc_arg;
        }
        let errorInfo: string[]=[];
        if (errorInfoArg) {
            errorInfo = errorInfoArg;
        }
        if (!errorCode) {
            errorCode = (right_loc >= this.streamLength ? ParseErrorCodes.EOF_CODE : left_loc == right_loc ? ParseErrorCodes.LEX_ERROR_CODE : ParseErrorCodes.INVALID_TOKEN_CODE);
            let tokenText: string = (errorCode == ParseErrorCodes.EOF_CODE ? "End-of-file " : errorCode == ParseErrorCodes.INVALID_TOKEN_CODE ? "\"" + this.inputChars.slice(left_loc, left_loc + right_loc - left_loc + 1) + "\" " : "\"" + this.getCharValue(left_loc) + "\" ");
            error_left_loc = 0;
            error_right_loc = 0;
            errorInfo = [tokenText];
        }


        if (!this.errMsg) {
            let locationInfo: string = this.getFileName() + ':' + this.getLineNumberOfCharAt(left_loc) + ':' + this.getColumnOfCharAt(left_loc) + ':' + this.getLineNumberOfCharAt(right_loc) + ':' + this.getColumnOfCharAt(right_loc) + ':' + error_left_loc + ':' + error_right_loc + ':' + errorCode + ": ";
            console.log("****Error: " + locationInfo);
            if (errorInfo) {
                for (let i: number = 0; i < errorInfo.length; i++) {
                    console.log(errorInfo[i] + " ");
                }
            }
            console.log(errorMsgText[errorCode]);
        } else {
            this.errMsg.handleMessage(errorCode, this.getLocation(left_loc, right_loc), this.getLocation(error_left_loc, error_right_loc), this.getFileName(), errorInfo);
        }
    }
  
    public reportError(errorCode: number, leftToken: number, rightToken: number, errorInfo: string | string[], errorToken: number=0): void {
        let tempInfo: string[];
        if (typeof errorInfo == "string") {
            tempInfo = [errorInfo];
        }
        else if (Array.isArray(errorInfo)) {
            tempInfo = errorInfo;
        }
        else {
            tempInfo = [];
        }
        
        this.reportLexicalError(leftToken, rightToken, errorCode,  errorToken,errorToken, tempInfo);
    }

    public toString(startOffset: number, endOffset: number): string {
        let length: number = endOffset - startOffset + 1;
        return (endOffset >= this.inputChars.length ? "$EOF" : length <= 0 ? "" : this.inputChars.slice(startOffset, startOffset+ length));
    }
}
;
