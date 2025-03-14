/**
 * Translates column keys from the StudentsTable into human-readable Portuguese labels.
 * @param key - The column key to translate
 * @returns The translated column name in Portuguese
 */
export function translateStudentsTableKeys(key: string): string {
	const translations: Record<string, string> = {
		name: "Nome",
		registration: "Matrícula",
		course: "Curso",
		grade: "Nota",
		ira: "IRA",
		final_grade: "Nota Final",
		scholarshipType: "Tipo de Bolsa",
		period: "Período",
		actions: "Ações",
		select: "Selecionar",
	};
	return translations[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

export default translateStudentsTableKeys;
