; interface
(interface_spec name: (identifier) @local.definition.type)
(func_definition name: (identifier) @local.definition.function)

; enum
(enum_spec name: (identifier) @local.definition.enum)

; const
(const_spec name: (identifier) @local.definition.type)

; message
(message_spec name: (identifier) @local.definition.type)
(field_definition name: (identifier) @local.definition.field)

; import
(import_spec alias: (identifier) @local.definition.namespace)

; Scopes
(message_spec) @local.scope
(interface_spec) @local.scope
(enum_spec) @local.scope
