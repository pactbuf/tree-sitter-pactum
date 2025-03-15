; interface
(interface_definition name: (identifier) @local.definition.type)
(func_definition name: (identifier) @local.definition.function)

; enum
(enum_definition name: (identifier) @local.definition.enum)

; const
(const_definition name: (identifier) @local.definition.type)

; message
(message_spec name: (identifier) @local.definition.type)
(field_definition name: (identifier) @local.definition.field)

; import
(import_definition alias: (identifier) @local.definition.namespace)

; Scopes
(message_spec) @local.scope
(interface_definition) @local.scope
(enum_definition) @local.scope
