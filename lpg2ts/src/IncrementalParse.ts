import { DeterministicParser } from "./DeterministicParser";
import { LexParser } from "./LexParser";
import { LexStream } from "./LexStream";
import { Adjunct } from "./Adjunct";
import { IPrsStream, IToken } from "./Protocol";

/**
 * LPG2 TypeScript incremental parsing positioning (same as C++ runtime):
 *
 * - **Token-level** honest re-lex: truncate suffix at damage offset, rescan.
 * - **Statement-level** incremental re-parse: `DeterministicParser.parse(sym, index)`.
 *
 * This is **not** tree-sitter-style subtree reuse (`tree.edit()`, grafting retained nodes).
 */
export const INCREMENTAL_PARSING_POSITIONING =
    "Token-level re-lex + statement-level re-parse — not tree-sitter subtree reuse.";

/** Inclusive character offset range describing an edit / damage region. */
export interface IncrementalDamageRange {
    startOffset: number;
    endOffset: number;
}

export interface IncrementalRelexResult {
    /** Tokens removed from the stream at the damage point (discarded, not reused). */
    affectedTokens: IToken[];
    /** Character offset where re-lex scanning resumed. */
    repairOffset: number;
    /** Parser stream index after the last scanned token in the damage region. */
    lastScannedOffset: number;
}

export interface IncrementalRelexContext {
    lexStream: LexStream;
    lexParser: LexParser;
    prsStream: IPrsStream;
    /** Full post-edit source text. */
    inputChars: string;
    damage: IncrementalDamageRange;
}

function isAdjunct(token: IToken): boolean {
    return token instanceof Adjunct;
}

/**
 * Apply a source edit and re-lex the damage region after
 * {@link IPrsStream.incrementalResetAtCharacterOffset}.
 */
export function incrementalRelexAfterDamage(ctx: IncrementalRelexContext): IncrementalRelexResult {
    const { lexStream, lexParser, prsStream, inputChars, damage } = ctx;
    const start_change_offset = damage.startOffset;
    const end_change_offset = damage.endOffset;
    const offset_adjustment = inputChars.length - lexStream.getStreamLength();

    const affected_tokens = prsStream.incrementalResetAtCharacterOffset(start_change_offset);

    let affected_index = 0;
    let repair_offset = start_change_offset;
    if (affected_tokens.length > 0) {
        const token0 = affected_tokens[0];
        if (token0.getEndOffset() + 1 < start_change_offset) {
            repair_offset = token0.getEndOffset() + 1;
            if (isAdjunct(token0)) {
                prsStream.makeAdjunct(token0.getStartOffset(), token0.getEndOffset(), token0.getKind());
            } else {
                prsStream.makeToken(token0.getStartOffset(), token0.getEndOffset(), token0.getKind());
            }
            affected_index++;
        } else {
            repair_offset = token0.getStartOffset();
        }
    }

    lexStream.setInputChars(inputChars);
    lexStream.setStreamLength(inputChars.length);
    lexStream.computeLineOffsets();

    lexParser.resetTokenStream(repair_offset);

    let next_offset: number;
    do {
        next_offset = lexParser.incrementalParseCharacters();
        while (affected_index < affected_tokens.length &&
               affected_tokens[affected_index].getStartOffset() + offset_adjustment < next_offset) {
            affected_index++;
        }
    } while (next_offset <= end_change_offset &&
             affected_index < affected_tokens.length &&
             affected_tokens[affected_index].getStartOffset() + offset_adjustment !== next_offset);

    return {
        affectedTokens: affected_tokens,
        repairOffset: repair_offset,
        lastScannedOffset: next_offset,
    };
}

/**
 * Prepare a deterministic parser for statement-level incremental re-parse.
 * Call before repeated {@link incrementalReparseStep} invocations.
 */
export function resetIncrementalParser(parser: DeterministicParser, markerKind: number = 0): void {
    parser.resetParserEntry(markerKind);
}

/**
 * Advance the deterministic parser by one statement using k lookahead symbols.
 * Returns the transition action (or Accept / Error constants from the parser table).
 */
export function incrementalReparseStep(
    parser: DeterministicParser,
    lookahead: Int32Array,
    index: number = 0
): number {
    return parser.parse(lookahead, index);
}

/** Truncate a token stream at a damage offset (convenience wrapper). */
export function incrementalResetAtDamage(
    stream: IPrsStream,
    damageOffset: number
): IToken[] {
    return stream.incrementalResetAtCharacterOffset(damageOffset);
}
