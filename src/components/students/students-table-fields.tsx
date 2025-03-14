import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export type StudentsTableItem = {
	id: string;
	name: string;
	registration: string;
	course: string;
	grade: number;
	ira: number;
	final_grade: number;
	scholarshipType: string;
	period: string;
};

export const studentsTableFields: ColumnDef<StudentsTableItem>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Nome
				<ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => (
			<div className="capitalize font-semibold">{row.getValue("name")}</div>
		),
	},
	{
		accessorKey: "registration",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Matrícula
				<ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => (
			<div className="font-medium">{row.getValue("registration")}</div>
		),
	},
	{
		accessorKey: "course",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Curso
				<ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => (
			<Badge className="rounded-full text-foreground shadow-none bg-muted hover:bg-muted font-semibold
			">
				{row.getValue("course")}
			</Badge>
		),
	},
	{
		accessorKey: "grade",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Nota
				<ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => {
			const grade = parseFloat(row.getValue("grade"));
			return <div className="font-medium">{grade.toFixed(1)}</div>;
		},
	},
	{
		accessorKey: "ira",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				IRA
				<ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => {
			const ira = parseFloat(row.getValue("ira"));
			return <div className="font-medium">{ira.toFixed(4)}</div>;
		},
	},
	{
		accessorKey: "final_grade",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Nota Final
				<ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => {
			const finalGrade = parseFloat(row.getValue("final_grade"));
			return <div className="font-medium">{finalGrade.toFixed(4)}</div>;
		},
	},
	{
		accessorKey: "scholarshipType",
		header: "Tipo de Bolsa",
		cell: ({ row }) => (
			<Badge
				className={`rounded-full shadow-none ${
					row.getValue("scholarshipType") === "Bolsista"
						? "bg-green-50 text-green-700"
						: row.getValue("scholarshipType") === "Não Remunerado"
						? "bg-red-50 text-red-700"
						: "bg-yellow-50 text-yellow-700"
				}`}
			>
				<span className="capitalize">{row.getValue("scholarshipType")}</span>
			</Badge>
		),
	},
	{
		accessorKey: "period",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Período
				<ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => (
			<div className="font-medium">{row.getValue("period")}</div>
		),
	},
];
