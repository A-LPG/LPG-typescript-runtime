import { Stacks } from "./Stacks";
import { Monitor } from "./Monitor";
import { TokenStream, EscapeStrictPropertyInitializationTokenStream } from "./TokenStream";
import { ParseTable, EscapeStrictPropertyInitializationParseTable } from "./ParseTable";
import { RuleAction, EscapeStrictPropertyInitializationRuleAction } from "./RuleAction";
import { BadParseException } from "./BadParseException";
import { BadParseSymFileException } from "./BadParseSymFileException";
import { NotGLRParseTableException } from "./NotGLRParseTableException";
import { NotBacktrackParseTableException } from "./NotBacktrackParseTableException";
import { UnavailableParserInformationException } from "./UnavailableParserInformationException";
import { BacktrackingParser } from "./BacktrackingParser";
import { IAst } from "./IAst";
import { IToken, ILexStream } from "./Protocol";
import { GssNode } from "./GssNode";
import { GssEdge } from "./GssEdge";
import { SppfNode } from "./SppfNode";

/**
 * Generalized LR driver over LPG backtrack/GLR conflict tables (GLR v2).
 *
 * Conflict encoding matches BacktrackingParser: when
 * tAction(state, kind) > ACCEPT_ACTION, candidates are the
 * 0-terminated sequence baseAction(act), baseAction(act+1), ....
 * Stacks are maintained as a GSS with prefix sharing; reductions populate
 * an SPPF. Compatible IAst.getNextAst() forests are packed via ForestKey.
 * Error repair (max_error_count > 0) falls back to
 * BacktrackingParser.fuzzyParseEntry.
 */
export class GLRParser extends Stacks {
    private static readonly NULL_RESULT = {};

    private monitor?: Monitor | null;
    private START_STATE: number = 0;
    private NUM_RULES: number = 0;
    private NT_OFFSET: number = 0;
    private LA_STATE_OFFSET: number = 0;
    private ACCEPT_ACTION: number = 0;
    private ERROR_ACTION: number = 0;

    private tokStream: TokenStream = new EscapeStrictPropertyInitializationTokenStream();
    private prs: ParseTable = new EscapeStrictPropertyInitializationParseTable();
    private ra: RuleAction = new EscapeStrictPropertyInitializationRuleAction();

    private taking_actions: boolean = false;
    private currentAction: number = 0;
    private lastToken: number = 0;
    private parseStackRoot: number = 0;
    private frameTop: number = 0;
    private frameLocation: Int32Array = new Int32Array(0);
    private frameParse: any[] = [];
    private familyCache: EqMap<ReductionKey, IAst> = new EqMap();
    private forestCache: EqMap<ForestKey, IAst> = new EqMap();
    private gssNodes: Map<string, GssNode> = new Map();
    private sppfNodes: Map<string, SppfNode> = new Map();
    private sppfRoot: SppfNode | null = null;
    private sppfSymbolCount: number = 0;

    private lookahead(act: number, token: number): number {
        act = this.prs.lookAhead(act - this.LA_STATE_OFFSET, this.tokStream.getKind(token));
        return (act > this.LA_STATE_OFFSET
                    ? this.lookahead(act, this.tokStream.getNext(token))
                    : act);
    }

    /** Act on sym in state, with lookahead past curtok. */
    private tAction(state: number, sym: number, curtok: number): number {
        let act = this.prs.tAction(state, sym);
        return (act > this.LA_STATE_OFFSET
                    ? this.lookahead(act, this.tokStream.getNext(curtok))
                    : act);
    }

    private expandConflict(act: number, out: number[]): void {
        for (let i = act; ; i++) {
            let cand = this.prs.baseAction(i);
            if (cand === 0)
                break;
            out.push(cand);
        }
    }

    public getCurrentRule(): number {
        if (this.taking_actions)
            return this.currentAction;
        throw new UnavailableParserInformationException();
    }

    public getToken(i: number): number {
        if (this.taking_actions)
            return this.frameLocation[this.frameTop + (i - 1)];
        return super.getToken(i);
    }

    public getSym(i: number): any {
        if (this.taking_actions)
            return this.frameParse[this.frameTop + (i - 1)];
        return super.getSym(i);
    }

    public setSym1(ast: any): void {
        if (this.taking_actions)
            this.frameParse[this.frameTop] = ast;
        else
            super.setSym1(ast);
    }

