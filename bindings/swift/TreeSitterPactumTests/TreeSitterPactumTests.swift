import XCTest
import SwiftTreeSitter
import TreeSitterPactum

final class TreeSitterPactumTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_pactum())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Pactum grammar")
    }
}
