/**
 * Contract test for token-stream incremental reset (mirrors C++ incremental_prs_stream_tests).
 * Token-level damage reset — not tree-sitter subtree reuse.
 */
const assert = require("assert");
const { LexStream } = require("../../dist/LexStream");
const { PrsStream } = require("../../dist/PrsStream");

class StubLex extends LexStream {
    constructor(text) {
        super("incremental-test", text);
    }
    orderedExportedSymbols() {
        return [];
    }
}

function testIncrementalResetTruncatesSuffix() {
    const lex = new StubLex("0123456789");
    const stream = new PrsStream(lex);
    for (let i = 0; i < 10; i++) {
        stream.makeToken(i, i, 1);
    }
    stream.makeToken(10, 10, 2);
    stream.setStreamLength(stream.getSize());

    const before = stream.getSize();
    assert.ok(before >= 11);

    const affected = stream.incrementalResetAtCharacterOffset(5);
    assert.ok(affected.length >= 1);
    assert.ok(stream.getSize() < before);
    for (let i = 1; i < stream.getSize(); i++) {
        assert.ok(stream.getStartOffset(i) <= 5);
    }
}

function testResetAtTokenBoundary() {
    const lex = new StubLex("abcd");
    const stream = new PrsStream(lex);
    stream.makeToken(0, 0, 1);
    stream.makeToken(1, 1, 1);
    stream.makeToken(2, 2, 1);
    stream.makeToken(3, 3, 1);
    stream.makeToken(4, 4, 2);
    stream.setStreamLength(stream.getSize());

    const before = stream.getSize();
    stream.incrementalResetAtCharacterOffset(2);
    assert.ok(stream.getSize() < before);
    assert.ok(stream.getSize() >= 2);
}

testIncrementalResetTruncatesSuffix();
testResetAtTokenBoundary();
console.log("incremental_prs_stream: ok");
