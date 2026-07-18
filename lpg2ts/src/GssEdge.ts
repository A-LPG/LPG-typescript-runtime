import type { GssNode } from "./GssNode";
import type { SppfNode } from "./SppfNode";

/**
 * GSS edge from a successor node down to a predecessor, labeled with
 * the grammar symbol, left extent, semantic value, and optional SPPF node
 * recognized along that step.
 */
export class GssEdge {
    readonly predecessor: GssNode;
    readonly symbol: number;
    readonly location: number;
    readonly semantic: any;
    readonly sppf: SppfNode | null;

    constructor(predecessor: GssNode, symbol: number, location: number, semantic: any, sppf: SppfNode | null) {
        this.predecessor = predecessor;
        this.symbol = symbol;
        this.location = location;
        this.semantic = semantic;
        this.sppf = sppf;
    }

    public getPredecessor(): GssNode { return this.predecessor; }

    public getSymbol(): number { return this.symbol; }

    public getLocation(): number { return this.location; }

    public getSemantic(): any { return this.semantic; }

    public getSppf(): SppfNode | null { return this.sppf; }
}
;
