/**
 * Shared packed parse forest node.
 *
 * Symbol nodes are keyed by (grammarSymbol, leftExtent, rightExtent)
 * and hold one or more Packed alternatives. Terminal / epsilon leaves
 * may appear as symbol nodes with a single pack and no children.
 */
export class SppfNode {
    /** Packed alternative under a symbol node. */
    public static Packed = class Packed {
        readonly rule: number;
        readonly children: SppfNode[];
        readonly semantic: any;

        constructor(rule: number, children: SppfNode[] | null, semantic: any) {
            this.rule = rule;
            this.children = children == null ? [] : children;
            this.semantic = semantic;
        }

        public getRule(): number { return this.rule; }

        public getChildren(): SppfNode[] {
            let out: SppfNode[] = [];
            for (let c of this.children) {
                if (c != null)
                    out.push(c);
            }
            return out;
        }

        public getSemantic(): any { return this.semantic; }
    };

    readonly grammarSymbol: number;
    readonly leftExtent: number;
    readonly rightExtent: number;
    readonly packs: InstanceType<typeof SppfNode.Packed>[] = [];
    /** Canonical IAst forest projection (nextAst chain). */
    astForest: any;

    constructor(grammarSymbol: number, leftExtent: number, rightExtent: number) {
        this.grammarSymbol = grammarSymbol;
        this.leftExtent = leftExtent;
        this.rightExtent = rightExtent;
    }

    public getGrammarSymbol(): number { return this.grammarSymbol; }

    public getLeftExtent(): number { return this.leftExtent; }

    public getRightExtent(): number { return this.rightExtent; }

    public getPacks(): ReadonlyArray<InstanceType<typeof SppfNode.Packed>> {
        return this.packs;
    }

    public getAstForest(): any { return this.astForest; }
}
;