    public getFirstToken(i?: number): number {
        if (!this.taking_actions)
            throw new UnavailableParserInformationException();
        if (i === undefined)
            return this.getToken(1);
        return this.getToken(i);
    }

    public getLastToken(i?: number): number {
        if (!this.taking_actions)
            throw new UnavailableParserInformationException();
        if (i === undefined)
            return this.lastToken;
        return (i >= this.prs.rhs(this.currentAction)
                   ? this.lastToken
                   : this.tokStream.getPrevious(this.getToken(i + 1)));
    }

    /** Root SPPF symbol node from the last successful error-free parse, or null. */
    public getSppfRoot(): SppfNode | null {
        return this.sppfRoot;
    }

    /** Number of distinct SPPF symbol nodes created in the last parse. */
    public getSppfSymbolCount(): number {
        return this.sppfSymbolCount;
    }

    public setMonitor(monitor?: Monitor | null): void {
        this.monitor = monitor;
    }

    public reset1(): void {
        this.taking_actions = false;
        this.sppfRoot = null;
        this.sppfSymbolCount = 0;
    }

    public reset2(tokStream: TokenStream, monitor?: Monitor | null): void {
        this.monitor = monitor;
        this.tokStream = tokStream;
        this.reset1();
    }

    public reset(tokStream?: TokenStream | null, prs?: ParseTable | null, ra?: RuleAction | null, monitor?: Monitor | null): void {
        if (prs) {
            this.prs = prs;
            this.START_STATE = prs.getStartState();
            this.NUM_RULES = prs.getNumRules();
            this.NT_OFFSET = prs.getNtOffset();
            this.LA_STATE_OFFSET = prs.getLaStateOffset();
            this.ACCEPT_ACTION = prs.getAcceptAction();
            this.ERROR_ACTION = prs.getErrorAction();
            if (!prs.isValidForParser())
                throw new BadParseSymFileException();
            if (!prs.isGLR || !prs.isGLR())
                throw new NotGLRParseTableException();
        }
        if (ra)
            this.ra = ra;

        if (!tokStream) {
            this.reset1();
            return;
        }
        this.reset2(tokStream, monitor);
    }

    constructor(tokStream?: TokenStream | null, prs?: ParseTable | null, ra?: RuleAction | null, monitor?: Monitor | null) {
        super();
        this.reset(tokStream, prs, ra, monitor);
    }

    public parse(max_error_count: number = 0): any {
        return this.parseEntry(0, max_error_count);
    }

    /** Error-free GLR parse when max_error_count omitted/0; else repair fallback. */
    public parseEntry(marker_kind: number = 0, max_error_count: number = 0): any {
        try {
            return this.parseEntryNoRepair(marker_kind);
        } catch (e) {
            if (!(e instanceof BadParseException) || max_error_count <= 0)
                throw e;
            try {
                let bt = new BacktrackingParser(this.tokStream, this.prs, this.ra, this.monitor);
                if (this.ra.setRecoverParser)
                    this.ra.setRecoverParser(bt);
                try {
                    return bt.fuzzyParseEntry(marker_kind, max_error_count);
                } finally {
                    if (this.ra.setRecoverParser)
                        this.ra.setRecoverParser(null);
                }
            } catch (ex) {
                if (ex instanceof BadParseSymFileException || ex instanceof NotBacktrackParseTableException)
                    throw new Error(String(ex));
                throw ex;
            }
        }
    }

