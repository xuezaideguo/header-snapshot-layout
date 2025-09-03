import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const QuestionPanel = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isLevelMenuOpen, setIsLevelMenuOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("A1");
  const { t } = useLanguage();

  const examLevels = [
    { id: "A1", label: t("a1") },
    { id: "A2", label: t("a2") },
    { id: "B1", label: t("b1") },
    { id: "B2", label: t("b2") },
    { id: "C1", label: t("c1") },
    { id: "C2", label: t("c2") },
  ];

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
        <div className="flex items-center space-x-2">
          <Collapsible open={isLevelMenuOpen} onOpenChange={setIsLevelMenuOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                {isLevelMenuOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CardTitle className="text-lg">{t("question")} - {selectedLevel}</CardTitle>
            <CollapsibleContent className="absolute z-10 mt-2 bg-card border border-border rounded-md shadow-lg">
              <div className="p-2 space-y-1">
                <div className="text-sm font-medium text-muted-foreground px-2 py-1">
                  {t("examLevel")}
                </div>
                {examLevels.map((level) => (
                  <Button
                    key={level.id}
                    variant={selectedLevel === level.id ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedLevel(level.id);
                      setIsLevelMenuOpen(false);
                    }}
                  >
                    {level.label}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
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