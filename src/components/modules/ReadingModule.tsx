import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useModule } from "@/contexts/ModuleContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const ReadingModule = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { t } = useLanguage();
  const { level } = useModule();

  const readingText = `
**Die deutsche Sprache**

Die deutsche Sprache gehört zur Familie der germanischen Sprachen und wird von etwa 100 Millionen Menschen als Muttersprache gesprochen. Deutschland, Österreich und die Schweiz sind die wichtigsten deutschsprachigen Länder.

Deutsch hat eine komplexe Grammatik mit vier Fällen: Nominativ, Akkusativ, Dativ und Genitiv. Diese Fälle bestimmen die Endungen der Artikel, Adjektive und Substantive.

Die deutsche Sprache hat auch viele zusammengesetzte Wörter. Ein bekanntes Beispiel ist "Donaudampfschifffahrtsgesellschaftskapitän", was "Donau-Dampfschiff-Fahrt-Gesellschaft-Kapitän" bedeutet.
  `;

  const questions = [
    {
      id: 1,
      question: "Wie viele Menschen sprechen Deutsch als Muttersprache?",
      options: [
        { id: "a", text: "50 Millionen", correct: false },
        { id: "b", text: "100 Millionen", correct: true },
        { id: "c", text: "150 Millionen", correct: false },
        { id: "d", text: "200 Millionen", correct: false }
      ],
      explanation: "Laut dem Text sprechen etwa 100 Millionen Menschen Deutsch als Muttersprache.",
      highlightSentence: "wird von etwa 100 Millionen Menschen als Muttersprache gesprochen"
    },
    {
      id: 2,
      question: "Wie viele Fälle hat die deutsche Grammatik?",
      options: [
        { id: "a", text: "Drei", correct: false },
        { id: "b", text: "Vier", correct: true },
        { id: "c", text: "Fünf", correct: false },
        { id: "d", text: "Sechs", correct: false }
      ],
      explanation: "Der Text erwähnt vier Fälle: Nominativ, Akkusativ, Dativ und Genitiv.",
      highlightSentence: "Deutsch hat eine komplexe Grammatik mit vier Fällen: Nominativ, Akkusativ, Dativ und Genitiv"
    }
  ];

  const currentQ = questions[currentQuestion];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setSubmitted(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer("");
      setSubmitted(false);
    }
  };

  const getHighlightedText = () => {
    if (!submitted || !currentQ.highlightSentence) return readingText;
    
    const isCorrect = currentQ.options.find(opt => opt.id === selectedAnswer)?.correct;
    const highlightClass = isCorrect ? 'bg-success-light' : 'bg-error-light';
    
    return readingText.replace(
      currentQ.highlightSentence,
      `<mark class="${highlightClass}">${currentQ.highlightSentence}</mark>`
    );
  };

  return (
    <div className="h-full flex space-x-4">
      {/* Reading Text Panel */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-lg">
            阅读文本 - {level}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div 
              className="prose prose-sm max-w-none text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
            />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Question Panel */}
      <Card className="flex-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {t("question")} {currentQuestion + 1}/{questions.length}
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextQuestion}
                disabled={currentQuestion === questions.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="font-medium text-foreground mb-4">{currentQ.question}</p>
          </div>
          
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            {currentQ.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} disabled={submitted} />
                <Label 
                  htmlFor={option.id} 
                  className={`cursor-pointer flex-1 ${
                    submitted 
                      ? option.correct
                        ? 'text-success font-medium'
                        : selectedAnswer === option.id && !option.correct
                        ? 'text-error'
                        : 'text-muted-foreground'
                      : ''
                  }`}
                >
                  {option.id.toUpperCase()}. {option.text}
                  {submitted && option.correct && (
                    <Badge variant="secondary" className="ml-2 bg-success-light text-success-foreground">
                      ✓
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
            阅读评估
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
                      currentQ.options.find(opt => opt.id === selectedAnswer)?.correct 
                        ? "secondary" 
                        : "destructive"
                    }
                    className={
                      currentQ.options.find(opt => opt.id === selectedAnswer)?.correct
                        ? "bg-success-light text-success-foreground"
                        : ""
                    }
                  >
                    {currentQ.options.find(opt => opt.id === selectedAnswer)?.correct 
                      ? "正确" 
                      : "错误"
                    }
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">正确答案:</h4>
                  <p className="text-sm text-foreground">
                    {currentQ.options.find(opt => opt.correct)?.id.toUpperCase()}. {currentQ.options.find(opt => opt.correct)?.text}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">解释:</h4>
                  <p className="text-sm text-muted-foreground">
                    {currentQ.explanation}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">原文提示:</h4>
                  <p className="text-sm text-muted-foreground italic">
                    相关句子已在原文中{currentQ.options.find(opt => opt.id === selectedAnswer)?.correct ? '绿色' : '红色'}高亮显示。
                  </p>
                </div>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingModule;