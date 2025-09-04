import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useModule } from "@/contexts/ModuleContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const GrammarModule = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();
  const { level } = useModule();

  const question = {
    text: "Wählen Sie die richtige Antwort:",
    prompt: "Ich _____ heute ins Kino gehen.",
    options: [
      { id: "a", text: "möchte", correct: true },
      { id: "b", text: "möchten", correct: false },
      { id: "c", text: "möchtet", correct: false },
      { id: "d", text: "möchtest", correct: false }
    ],
    explanation: "'möchte' ist die richtige Form für die erste Person Singular (ich) des Modalverbs 'mögen' im Konjunktiv II."
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getAnswerStatus = (optionId: string) => {
    if (!submitted) return "default";
    const option = question.options.find(opt => opt.id === optionId);
    if (option?.correct) return "success";
    if (selectedAnswer === optionId && !option?.correct) return "error";
    return "muted";
  };

  return (
    <div className="h-full flex space-x-4">
      {/* Question Panel */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-lg">
            {t("question")} - {level} - 语法
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{question.text}</p>
            <p className="font-medium text-foreground">{question.prompt}</p>
          </div>
          
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} disabled={submitted} />
                <Label 
                  htmlFor={option.id} 
                  className={`cursor-pointer flex-1 ${
                    submitted 
                      ? getAnswerStatus(option.id) === 'success' 
                        ? 'text-success font-medium'
                        : getAnswerStatus(option.id) === 'error'
                        ? 'text-error'
                        : 'text-muted-foreground'
                      : ''
                  }`}
                >
                  {option.id.toUpperCase()}. {option.text}
                  {submitted && option.correct && (
                    <Badge variant="secondary" className="ml-2 bg-success-light text-success-foreground">
                      ✓ 正确
                    </Badge>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button 
            className="w-full" 
            disabled={!selectedAnswer || submitted}
            onClick={handleSubmit}
          >
            {submitted ? "已提交" : "提交答案"}
          </Button>
        </CardContent>
      </Card>

      {/* Evaluation Panel */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-lg">
            {t("evaluation")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {!submitted ? (
              <div className="text-center text-muted-foreground py-8">
                请先回答问题
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">结果:</span>
                  <Badge 
                    variant={
                      question.options.find(opt => opt.id === selectedAnswer)?.correct 
                        ? "secondary" 
                        : "destructive"
                    }
                    className={
                      question.options.find(opt => opt.id === selectedAnswer)?.correct
                        ? "bg-success-light text-success-foreground"
                        : ""
                    }
                  >
                    {question.options.find(opt => opt.id === selectedAnswer)?.correct 
                      ? "正确" 
                      : "错误"
                    }
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">正确答案:</h4>
                  <p className="text-sm text-foreground">
                    {question.options.find(opt => opt.correct)?.id.toUpperCase()}. {question.options.find(opt => opt.correct)?.text}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">解释:</h4>
                  <p className="text-sm text-muted-foreground">
                    {question.explanation}
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => {
                    setSelectedAnswer("");
                    setSubmitted(false);
                  }}
                >
                  下一题
                </Button>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrammarModule;