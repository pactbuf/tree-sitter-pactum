/**
 * @file Pactum parses pact files
 * @author Peyman Mortazavi <pey.mortazavi@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
	name: "pactum",
	extras: ($) => [$.comment, /\s/],

	rules: {
		source_file: ($) => seq(optional($.pact_definition), repeat($._definition)),
		_definition: ($) =>
			choice(
				$.import_declaration,
				$.module_option_definition,
				$.message_declaration,
				$.interface_declaration,
				$.enum_declaration,
				$.option_declaration,
				$.const_definition,
			),
		identifier: (_) =>
			/(?:[a-zA-Z_][a-zA-Z0-9_]*)|(?:[`][a-zA-Z_][a-zA-Z0-9_]*[`])/,

		pact_definition: ($) => seq("pact", field("package", $.selector)),

		import_declaration: ($) =>
			seq("import", choice($.import_spec, $.import_group)),
		import_group: ($) => seq("(", repeat($.import_spec), ")"),
		import_spec: ($) =>
			seq(
				optional(field("alias", choice($.no_prefix_keyword, $.identifier))),
				field("path", $.import_path),
			),
		import_path: ($) => alias($.string, "import_path"),
		no_prefix_keyword: (_) => "_",

		module_option_definition: ($) =>
			seq(choice("#", "r#", "s#"), choice($.option_block, $.option_node)),
		value: ($) =>
			choice(
				$.string,
				$.integer,
				$.float,
				"true",
				"false",
				$.value_array,
				$.value_object,
			),
		value_array: ($) => seq("[", repeat(seq($.value, optional(","))), "]"),
		value_object: ($) =>
			seq("{", repeat(seq($.string, "=", $.value, optional(","))), "}"),
		option_block: ($) =>
			seq(
				"{",
				repeat(seq(optional(choice("r#", "s#")), $.option_node, optional(","))),
				"}",
			),
		option_node: ($) =>
			seq(
				$._option_selector,
				optional(choice(seq("=", $.value), $.option_block)),
			),
		_line_option_node: ($) => seq(choice("#", "r#", "s#"), $.option_node),
		_line_option_block: ($) => seq(choice("#", "r#", "s#"), $.option_block),
		_option_selector: ($) => seq(choice($.option_key_literal, $.option_key)),
		option_key: ($) => alias($.selector, "option_key"),
		option_key_literal: ($) => alias($.string, "option_key_literal"),

		const_definition: ($) => seq("const", choice($.const_spec, $.const_group)),
		const_group: ($) => seq("(", repeat($.const_spec), ")"),
		const_spec: ($) =>
			seq(field("name", $.identifier), "=", $.value, optional($.option_block)),

		message_declaration: ($) =>
			seq("message", choice($.message_spec, $.message_group)),
		message_group: ($) => seq("(", repeat($.message_spec), ")"),
		message_body: ($) =>
			seq(
				"{",
				repeat(
					prec.left(
						2,
						choice(
							seq($._line_option_node, optional(",")),
							seq($._line_option_block, optional(",")),
							$.embed_definition,
							seq(
								$.field_definition,
								choice(
									seq($.option_block, optional(",")),
									seq(repeat($._line_option_node), ","),
								),
							),
						),
					),
				),
				prec.left(
					1,
					optional(
						seq(
							$.field_definition,
							choice($.option_block, repeat($._line_option_node)),
							optional(","),
						),
					),
				),
				"}",
			),
		message_spec: ($) => seq(field("name", $.identifier), $.message_body),

		enum_declaration: ($) => seq("enum", choice($.enum_spec, $.enum_group)),
		enum_group: ($) => seq("(", repeat($.enum_spec), ")"),
		enum_body: ($) =>
			seq(
				"{",
				repeat(
					prec.left(
						1,
						choice(
							seq($._line_option_node, optional(",")),
							seq($._line_option_block, optional(",")),
							seq(
								$.enum_value,
								choice(
									seq($.option_block, optional(",")),
									seq(repeat($._line_option_node), ","),
								),
							),
						),
					),
				),
				prec.left(
					2,
					optional(
						seq(
							$.enum_value,
							choice($.option_block, seq(repeat($._line_option_node))),
							optional(","),
						),
					),
				),
				"}",
			),
		enum_spec: ($) => seq(field("name", $.identifier), $.enum_body),
		enum_value: (_) =>
			seq(field("name", /[A-Z]\w*/), optional(seq("=", field("tag", /\d+/)))),

		oneof_block: ($) =>
			seq(
				"{",
				repeat(
					prec.left(
						2,
						choice(
							seq($._line_option_node, optional(",")),
							seq($._line_option_block, optional(",")),
							seq(
								$.field_definition,
								choice(
									seq($.option_block, optional(",")),
									seq(repeat($._line_option_node), ","),
								),
							),
						),
					),
				),
				prec.left(
					1,
					optional(
						seq(
							$.field_definition,
							choice($.option_block, repeat($._line_option_node)),
							optional(","),
						),
					),
				),
				"}",
			),

		interface_declaration: ($) =>
			seq("interface", choice($.interface_spec, $.interface_group)),
		interface_group: ($) => seq("(", repeat($.interface_spec), ")"),
		interface_body: ($) =>
			seq(
				"{",
				repeat(
					choice(
						seq($._line_option_node, optional(",")),
						seq($._line_option_block, optional(",")),
						seq(
							$.func_definition,
							choice(
								seq($.option_block, optional(";")),
								seq(repeat($._line_option_node), ";"),
							),
						),
					),
				),
				"}",
			),
		interface_spec: ($) => seq(field("name", $.identifier), $.interface_body),
		func_param: ($) => seq(optional("stream"), field("type", $.identifier)),
		_interface_func_return: ($) =>
			seq("->", choice(seq("(", $.func_param, ")"), $.func_param)),
		func_definition: ($) =>
			seq(
				field("name", $.identifier),
				"(",
				field("input", optional($.func_param)),
				")",
				optional($._interface_func_return),
			),
		_list_type_definition: ($) => seq("list", "<", $._type_selector, ">"),
		_map_type_definition: ($) =>
			seq("map", "<", $._type_selector, ",", $._type_selector, ">"),
		_oneof_type_definition: ($) => seq("oneof", $.oneof_block),
		field_definition: ($) =>
			choice(
				seq(
					field("name", $.identifier),
					":",
					field("type", $.field_type),
					optional(seq("=", $.field_tag)),
				),
				seq("oneof", field("name", $.identifier), $.oneof_block),
			),
		field_tag: (_) => /[1-9]\d*/,
		field_type: ($) =>
			choice(
				$._type_selector,
				$._list_type_definition,
				$._map_type_definition,
				$._oneof_type_definition,
			),
		embed_definition: ($) => seq("embed", $._type_selector, optional(",")),

		option_target: (_) =>
			choice(
				"Message",
				"Func",
				"Enum",
				"EnumValue",
				"Field",
				"Document",
				"Interface",
				"OneOf",
			),
		option_declaration_body: ($) =>
			seq(
				"{",
				optional(
					seq(
						$.field_definition,
						repeat(seq(",", $.field_definition)),
						optional(","),
					),
				),
				"}",
			),
		option_declaration: ($) =>
			seq(
				"option",
				"for",
				$.option_target,
				repeat(seq(",", $.option_target)),
				$.option_declaration_body,
			),

		comment: (_) =>
			choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),

		selector: ($) => seq($.identifier, repeat(seq(".", $.identifier))),
		_type_selector: ($) =>
			seq(
				optional(seq(field("prefix", $.identifier), ".")),
				field("name", $.identifier),
			),
		string: (_) => choice(/\"(\\.|[^"\\])*\"/, /\'(\\.|[^"\\])*\'/),
		integer: (_) => /[-]?\d+/,
		float: (_) => /[-]?\d+[.]\d+/,
	},
});
