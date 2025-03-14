import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
	title: "Monitoria",
	description: "Tabela completa para analisar os resultados das monitorias da UFPI",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="pt-br"
			className={GeistSans.className}
			suppressHydrationWarning={true}
		>
			<body className="antialised vsc-initialized" cz-shortcut-listen="true">
				{children}
			</body>
		</html>
	);
}
