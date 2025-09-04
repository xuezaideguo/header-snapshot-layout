import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useModule } from "@/contexts/ModuleContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const WritingModule = () => {
  const [userText, setUserText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();
  const { level } = useModule();

  const writingPrompt = {
    title: "Beschreibung: Mein Lieblingshobby",
    instruction: "Schreiben Sie einen kurzen Text (80-100 Wörter) über Ihr Lieblingshobby. Verwenden Sie:",
    requirements: [
      "Präsens und Perfekt",
      "Modalverben (können, mögen, wollen)",
      "Begründungen mit 'weil' oder 'da'",
      "Mindestens 3 zusammengesetzte Wörter"
    ]
  };

  const evaluation = {
    score: 85,
    strengths: [
      "Gute Verwendung des Präsens",
      "Kreative zusammengesetzte Wörter",
      "Klare Struktur"
    ],
    improvements: [
      "Mehr Modalverben verwenden",
      "Längere Sätze mit Nebensätzen",
      "Reicheres Vokabular"
    ],
    corrections: [
      {
        original: "Ich spiele gern Fußball am Wochenende.",
        corrected: "Am Wochenende spiele ich gern Fußball.",
        explanation: "Im Deutschen steht das Verb meist an zweiter Stelle."
      }
    ]
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const wordCount = userText.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="h-full flex space-x-4">
      {/* Writing Prompt Panel */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-lg">
            写作任务 - {level}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">{writingPrompt.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {writingPrompt.instruction}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">要求:</h4>
                <ul className="space-y-1">
                  {writingPrompt.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">您的答案:</h4>
                  <Badge variant="outline" className="text-xs">
                    {wordCount}/100 词
                  </Badge>
                </div>
                <Textarea
                  placeholder="在这里开始写作..."
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  className="min-h-[200px] resize-none"
                  disabled={submitted}
                />
                <Button 
                  className="w-full mt-4" 
                  disabled={!userText.trim() || submitted}
                  onClick={handleSubmit}
                >
                  {submitted ? "已提交" : "提交作文"}
                </Button>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Evaluation Panel */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-lg">
            写作评估
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {!submitted ? (
              <div className="text-center text-muted-foreground py-8">
                请先完成写作任务
              </div>
            ) : (
              <div className="space-y-6">
                {/* Score */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {evaluation.score}/100
                  </div>
                  <Badge 
                    variant="secondary"
                    className="bg-success-light text-success-foreground"
                  >
                    良好
                  </Badge>
                </div>
                
                {/* Strengths */}
                <div>
                  <h4 className="font-medium mb-3 text-success">✓ 优点:</h4>
                  <ul className="space-y-2">
                    {evaluation.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-foreground flex items-start">
                        <span className="w-2 h-2 bg-success rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Improvements */}
                <div>
                  <h4 className="font-medium mb-3 text-german-gold">⚡ 改进建议:</h4>
                  <ul className="space-y-2">
                    {evaluation.improvements.map((improvement, index) => (
                      <li key={index} className="text-sm text-foreground flex items-start">
                        <span className="w-2 h-2 bg-german-gold rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Corrections */}
                <div>
                  <h4 className="font-medium mb-3 text-error">✏️ 语法修正:</h4>
                  <div className="space-y-3">
                    {evaluation.corrections.map((correction, index) => (
                      <div key={index} className="border border-border rounded-md p-3">
                        <div className="text-sm mb-1">
                          <span className="text-error font-medium">原文:</span>
                          <p className="text-error-light mt-1">{correction.original}</p>
                        </div>
                        <div className="text-sm mb-2">
                          <span className="text-success font-medium">修正:</span>
                          <p className="text-success-light mt-1">{correction.corrected}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">说明:</span> {correction.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setUserText("");
                    setSubmitted(false);
                  }}
                >
                  新的写作任务
                </Button>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default WritingModule;