    private parseEntryNoRepair(marker_kind: number): any {
        this.tokStream.reset();
        this.familyCache = new EqMap();
        this.forestCache = new EqMap();
        this.gssNodes = new Map();
        this.sppfNodes = new Map();
        this.sppfRoot = null;
        let firstTok = this.tokStream.getToken();
        let prev = this.tokStream.getPrevious(firstTok);
        let startTok = marker_kind === 0 ? firstTok : prev;
        let startKind = marker_kind === 0 ? this.tokStream.getKind(firstTok) : marker_kind;
        this.parseStackRoot = marker_kind === 0 ? 0 : 1;

        let start = new Config();
        start.stateStackTop = -1;
        start.currentAction = this.START_STATE;
        start.curtok = startTok;
        start.lastToken = prev;
        start.currentKind = startKind;
        start.gssTip = null;
        this.ensureCapacity(start, 16);

        let live: Config[] = [start];
        let accepts: AcceptCandidate[] = [];
        let errorTok = startTok;
        let outerGuard = this.prs.getNumStates() * 64 + this.tokStream.getStreamLength() * 8 + 256;

        while (live.length > 0) {
            if (this.monitor && this.monitor.isCancelled())
                return null;
            if (--outerGuard < 0)
                throw new Error("cyclic/ε-loop grammar not supported by GLR v2");

            let next: Config[] = [];
            let packed = new EqMap<ConfigKey, Config[]>();

            for (let cfg of live) {
                if (cfg.curtok > errorTok)
                    errorTok = cfg.curtok;

                let stepResults: Config[] = [];
                let stepAccepts: AcceptCandidate[] = [];
                this.stepConfig(cfg, stepResults, stepAccepts);

                for (let a of stepAccepts)
                    this.packAccept(accepts, a);

                for (let r of stepResults) {
                    let k = r.key();
                    let bucket = packed.get(k);
                    if (bucket == null) {
                        bucket = [r];
                        packed.set(k, bucket);
                        next.push(r);
                    } else {
                        let merged = false;
                        for (let existing of bucket) {
                            if (this.canPackParseStacks(existing, r)) {
                                this.packParseStacks(existing, r);
                                merged = true;
                                break;
                            }
                        }
                        if (!merged) {
                            bucket.push(r);
                            next.push(r);
                        }
                    }
                }
            }

            if (accepts.length > 0 && next.length === 0)
                break;

            live = next;
            if (live.length === 0 && accepts.length === 0)
                throw new BadParseException(errorTok);
        }

        if (accepts.length === 0)
            throw new BadParseException(errorTok);

        let root: any = accepts[0].ast;
        let rootSymbol = accepts[0].grammarSymbol;
        this.sppfRoot = accepts[0].sppf;
        for (let i = 1; i < accepts.length; i++) {
            let other = accepts[i];
            if (other.grammarSymbol !== rootSymbol)
                throw new Error("GLR accepted distinct start symbols");
            if (this.sppfRoot == null)
                this.sppfRoot = other.sppf;
            if (!GLRParser.appendNextAst(root, other.ast))
                throw new Error("overlapping GLR accept forests");
        }
        this.sppfSymbolCount = this.sppfNodes.size;
        return root === GLRParser.NULL_RESULT ? null : root;
    }

    private stepConfig(cfg: Config, out: Config[], accepts: AcceptCandidate[]): void {
        let work: Config[] = [cfg.copy()];
        let guard = this.prs.getNumStates() * 4 + 8;

        while (work.length > 0) {
            if (--guard < 0)
                throw new Error("cyclic/ε-loop grammar not supported by GLR v2");

            let c = work.pop() as Config;
            this.ensureCapacity(c, c.stateStackTop + 2);
            c.stateStack[++c.stateStackTop] = c.currentAction;
            c.locationStack[c.stateStackTop] = c.curtok;
            c.symbolStack[c.stateStackTop] = 0;
            c.sppfStack[c.stateStackTop] = null;
            if (c.stateStackTop !== this.parseStackRoot)
                c.parseStack[c.stateStackTop] = null;
            c.gssTip = this.gssPush(c.gssTip, c.currentAction, c.curtok, 0, null, null);

            let act = this.tAction(c.currentAction, c.currentKind, c.curtok);
            let candidates: number[] = [];
            if (act > this.ACCEPT_ACTION && act < this.ERROR_ACTION)
                this.expandConflict(act, candidates);
            else
                candidates.push(act);

            for (let ci = 0; ci < candidates.length; ci++) {
                let cand = candidates[ci];
                let fork = (candidates.length === 1) ? c : c.copy();
                this.applyConcreteAction(fork, cand, work, out, accepts);
            }
        }
    }

