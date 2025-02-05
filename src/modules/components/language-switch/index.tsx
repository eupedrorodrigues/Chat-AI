"use client";
import { useState } from "react";
import { Globe, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface LanguageSwitcherProps {
  languages: string[];
  handleLanguage: (language: string) => string;
}

const LanguageSwitcher = ({
  languages,
  handleLanguage,
}: LanguageSwitcherProps) => {
  const t = useTranslations();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeLanguage = (language: string) => {
    const newPath = handleLanguage(language);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <nav>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-muted-foreground flex h-9 w-full items-center justify-start rounded-lg px-4 transition-colors hover:bg-transparent md:h-8"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Globe />
              {isOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">{t("language")}</TooltipContent>
        </Tooltip>
        {isOpen && (
          <ul className="mt-2 bg-white shadow-lg rounded-lg">
            {languages.map((language) => (
              <li
                key={language}
                className="hover:text-foreground hover:bg-accent mx-2 flex h-9 cursor-pointer items-center justify-center rounded-lg px-4 py-2 transition-all md:h-8"
                onClick={() => handleChangeLanguage(language)}
              >
                <span className="w-full text-sm">{language}</span>
              </li>
            ))}
          </ul>
        )}
      </TooltipProvider>
    </nav>
  );
};

export default LanguageSwitcher;
