[
  (message_definition)
  (enum_definition)
  (interface_definition)
	(option_block)
	(value_object)
	(value_array)
	(option_definition)
	(oneof_block)
] @indent.begin

"}" @indent.branch

(message_definition "(" @indent.begin)
(import_definition "(" @indent.begin)
(interface_definition "(" @indent.begin)
(enum_definition "(" @indent.begin)

(message_definition ")" @indent.branch)
(import_definition ")" @indent.branch)
(interface_definition ")" @indent.branch)
(enum_definition ")" @indent.branch)

[
  "}"
  ")"
	"]"
] @indent.end