    private applyConcreteAction(fork: Config, cand: number,
                                work: Config[],
                                out: Config[],
                                accepts: AcceptCandidate[]): void {
        if (cand <= this.NUM_RULES) {
            fork.stateStackTop--;
            fork.gssTip = GLRParser.gssPop(fork.gssTip);
            this.applyReduceClosure(fork, cand, work);
        } else if (cand > this.ERROR_ACTION) {
            fork.symbolStack[fork.stateStackTop] = fork.currentKind;
            let term = this.terminalSppf(fork.currentKind, fork.curtok);
            fork.sppfStack[fork.stateStackTop] = term;
            fork.gssTip = GLRParser.gssRelabel(fork.gssTip, fork.currentKind, fork.curtok, null, term);
            fork.lastToken = fork.curtok;
            fork.curtok = this.tokStream.getNext(fork.curtok);
            fork.currentKind = this.tokStream.getKind(fork.curtok);
            this.applyReduceClosure(fork, cand - this.ERROR_ACTION, work);
        } else if (cand < this.ACCEPT_ACTION) {
            fork.symbolStack[fork.stateStackTop] = fork.currentKind;
            let term = this.terminalSppf(fork.currentKind, fork.curtok);
            fork.sppfStack[fork.stateStackTop] = term;
            fork.gssTip = GLRParser.gssRelabel(fork.gssTip, fork.currentKind, fork.curtok, null, term);
            fork.lastToken = fork.curtok;
            fork.curtok = this.tokStream.getNext(fork.curtok);
            fork.currentKind = this.tokStream.getKind(fork.curtok);
            fork.currentAction = cand;
            out.push(fork);
        } else if (cand === this.ACCEPT_ACTION) {
            let root: any = null;
            let rootSymbol = 0;
            if (fork.parseStack != null && this.parseStackRoot < fork.parseStack.length)
                root = fork.parseStack[this.parseStackRoot];
            if (fork.symbolStack != null && this.parseStackRoot <= fork.stateStackTop)
                rootSymbol = fork.symbolStack[this.parseStackRoot];
            let rootSppf: SppfNode | null = null;
            if (fork.sppfStack != null && this.parseStackRoot < fork.sppfStack.length)
                rootSppf = fork.sppfStack[this.parseStackRoot];
            accepts.push(new AcceptCandidate(
                root == null ? GLRParser.NULL_RESULT : root, rootSymbol, rootSppf));
        }
        // cand === ERROR_ACTION: drop fork
    }

    private applyReduceClosure(fork: Config, rule: number, work: Config[]): void {
        let action = rule;
        do {
            let rhs = this.prs.rhs(action);
            if (fork.stateStackTop - (rhs - 1) < 0)
                throw new Error("GLR reduce stack underflow");

            let kids: SppfNode[] = new Array(rhs);
            if (rhs > 0) {
                for (let i = 0; i < rhs; i++)
                    kids[i] = fork.sppfStack[fork.stateStackTop - rhs + 1 + i] as SppfNode;
            }
            fork.stateStackTop -= (rhs - 1);
            if (rhs > 0) {
                for (let i = 0; i < rhs - 1; i++)
                    fork.gssTip = GLRParser.gssPop(fork.gssTip);
            } else {
                this.ensureCapacity(fork, fork.stateStackTop + 1);
                fork.gssTip = this.gssPush(fork.gssTip,
                    fork.stateStack[fork.stateStackTop],
                    fork.locationStack[fork.stateStackTop],
                    0, null, null);
            }

            let reductionKey = new ReductionKey(action, fork.lastToken, rhs, fork.stateStackTop,
                                                fork.locationStack, fork.symbolStack, fork.parseStack);
            this.currentAction = action;
            this.lastToken = fork.lastToken;
            this.frameTop = fork.stateStackTop;
            this.frameLocation = fork.locationStack;
            this.frameParse = fork.parseStack;

            this.taking_actions = true;
            try {
                this.ra.ruleAction(action);
            } finally {
                this.taking_actions = false;
            }

            let lhs = this.prs.lhs(action);
            let lhsSymbol = this.NT_OFFSET + lhs;
            let result: any = fork.parseStack[fork.stateStackTop];
            if (isIAst(result)) {
                let canonical = this.familyCache.get(reductionKey);
                if (canonical == null) {
                    let ast = result;
                    let forestKey = new ForestKey(lhsSymbol, ast);
                    canonical = forestKey.isPackable() ? this.forestCache.get(forestKey) : undefined;
                    if (canonical == null) {
                        canonical = ast;
                        if (forestKey.isPackable())
                            this.forestCache.set(forestKey, canonical);
                    } else if (canonical !== ast && !GLRParser.appendNextAst(canonical, ast)) {
                        throw new Error("cannot merge GLR production family");
                    }
                    this.familyCache.set(reductionKey, canonical);
                }
                fork.parseStack[fork.stateStackTop] = canonical;
                result = canonical;
            }

            let leftExt = fork.locationStack[fork.stateStackTop];
            let rightExt = fork.lastToken;
            if (isIAst(result)) {
                let lt = result.getLeftIToken();
                let rt = result.getRightIToken();
                if (lt != null && rt != null) {
                    leftExt = lt.getTokenIndex();
                    rightExt = rt.getTokenIndex();
                }
            }
            let symNode = this.sppfSymbol(lhsSymbol, leftExt, rightExt);
            this.addPacked(symNode, action, kids, result);
            if (isIAst(result))
                symNode.astForest = result;
            fork.sppfStack[fork.stateStackTop] = symNode;
            fork.symbolStack[fork.stateStackTop] = lhsSymbol;
            fork.gssTip = GLRParser.gssRelabel(fork.gssTip, lhsSymbol, leftExt, result, symNode);
            action = this.prs.ntAction(fork.stateStack[fork.stateStackTop], lhs);
        } while (action <= this.NUM_RULES);

        fork.currentAction = action;
        work.push(fork);
    }

