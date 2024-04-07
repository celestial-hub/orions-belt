import {
	InstructionKind,
	OperandKind,
	StatementKind,
	Type,
	ValueKind,
} from "./ast-definitions";

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
	type_: Type;
	value: Value;
}

export type Statement =
	| { kind: StatementKind.Instruction; value: Instruction }
	| { kind: StatementKind.Label; value: string };

export type Instruction = {
	kind: InstructionKind;
	args: InstructionArgument[];
};

export type InstructionArgument =
	| { kind: "Register"; value: Register }
	| { kind: "Immediate"; value: number }
	| { kind: "Label"; value: string }
	| { kind: "Literal"; value: string };

export interface Register {
	name: string;
}

export type Operand =
	| { kind: OperandKind.Immediate; value: number }
	| { kind: OperandKind.Register; value: Register }
	| { kind: OperandKind.Label; value: string };

export type Value = { kind: ValueKind.String; value: string };
