; queries/highlights.scm

["interface" "message" "enum"] @keyword.type
"import" @keyword.import
["embed" "stream" "option" "for" "oneof" "pact" "const"] @keyword
["list" "map"] @type.builtin

; pact
(pact_definition package:(_) @module)

; option
(option_target) @constant

; import
(import_spec alias: (_) @module)

; const
(const_definition name: (identifier) @type.definition)

; message
(message_spec name: (identifier) @type.definition)
(field_definition name: (identifier) @variable.member)
(field_type name: (_) @type)
(field_type prefix: (_) @module)
(field_tag) @tag
(embed_definition name: (_) @type)
(embed_definition prefix: (_) @module)

; enum
(enum_definition name: (identifier) @type)
(enum_value) @tag

; interface
(interface_spec name: (identifier) @type)
(func_definition name: (identifier) @function)
(func_param type: (identifier) @type)

["<" ">" "{" "}" "[" "]" "(" ")" ] @punctuation.bracket
["," ":" "="] @punctuation.delimiter

; options
(option_key) @attribute
(option_key_literal) @attribute

(import_path) @string.special.path
(string) @string
(integer) @number
(float) @number.float
[
 "true"
 "false"
] @constant.builtin

[
 "s#"
 "r#"
 "#"
 "->"
 ] @operator

; comments
(comment) @comment
((comment) @comment.documentation (#match? @comment.documentation "^///"))
((comment) @comment.documentation (#match? @comment.documentation "^/[*]{2}"))