    private ensureCapacity(c: Config, need: number): void {
        let len = (c.stateStack == null) ? 0 : c.stateStack.length;
        if (need < len)
            return;
        let neu = Math.max(need + 8, len + this.STACK_INCREMENT);
        if (c.stateStack == null) {
            c.stateStack = new Int32Array(neu);
            c.symbolStack = new Int32Array(neu);
            c.parseStack = new Array<any>(neu);
            c.locationStack = new Int32Array(neu);
            c.sppfStack = new Array<SppfNode | null>(neu);
        } else {
            c.stateStack = copyInt32(c.stateStack, neu);
            c.symbolStack = copyInt32(c.symbolStack, neu);
            c.parseStack = copyAny(c.parseStack, neu);
            c.locationStack = copyInt32(c.locationStack, neu);
            c.sppfStack = copyAny(c.sppfStack, neu);
        }
    }

    private static sppfKey(symbol: number, left: number, right: number): string {
        return symbol + ":" + left + ":" + right;
    }

    private sppfSymbol(grammarSymbol: number, leftExtent: number, rightExtent: number): SppfNode {
        let key = GLRParser.sppfKey(grammarSymbol, leftExtent, rightExtent);
        let n = this.sppfNodes.get(key);
        if (n == null) {
            n = new SppfNode(grammarSymbol, leftExtent, rightExtent);
            this.sppfNodes.set(key, n);
        }
        return n;
    }

    private terminalSppf(kind: number, tok: number): SppfNode {
        let term = this.sppfSymbol(kind, tok, tok);
        if (term.packs.length === 0)
            term.packs.push(new SppfNode.Packed(-kind, null, null));
        return term;
    }

    private addPacked(symNode: SppfNode, rule: number, children: SppfNode[] | null, semantic: any): void {
        let n = children == null ? 0 : children.length;
        for (let i = 0; i < symNode.packs.length; i++) {
            let p = symNode.packs[i];
            if (p.rule !== rule || p.children.length !== n)
                continue;
            let same = true;
            for (let c = 0; c < n; c++) {
                if (p.children[c] !== (children as SppfNode[])[c]) {
                    same = false;
                    break;
                }
            }
            if (same)
                return;
        }
        symNode.packs.push(new SppfNode.Packed(rule, children, semantic));
    }

    private gssPush(tip: GssNode | null, state: number, index: number,
                    symbol: number, semantic: any, sppf: SppfNode | null): GssNode {
        let n = new GssNode(state, index);
        let pred = tip == null ? new GssNode(Number.MIN_SAFE_INTEGER, -1) : tip;
        n.edges.push(new GssEdge(pred, symbol, index, semantic, sppf));
        let key = state + ":" + (index >>> 0);
        let canon = this.gssNodes.get(key);
        if (canon == null) {
            canon = new GssNode(state, index);
            this.gssNodes.set(key, canon);
        }
        canon.edges.push(new GssEdge(pred, symbol, index, semantic, sppf));
        return n;
    }

    private static gssPop(tip: GssNode | null): GssNode | null {
        if (tip == null || tip.edges.length === 0)
            return null;
        let pred = tip.edges[0].predecessor;
        return pred.state === Number.MIN_SAFE_INTEGER ? null : pred;
    }

    private static gssRelabel(tip: GssNode | null, symbol: number, location: number,
                              semantic: any, sppf: SppfNode | null): GssNode | null {
        if (tip == null || tip.edges.length === 0)
            return tip;
        let pred = tip.edges[0].predecessor;
        let n = new GssNode(tip.state, tip.index);
        n.edges.push(new GssEdge(pred, symbol, location, semantic, sppf));
        return n;
    }

