export interface Message {
  role: string;
  text: string;
}

export interface LanguageSwitcherProps {
  languages: string[];
  handleLanguage: (language: string) => string;
}

export interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElemen>) => void;
  onSend: () => void;
  loading: boolean;
}
