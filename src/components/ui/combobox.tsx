"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
	items: { label: string; value: string | number }[];
	entity: string;
	translatedEntity: string;
	placeholder?: string;
	emptyMessage?: string;
	onChange?: (value: string) => void;
	value: string | number;
	setValue?: React.Dispatch<React.SetStateAction<string>>;
	className?: string;
}

export function Combobox({
	items,
	placeholder,
	translatedEntity,
	onChange,
	value,
	setValue,
	className,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn("max-w-max min-w-[200px] justify-between", className)}
				>
					{value
						? items.find((item) => item.value === value)?.label
						: placeholder}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="p-0">
				<Command>
					<CommandInput
						placeholder={`Pesquisar ${translatedEntity}`}
						className="h-9"
					/>
					<CommandList>
						<CommandEmpty>Nenhum ${translatedEntity} encontrado</CommandEmpty>

						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value.toString()}
									onSelect={(currentValue) => {
										setOpen(false);
										setValue?.(currentValue === value ? "" : currentValue);
										onChange?.(currentValue);
									}}
								>
									{item.label}
									<Check
										className={cn(
											"ml-auto",
											value === item.value ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
