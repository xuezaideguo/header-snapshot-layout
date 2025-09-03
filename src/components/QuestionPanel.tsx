import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const QuestionPanel = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

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
      <CardHeader>
        <CardTitle className="text-lg">题目</CardTitle>
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