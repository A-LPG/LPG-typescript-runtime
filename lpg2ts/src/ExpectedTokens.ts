import { ParseTable } from "./ParseTable";

/**
 * Expected-terminals helper for editor completion (antlr4-c3 style).
 *
 * For parser state S, return sorted distinct terminal names where
 * tAction(S, sym) is not ERROR_ACTION. Names come from ParseTable.name
 * via terminalIndex(sym). Terminal symbol ids are 1 .. getNtOffset()-1.
 */
export function expectedTerminalNames(prs: ParseTable, state: number): string[] {
    if (!prs) {
        return [];
    }
    const errorAction = prs.getErrorAction();
    const ntOffset = prs.getNtOffset();
    const unique = new Set<string>();
    for (let sym = 1; sym < ntOffset; sym++) {
        const act = prs.tAction(state, sym);
        if (act === errorAction) {
            continue;
        }
        const n = prs.name(prs.terminalIndex(sym));
        if (n) {
            unique.add(n);
        }
    }
    return Array.from(unique).sort();
}
