export type InstructionKind =
	| "li"
	| "la"
	| "syscall"
	| "move"
	| "jal"
	| "beq"
	| "sub"
	| "add"
	| "jr"
	| "addi"
	| "andi"
	| "j"
	| "sw"
	| "lw";

export type Type = "Asciiz";

export type ValueKind = "string";

export interface Program {
	dataSection: DataSection;
	textSection: TextSection;
}

export interface DataSection {
	variables: Variable[];
}

export interface TextSection {
	statements: Statement[];
	entrypoint: string;
}

export interface Variable {
	name: string;
	type: Type;
	value: Value;
}

export type Statement =
	| { kind: "instruction"; value: Instruction }
	| { kind: "label"; value: string };

export type Instruction = {
	kind: InstructionKind;
	args: InstructionArgument[];
};

export type InstructionArgument =
	| { kind: "register"; value: Register }
	| { kind: "immediate"; value: number }
	| { kind: "label"; value: string }
	| { kind: "literal"; value: string };

export interface Register {
	name: string;
}

export type Operand =
	| { kind: "immediate"; value: number }
	| { kind: "register"; value: Register }
	| { kind: "label"; value: string };

export type Value = { kind: "string"; value: string };
