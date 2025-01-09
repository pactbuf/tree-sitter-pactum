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

(message_definition ")" @indent.branch)

[
  "}"
  ")"
	"]"
] @indent.end
