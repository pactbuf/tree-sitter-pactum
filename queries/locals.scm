; interface
(interface_definition name: (identifier) @local.definition.type)
(func_definition name: (identifier) @local.definition.function)

; enum
(enum_definition name: (identifier) @local.definition.enum)

; message
(message_definition name: (identifier) @local.definition.type)
(field_definition name: (identifier) @local.definition.field)

; import
(import_definition alias: (identifier) @local.definition.namespace)

; Scopes
(message_definition) @local.scope
(interface_definition) @local.scope
(enum_definition) @local.scope
