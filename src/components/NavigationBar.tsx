import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Menu, BookOpen, PenTool, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useModule } from "@/contexts/ModuleContext";
import { type Module } from "@/contexts/ModuleContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavigationBar = () => {
  const { t } = useLanguage();
  const { 
    currentModule, 
    setCurrentModule, 
    level, 
    setLevel,
    isHeaderCollapsed,
    setIsHeaderCollapsed
  } = useModule();

  const examLevels = [
    { id: "A1", label: t("a1") },
    { id: "A2", label: t("a2") },
    { id: "B1", label: t("b1") },
    { id: "B2", label: t("b2") },
    { id: "C1", label: t("c1") },
    { id: "C2", label: t("c2") },
  ];

  const modules = [
    { id: "grammar" as Module, label: "语法", icon: BookOpen },
    { id: "reading" as Module, label: "阅读", icon: FileText },
    { id: "writing" as Module, label: "写作", icon: PenTool },
  ];

  return (
    <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        {/* Level Selection Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8">
              <Menu className="h-4 w-4 mr-2" />
              {level}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {examLevels.map((examLevel) => (
              <DropdownMenuItem
                key={examLevel.id}
                onClick={() => setLevel(examLevel.id)}
                className={level === examLevel.id ? "bg-accent" : ""}
              >
                {examLevel.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Current Level Display */}
        <span className="text-sm font-medium text-muted-foreground">
          {examLevels.find(l => l.id === level)?.label}
        </span>

        {/* Module Buttons */}
        <div className="flex space-x-1">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Button
                key={module.id}
                variant={currentModule === module.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentModule(module.id)}
                className="h-8"
              >
                <Icon className="h-4 w-4 mr-2" />
                {module.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
        className="h-8"
      >
        {isHeaderCollapsed ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronUp className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default NavigationBar;