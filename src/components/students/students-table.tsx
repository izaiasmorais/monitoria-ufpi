"use client";
import * as React from "react";
import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { studentsTableFields } from "./students-table-fields";
import { translateStudentsTableKeys } from "@/utils/translate-students-table-keys";
import { SearchInput } from "@/components/ui/search-input";
import { Combobox } from "@/components/ui/combobox";
import { students } from "@/mocks/students";
import { courses } from "@/mocks/courses";
import { scholarshipTypes } from "@/mocks/scholarship-types";
import { periods } from "@/mocks/period";

const paginationSize = [
	{
		value: 5,
		label: "5",
	},
	{
		value: 10,
		label: "10",
	},
	{
		value: 15,
		label: "15",
	},
];

export function StudentsTable() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [period, setPeriod] = React.useState<string>("");
	const [course, setCourse] = React.useState<string>("");
	const [scholarshipType, setScholarshipType] = React.useState<string>("");
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 15,
	});

	const table = useReactTable({
		data: students,
		columns: studentsTableFields,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: setPagination,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination,
		},
	});

	return (
		<div className="w-full space-y-4">
			<div className="flex items-center gap-4 flex-wrap">
				<SearchInput
					className="lg:w-[400px]"
					placeholder="Pesquisar alunos..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
				/>

				<Combobox
					items={courses}
					entity="course"
					translatedEntity="Curso"
					placeholder="Filtrar por curso..."
					onChange={(value: string) =>
						table.getColumn("course")?.setFilterValue(value)
					}
					value={course}
					setValue={setCourse}
				/>

				<Combobox
					items={scholarshipTypes}
					entity="scholarshipType"
					translatedEntity="Tipo de Bolsa"
					placeholder="Filtrar por tipo de bolsa..."
					onChange={(value: string) =>
						table.getColumn("scholarshipType")?.setFilterValue(value)
					}
					value={scholarshipType}
					setValue={setScholarshipType}
				/>

				<Combobox
					items={periods}
					entity="period"
					translatedEntity="Período"
					placeholder="Filtrar por período..."
					onChange={(value: string) =>
						table.getColumn("period")?.setFilterValue(value)
					}
					value={period}
					setValue={setPeriod}
				/>

				<Button
					variant="outline"
					className="font-semibold"
					onClick={() => [
						table.resetSorting(),
						table.resetColumnFilters(),
						setCourse(""),
						setScholarshipType(""),
						setPeriod(""),
					]}
				>
					<X />
					Limpar Filtros
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="font-semibold ml-auto">
							<div className="flex items-center gap-2">
								Colunas <ChevronDown />
							</div>
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{translateStudentsTableKeys(column.id)}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div>
				<Table>
					<TableHeader className="bg-slate-50">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="border-none">
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="border-none"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="py-3">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={studentsTableFields.length}
									className="h-24 text-center"
								>
									Sem resultados
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between space-x-2">
				<div className="flex items-center gap-2">
					<span className="text-sm">Itens por página: </span>

					<Combobox
						className="w-[100px]"
						items={paginationSize}
						entity="itemsPerPage"
						translatedEntity="Items por página"
						placeholder="Items por página"
						value={pagination.pageSize}
						onChange={(value: string) =>
							table.setPagination({
								pageIndex: 0,
								pageSize: parseInt(value),
							})
						}
					/>
				</div>

				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Anterior
					</Button>

					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Próximo
					</Button>
				</div>
			</div>
		</div>
	);
}
