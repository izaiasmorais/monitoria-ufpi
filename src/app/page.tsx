import { StudentsTable } from "@/components/students/students-table";

export default function Home() {
	return (
		<div className="w-full h-screen flex p-6">
			<StudentsTable />
		</div>
	);
}