    private packAccept(accepts: AcceptCandidate[], cand: AcceptCandidate): void {
        let ast = cand.ast;
        let grammarSymbol = cand.grammarSymbol;
        if (ast === GLRParser.NULL_RESULT) {
            for (let i = 0; i < accepts.length; i++) {
                if (accepts[i].ast === GLRParser.NULL_RESULT)
                    return;
            }
            accepts.push(cand);
            return;
        }
        if (ast == null)
            return;
        for (let i = 0; i < accepts.length; i++) {
            let existing = accepts[i];
            let a = existing.ast;
            if (a === GLRParser.NULL_RESULT)
                continue;
            if (existing.grammarSymbol === grammarSymbol
                && GLRParser.sameSpan(a, ast)
                && GLRParser.appendNextAst(a, ast))
            {
                return;
            }
        }
        accepts.push(cand);
    }

    private canPackParseStacks(existing: Config, incoming: Config): boolean {
        if (existing.stateStackTop !== incoming.stateStackTop)
            return false;
        for (let i = 0; i <= existing.stateStackTop; i++) {
            let a = existing.parseStack[i];
            let b = incoming.parseStack[i];
            if (a === b)
                continue;
            if (!isIAst(a) || !isIAst(b))
                return false;
            if (!GLRParser.sameSpan(a, b))
                return false;
            if (!GLRParser.canAppendNextAst(a, b))
                return false;
        }
        return true;
    }

    private static canAppendNextAst(root: any, alt: any): boolean {
        return GLRParser.appendNextAst(root, alt, false);
    }

    private packParseStacks(existing: Config, incoming: Config): void {
        for (let i = 0; i <= existing.stateStackTop; i++) {
            let a = existing.parseStack[i];
            let b = incoming.parseStack[i];
            if (a === b || a == null || b == null)
                continue;
            if (!GLRParser.canAppendNextAst(a, b))
                throw new Error("overlapping GLR semantic forests");
        }
        for (let i = 0; i <= existing.stateStackTop; i++) {
            existing.parseStack[i] = this.packSym(existing.parseStack[i], incoming.parseStack[i]);
            if (existing.sppfStack[i] == null)
                existing.sppfStack[i] = incoming.sppfStack[i];
            else if (incoming.sppfStack[i] != null
                    && existing.sppfStack[i] !== incoming.sppfStack[i]
                    && (existing.sppfStack[i] as SppfNode).grammarSymbol
                        === (incoming.sppfStack[i] as SppfNode).grammarSymbol
                    && (existing.sppfStack[i] as SppfNode).leftExtent
                        === (incoming.sppfStack[i] as SppfNode).leftExtent
                    && (existing.sppfStack[i] as SppfNode).rightExtent
                        === (incoming.sppfStack[i] as SppfNode).rightExtent)
            {
                let canon = existing.sppfStack[i] as SppfNode;
                let other = incoming.sppfStack[i] as SppfNode;
                for (let p = 0; p < other.packs.length; p++) {
                    let pk = other.packs[p];
                    this.addPacked(canon, pk.rule, pk.children, pk.semantic);
                }
                if (isIAst(existing.parseStack[i]))
                    canon.astForest = existing.parseStack[i];
            }
        }
        if (incoming.gssTip != null)
            existing.gssTip = incoming.gssTip;
    }

    private packSym(a: any, b: any): any {
        if (a == null)
            return b;
        if (b == null || a === b)
            return a;
        if (!GLRParser.appendNextAst(a, b))
            throw new Error("overlapping GLR semantic forests");
        return a;
    }

    private static sameSpan(a: any, b: any): boolean {
        if (!isIAst(a) || !isIAst(b))
            return false;
        let la = a.getLeftIToken(), ra = a.getRightIToken();
        let lb = b.getLeftIToken(), rb = b.getRightIToken();
        if (la == null || ra == null || lb == null || rb == null)
            return false;
        return la.getILexStream() === lb.getILexStream()
            && ra.getILexStream() === rb.getILexStream()
            && la.getTokenIndex() === lb.getTokenIndex()
            && ra.getTokenIndex() === rb.getTokenIndex();
    }

