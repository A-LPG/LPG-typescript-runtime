import { ProstheticAst } from "./ProstheticAst";

export interface RuleAction {
    ruleAction(ruleNumber: number): void;
    // Parsers generated with automatic_ast and %Recover symbols implement this
    // to return factories indexed by ParseTable.getProsthesisIndex; absent
    // otherwise, in which case the backtracking parser keeps throwing.
    getProstheticAst?(): Array<ProstheticAst | null> | null;
};
export  class EscapeStrictPropertyInitializationRuleAction implements RuleAction {
    ruleAction(ruleNumber: number): void {
        throw new Error("Method not implemented.");
    }

};

