import { createContext, useContext, useState, ReactNode } from "react";

export type Module = "grammar" | "reading" | "writing";

interface ModuleContextType {
  currentModule: Module;
  setCurrentModule: (module: Module) => void;
  level: string;
  setLevel: (level: string) => void;
  isHeaderCollapsed: boolean;
  setIsHeaderCollapsed: (collapsed: boolean) => void;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleProvider = ({ children }: { children: ReactNode }) => {
  const [currentModule, setCurrentModule] = useState<Module>("grammar");
  const [level, setLevel] = useState("A1");
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

  return (
    <ModuleContext.Provider value={{ 
      currentModule, 
      setCurrentModule, 
      level, 
      setLevel,
      isHeaderCollapsed,
      setIsHeaderCollapsed
    }}>
      {children}
    </ModuleContext.Provider>
  );
};

export const useModule = () => {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error("useModule must be used within a ModuleProvider");
  }
  return context;
};