    private static appendNextAst(root: any, alt: any, commit: boolean = true): boolean {
        if (!isIAst(root) || !isIAst(alt))
            return false;
        let cur: IAst = root;
        let neu: IAst = alt;
        if (cur === neu)
            return true;

        let seen = new Set<IAst>();
        let tail: IAst | null = null;
        for (let p: IAst | null = cur; p != null; p = p.getNextAst()) {
            if (seen.has(p))
                return false;
            seen.add(p);
            tail = p;
        }

        let incoming = new Set<IAst>();
        for (let p: IAst | null = neu; p != null; ) {
            if (incoming.has(p))
                return false;
            incoming.add(p);
            if (seen.has(p)) {
                p = p.getNextAst();
                continue;
            }
            for (let q: IAst | null = p.getNextAst(); q != null; q = q.getNextAst()) {
                if (incoming.has(q))
                    return false;
                incoming.add(q);
                if (seen.has(q))
                    return false;
            }
            if (commit) {
                if (tail != null && tail.setNextAst)
                    tail.setNextAst(p);
                for (let q: IAst | null = p; q != null; q = q.getNextAst()) {
                    seen.add(q);
                    tail = q;
                }
            }
            return true;
        }
        return true;
    }
}

class AcceptCandidate {
    ast: any;
    grammarSymbol: number;
    sppf: SppfNode | null;

    constructor(ast: any, grammarSymbol: number, sppf: SppfNode | null) {
        this.ast = ast;
        this.grammarSymbol = grammarSymbol;
        this.sppf = sppf;
    }
}

class Config {
    stateStack: Int32Array = new Int32Array(0);
    symbolStack: Int32Array = new Int32Array(0);
    parseStack: any[] = [];
    locationStack: Int32Array = new Int32Array(0);
    sppfStack: Array<SppfNode | null> = [];
    gssTip: GssNode | null = null;
    stateStackTop: number = 0;
    currentAction: number = 0;
    curtok: number = 0;
    lastToken: number = 0;
    currentKind: number = 0;

    copy(): Config {
        let c = new Config();
        c.stateStackTop = this.stateStackTop;
        c.currentAction = this.currentAction;
        c.curtok = this.curtok;
        c.lastToken = this.lastToken;
        c.currentKind = this.currentKind;
        c.gssTip = this.gssTip;
        if (this.stateStack != null && this.stateStack.length > 0) {
            c.stateStack = copyInt32(this.stateStack, this.stateStack.length);
            c.symbolStack = copyInt32(this.symbolStack, this.symbolStack.length);
            c.parseStack = copyAny(this.parseStack, this.parseStack.length);
            c.locationStack = copyInt32(this.locationStack, this.locationStack.length);
            if (this.sppfStack != null)
                c.sppfStack = copyAny(this.sppfStack, this.sppfStack.length);
        }
        return c;
    }

    key(): ConfigKey {
        return new ConfigKey(this);
    }
}

class ConfigKey {
    readonly config: Config;
    readonly hash: number;

    constructor(config: Config) {
        this.config = config;
        let h = 31 * config.curtok + config.currentKind;
        h = 31 * h + config.lastToken;
        h = 31 * h + config.currentAction;
        for (let i = 0; i <= config.stateStackTop; i++) {
            h = 31 * h + config.stateStack[i];
            h = 31 * h + config.locationStack[i];
            h = 31 * h + config.symbolStack[i];
        }
        this.hash = h | 0;
    }

    hashCode(): number { return this.hash; }

    equals(other: ConfigKey): boolean {
        if (this === other)
            return true;
        let a = this.config;
        let b = other.config;
        if (a.curtok !== b.curtok || a.currentKind !== b.currentKind
                || a.lastToken !== b.lastToken
                || a.currentAction !== b.currentAction
                || a.stateStackTop !== b.stateStackTop)
            return false;
        for (let i = 0; i <= a.stateStackTop; i++) {
            if (a.stateStack[i] !== b.stateStack[i]
                    || a.locationStack[i] !== b.locationStack[i]
                    || a.symbolStack[i] !== b.symbolStack[i])
                return false;
        }
        return true;
    }
}

class ReductionKey {
    readonly rule: number;
    readonly lastToken: number;
    readonly locations: Int32Array;
    readonly grammarSymbols: Int32Array;
    readonly semanticValues: any[];
    readonly hash: number;

