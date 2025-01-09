; queries/highlights.scm

["interface" "message" "enum"] @keyword.type
"import" @keyword.import
["embed" "stream"] @keyword
["list" "map"] @type

; import
(import_definition alias: (_) @module)

; message
(message_definition name: (identifier) @type)
(field_definition name: (identifier) @variable.member)
(field_type name: (_) @type)
(field_tag) @tag
(embed_definition name: (_) @type)
(embed_definition prefix: (_) @module)

; enum
(enum_definition name: (identifier) @type)
(enum_value) @tag

; interface
(interface_definition name: (identifier) @type)
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
