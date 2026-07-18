import type { GssEdge } from "./GssEdge";

/**
 * Graph-structured stack node: LR state at an input index.
 * Predecessor links are GssEdges carrying recognized symbols / SPPF labels.
 */
export class GssNode {
    readonly state: number;
    readonly index: number;
    readonly edges: GssEdge[] = [];

    constructor(state: number, index: number) {
        this.state = state;
        this.index = index;
    }

    public getState(): number { return this.state; }

    public getIndex(): number { return this.index; }

    public getEdges(): ReadonlyArray<GssEdge> {
        return this.edges;
    }
}
;