    constructor(rule: number, lastToken: number, rhs: number, frameTop: number,
                locationStack: Int32Array, symbolStack: Int32Array, parseStack: any[]) {
        this.rule = rule;
        this.lastToken = lastToken;
        this.locations = new Int32Array(rhs);
        this.grammarSymbols = new Int32Array(rhs);
        this.semanticValues = new Array(rhs);
        let h = 31 * rule + lastToken;
        for (let i = 0; i < rhs; i++) {
            let index = frameTop + i;
            this.locations[i] = locationStack[index];
            this.grammarSymbols[i] = symbolStack[index];
            this.semanticValues[i] = parseStack[index];
            h = 31 * h + this.locations[i];
            h = 31 * h + this.grammarSymbols[i];
            h = 31 * h + identityHash(this.semanticValues[i]);
        }
        this.hash = h | 0;
    }

    hashCode(): number { return this.hash; }

    equals(other: ReductionKey): boolean {
        if (this === other)
            return true;
        if (this.rule !== other.rule || this.lastToken !== other.lastToken
                || this.locations.length !== other.locations.length)
            return false;
        for (let i = 0; i < this.locations.length; i++) {
            if (this.locations[i] !== other.locations[i]
                    || this.grammarSymbols[i] !== other.grammarSymbols[i]
                    || this.semanticValues[i] !== other.semanticValues[i])
                return false;
        }
        return true;
    }
}

class ForestKey {
    readonly grammarSymbol: number;
    readonly lexStream: ILexStream | undefined | null;
    readonly leftToken: number;
    readonly rightToken: number;
    readonly hash: number;

    constructor(grammarSymbol: number, ast: IAst) {
        let left = ast.getLeftIToken();
        let right = ast.getRightIToken();
        this.grammarSymbol = grammarSymbol;
        this.lexStream = left == null ? null : left.getILexStream();
        this.leftToken = left == null ? -1 : left.getTokenIndex();
        this.rightToken = right == null ? -1 : right.getTokenIndex();
        let h = 31 * grammarSymbol + identityHash(this.lexStream);
        h = 31 * h + this.leftToken;
        this.hash = (31 * h + this.rightToken) | 0;
    }

    isPackable(): boolean {
        return this.leftToken >= 0 && this.rightToken >= 0;
    }

    hashCode(): number { return this.hash; }

    equals(other: ForestKey): boolean {
        if (this === other)
            return true;
        return this.grammarSymbol === other.grammarSymbol
            && this.lexStream === other.lexStream
            && this.leftToken === other.leftToken
            && this.rightToken === other.rightToken;
    }
}

interface EqKeyed {
    hashCode(): number;
    equals(other: any): boolean;
}

class EqMap<K extends EqKeyed, V> {
    private buckets = new Map<number, Array<{ k: K, v: V }>>();
    private _size: number = 0;

    get(key: K): V | undefined {
        let bucket = this.buckets.get(key.hashCode());
        if (bucket == null)
            return undefined;
        for (let e of bucket) {
            if (key.equals(e.k))
                return e.v;
        }
        return undefined;
    }

    set(key: K, value: V): void {
        let h = key.hashCode();
        let bucket = this.buckets.get(h);
        if (bucket == null) {
            bucket = [];
            this.buckets.set(h, bucket);
        }
        for (let i = 0; i < bucket.length; i++) {
            if (key.equals(bucket[i].k)) {
                bucket[i] = { k: key, v: value };
                return;
            }
        }
        bucket.push({ k: key, v: value });
        this._size++;
    }

    get size(): number { return this._size; }
}

function isIAst(o: any): o is IAst {
    return o != null
        && typeof o.getNextAst === "function"
        && typeof o.getLeftIToken === "function"
        && typeof o.getRightIToken === "function";
}

let nextIdentityId = 1;
const identityIds = new WeakMap<object, number>();

function identityHash(o: any): number {
    if (o == null || (typeof o !== "object" && typeof o !== "function"))
        return 0;
    let id = identityIds.get(o);
    if (id === undefined) {
        id = nextIdentityId++;
        identityIds.set(o, id);
    }
    return id;
}

function copyInt32(src: Int32Array, neu: number): Int32Array {
    let dst = new Int32Array(neu);
    dst.set(src.subarray(0, Math.min(src.length, neu)));
    return dst;
}

function copyAny<T>(src: T[], neu: number): T[] {
    let dst = new Array<T>(neu);
    for (let i = 0; i < Math.min(src.length, neu); i++)
        dst[i] = src[i];
    return dst;
}
;
