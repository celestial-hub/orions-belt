export enum StatementKind {
	Instruction = "instruction",
	Label = "label",
}

export enum InstructionKind {
	Li = "Li",
	La = "La",
	Syscall = "Syscall",
	Move = "Move",
	Jal = "Jal",
	Beq = "Beq",
	Sub = "Sub",
	Add = "Add",
	Jr = "Jr",
	Addi = "Addi",
	Andi = "Andi",
	J = "J",
	Sw = "Sw",
	Lw = "Lw",
}

export enum OperandKind {
	Immediate = "Immediate",
	Register = "Register",
	Label = "Label",
}

export enum Type {
	Asciiz = "Asciiz",
}

export enum ValueKind {
	String = "String",
}
