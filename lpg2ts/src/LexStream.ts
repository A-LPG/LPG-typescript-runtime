
import { ParseErrorCodes } from "./ParseErrorCodes";
import { IPrsStream } from "./IPrsStream";
import { IMessageHandler } from "./IMessageHandler";
import { ILexStream } from "./ILexStream";
import { IntSegmentedTuple } from "./IntSegmentedTuple";

export class LexStream implements ILexStream, ParseErrorCodes {
    public static DEFAULT_TAB: number = 1;
    private index: number = -1;
    private streamLength: number = 0;
    private inputChars: string[];
    private fileName: string;
    private lineOffsets: IntSegmentedTuple;
    private tab: number = LexStream.DEFAULT_TAB;
    public prsStream: IPrsStream;
    private errMsg: IMessageHandler = null;
    constructor() {
        this.lineOffsets = new IntSegmentedTuple(12);
        this.setLineOffset(-1);
    }
    constructor(tab: number) {
        this.this();
        this.tab = tab;
    }
    constructor(fileName: string) {
        this.this(fileName, LexStream.DEFAULT_TAB);
    }
    constructor(fileName: string, tab: number) {
        this.this(tab);
        this.initialize(fileName);
    }
    constructor(inputChars: string[], fileName: string) {
        this.this();
        this.initialize(inputChars, fileName);
    }
    constructor(lineOffsets: IntSegmentedTuple, inputChars: string[], fileName: string) {
        this.initialize(lineOffsets, inputChars, fileName);
    }
    constructor(inputChars: string[], fileName: string, tab: number) {
        this.this(tab);
        this.initialize(inputChars, fileName);
    }
    constructor(lineOffsets: IntSegmentedTuple, inputChars: string[], fileName: string, tab: number) {
        this.tab = tab;
        this.initialize(lineOffsets, inputChars, fileName);
    }
    public initialize(fileName: string): void {
        try {
            var f: File = new File(fileName);
            var inputStreamReader: InputStreamReader = new InputStreamReader(new FileInputStream(f));
            var buffer: string[] = [];
            inputStreamReader.read(buffer, 0, buffer.length);
            this.initialize(buffer, fileName);
        } catch ($ex$) {
            if ($ex$ instanceof Error) {
                var e: Error = <Error>$ex$;
                var io: Error = new Error();
                console.error(e.message);
                console.error(e);
                throw (io);
            } else {
                throw $ex$;
            }
        }
    }
    public initialize(inputChars: string[], fileName: string): void {
        this.setInputChars(inputChars);
        this.setStreamLength(inputChars.length);
        this.setFileName(fileName);
        this.computeLineOffsets();
    }
    public initialize(lineOffsets: IntSegmentedTuple, inputChars: string[], fileName: string): void {
        this.lineOffsets = lineOffsets;
        this.setInputChars(inputChars);
        this.setStreamLength(inputChars.length);
        this.setFileName(fileName);
    }
    public computeLineOffsets(): void {
        this.lineOffsets.reset();
        this.setLineOffset(-1);
        for (var i: number = 0; i < this.inputChars.length; i++) {
            if (this.inputChars[i] == 0x0A) {
                this.setLineOffset(i);
            }
        }
    }
    public setInputChars(inputChars: string[]): void {
        this.inputChars = inputChars;
        this.index = -1;
    }
    public getInputChars(): string[] {
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
    public getIPrsStream(): IPrsStream {
        return this.prsStream;
    }
    public getPrsStream(): IPrsStream {
        return this.prsStream;
    }
    public orderedExportedSymbols(): string[] {
        return null;
    }
    public getCharValue(i: number): string {
        return this.inputChars[i];
    }
    public getIntValue(i: number): number {
        return this.inputChars[i];
    }
    public getLine(): number {
        return this.getLineCount();
    }
    public getLineCount(): number {
        return this.lineOffsets.size() - 1;
    }
    public getLineNumberOfCharAt(i: number): number {
        var index: number = this.lineOffsets.binarySearch(i);
        return index < 0 ? -index : index == 0 ? 1 : index;
    }
    public getColumnOfCharAt(i: number): number {
        var lineNo: number = this.getLineNumberOfCharAt(i), start: number = this.lineOffsets.get(lineNo - 1);
        if (start + 1 >= this.streamLength) {
            return 1;
        }
        for (var k: number = start + 1; k < i; k++) {
            if (this.inputChars[k] == '\t') {
                var offset: number = (k - start) - 1;
                start -= ((this.tab - 1) - offset % this.tab);
            }
        }
        return i - start;
    }
    public getToken(): number {
        return this.index = this.getNext(this.index);
    }
    public getToken(end_token: number): number {
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
    public reset(i: number): void {
        this.index = i - 1;
    }
    public reset(): void {
        this.index = -1;
    }
    public badToken(): number {
        return 0;
    }
    public getLine(i: number): number {
        return this.getLineNumberOfCharAt(i);
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
    public getMessageHandler(): IMessageHandler {
        return this.errMsg;
    }
    public makeToken(startLoc: number, endLoc: number, kind: number): void {
        if (this.prsStream != null) {
            this.prsStream.makeToken(startLoc, endLoc, kind);
        } else {
            this.reportLexicalError(startLoc, endLoc);
        }
    }
    public reportLexicalError(left_loc: number, right_loc: number): void {
        var errorCode: number = (right_loc >= this.streamLength ? ParseErrorCodes.EOF_CODE : left_loc == right_loc ? ParseErrorCodes.LEX_ERROR_CODE : ParseErrorCodes.INVALID_TOKEN_CODE);
        var tokenText: string = (errorCode == ParseErrorCodes.EOF_CODE ? "End-of-file " : errorCode == ParseErrorCodes.INVALID_TOKEN_CODE ? "\"" + this.inputChars, left_loc, right_loc - left_loc + 1 + "\" " : "\"" + this.getCharValue(left_loc) + "\" ");
        this.reportLexicalError(errorCode, left_loc, right_loc, 0, 0, [tokenText]);
    }
    public getLocation(left_loc: number, right_loc: number): Int32Array {
        var length: number = (right_loc < this.streamLength ? right_loc : this.streamLength - 1) - left_loc + 1;
        return new Int32Array([left_loc, length, this.getLineNumberOfCharAt(left_loc), this.getColumnOfCharAt(left_loc), this.getLineNumberOfCharAt(right_loc), this.getColumnOfCharAt(right_loc)]);
    }
    public reportLexicalError(errorCode: number, left_loc: number, right_loc: number, error_left_loc: number, error_right_loc: number, errorInfo: string[]): void {
        if (this.errMsg == null) {
            var locationInfo: string = this.getFileName() + ':' + this.getLineNumberOfCharAt(left_loc) + ':' + this.getColumnOfCharAt(left_loc) + ':' + this.getLineNumberOfCharAt(right_loc) + ':' + this.getColumnOfCharAt(right_loc) + ':' + error_left_loc + ':' + error_right_loc + ':' + errorCode + ": ";
            console.log("****Error: " + locationInfo);
            if (errorInfo != null) {
                for (var i: number = 0; i < errorInfo.length; i++) {
                    console.log(errorInfo[i] + " ");
                }
            }
            console.log(ParseErrorCodes.errorMsgText[errorCode]);
        } else {
            this.errMsg.handleMessage(errorCode, this.getLocation(left_loc, right_loc), this.getLocation(error_left_loc, error_right_loc), this.getFileName(), errorInfo);
        }
    }
    public reportError(errorCode: number, leftToken: number, rightToken: number, errorInfo: string): void {
        this.reportError(errorCode, leftToken, 0, rightToken, errorInfo == null ? null : [errorInfo]);
    }
    public reportError(errorCode: number, leftToken: number, rightToken: number, errorInfo: string[]): void {
        this.reportError(errorCode, leftToken, 0, rightToken, errorInfo);
    }
    public reportError(errorCode: number, leftToken: number, errorToken: number, rightToken: number, errorInfo: string): void {
        this.reportError(errorCode, leftToken, errorToken, rightToken, errorInfo == null ? null : [errorInfo]);
    }
    public reportError(errorCode: number, leftToken: number, errorToken: number, rightToken: number, errorInfo: string[]): void {
        this.reportLexicalError(errorCode, leftToken, rightToken, errorToken, errorToken, errorInfo == null ? [] : errorInfo);
    }
    public toString(startOffset: number, endOffset: number): string {
        var length: number = endOffset - startOffset + 1;
        return (endOffset >= this.inputChars.length ? "$EOF" : length <= 0 ? "" : this.inputChars, startOffset, length);
    }
}
;