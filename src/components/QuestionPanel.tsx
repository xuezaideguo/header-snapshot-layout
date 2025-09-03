import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const QuestionPanel = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState("A1");
  const [selectedType, setSelectedType] = useState("语法");
  const { t } = useLanguage();

  const examLevels = [
    { id: "A1", label: t("a1") },
    { id: "A2", label: t("a2") },
    { id: "B1", label: t("b1") },
    { id: "B2", label: t("b2") },
    { id: "C1", label: t("c1") },
    { id: "C2", label: t("c2") },
  ];

  const exerciseTypes = [
    { id: "grammar", label: "语法" },
    { id: "reading", label: "阅读" },
    { id: "writing", label: "写作" },
  ];

  const handleLevelAndTypeChange = (level: string, type: string) => {
    setSelectedLevel(level);
    setSelectedType(type);
  };

  const question = {
    text: "Wählen Sie die richtige Antwort:",
    prompt: "Ich _____ heute ins Kino gehen.",
    options: [
      { id: "a", text: "möchte" },
      { id: "b", text: "möchten" },
      { id: "c", text: "möchtet" },
      { id: "d", text: "möchtest" }
    ]
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t("question")} - {selectedLevel} - {selectedType}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                {t("examLevel")}
              </div>
              <DropdownMenuSeparator />
              {examLevels.map((level) => (
                <DropdownMenuSub key={level.id}>
                  <DropdownMenuSubTrigger>
                    <span className={selectedLevel === level.id ? "font-medium" : ""}>
                      {level.label}
                    </span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {exerciseTypes.map((type) => (
                      <DropdownMenuItem
                        key={type.id}
                        onClick={() => handleLevelAndTypeChange(level.id, type.label)}
                        className={selectedLevel === level.id && selectedType === type.label ? "bg-accent" : ""}
                      >
                        {type.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{question.text}</p>
          <p className="font-medium text-foreground">{question.prompt}</p>
        </div>
        
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="cursor-pointer">
                {option.id.toUpperCase()}. {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Button className="w-full" disabled={!selectedAnswer}>
          提交答案
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuestionPanel;