package tree_sitter_pactum_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_pactum "github.com/pactum/pactum.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_pactum.Language())
	if language == nil {
		t.Errorf("Error loading Pactum grammar")
	}
}
