import { createContext, useContext, useState, ReactNode } from "react";

type Language = "zh" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  zh: {
    title: "德语考试练习",
    becomeMember: "成为会员",
    language: "语言",
    login: "登录",
    question: "题目",
    practice: "练习",
    evaluation: "评估",
    simple: "简单版",
    difficult: "困难版",
    examLevel: "考试等级",
    a1: "A1 - 初学者",
    a2: "A2 - 基础",
    b1: "B1 - 中级",
    b2: "B2 - 中高级",
    c1: "C1 - 高级",
    c2: "C2 - 精通",
  },
  en: {
    title: "German Exam Practice",
    becomeMember: "Become Member",
    language: "Language",
    login: "Login",
    question: "Question",
    practice: "Practice",
    evaluation: "Evaluation",
    simple: "Simple",
    difficult: "Difficult",
    examLevel: "Exam Level",
    a1: "A1 - Beginner",
    a2: "A2 - Elementary",
    b1: "B1 - Intermediate",
    b2: "B2 - Upper Intermediate",
    c1: "C1 - Advanced",
    c2: "C2 - Proficient",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("zh");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["zh"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};