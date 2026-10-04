import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

type LanguageProps = {
  languages: string[] | undefined;

};

export default function Dropdown({ languages }: LanguageProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-xs hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800">
          Languages
          <ChevronDownIcon aria-hidden="true" className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-44 rounded-lg border border-zinc-200 bg-white p-1 text-zinc-950 shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        >
          {languages?.map((language) => (
            <DropdownMenuItem
              key={language}
              className="rounded-md px-3 py-2 text-sm data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-800"
            >
              {language}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
