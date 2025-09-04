import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useModule } from "@/contexts/ModuleContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const GrammarModule = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<"simple" | "challenge">("simple");
  const [selectedGrammarPoint, setSelectedGrammarPoint] = useState<string>("");
  const [userAnalysis, setUserAnalysis] = useState<string>("");
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

  const grammarPoints = [
    { id: "verb-conjugation", text: "动词变位分析", description: "根据主语人称和数确定动词变位。" },
    { id: "sentence-structure", text: "句子结构分析", description: "分析句子成分和语序规则。" },
    { id: "context-analysis", text: "语境含义分析", description: "根据上下文理解句子含义。" },
    { id: "grammar-rules", text: "语法规则", description: "注意语序规则" }
  ];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleAnalysisSubmit = () => {
    // Handle analysis submission logic here
  };

  const getAnswerStatus = (optionId: string) => {
    if (!submitted) return "default";
    const option = question.options.find(opt => opt.id === optionId);
    if (option?.correct) return "success";
    if (selectedAnswer === optionId && !option?.correct) return "error";
    return "muted";
  };

  return (
    <Card className="h-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Question Panel */}
        <ResizablePanel defaultSize={33} minSize={25}>
          <div className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">题目</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-6">
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
                </div>
              </ScrollArea>
            </CardContent>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Analysis Panel */}
        <ResizablePanel defaultSize={34} minSize={25}>
          <div className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">选择解题思路:</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <Tabs value={analysisMode} onValueChange={(value) => setAnalysisMode(value as "simple" | "challenge")}>
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="simple">简单版</TabsTrigger>
                    <TabsTrigger value="challenge">挑战版</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="simple" className="space-y-4">
                    <RadioGroup value={selectedGrammarPoint} onValueChange={setSelectedGrammarPoint}>
                      {grammarPoints.map((point) => (
                        <div key={point.id} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={point.id} id={point.id} />
                            <Label htmlFor={point.id} className="cursor-pointer font-medium">
                              {point.text}
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground ml-6">
                            {point.description}
                          </p>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    <Button 
                      className="w-full" 
                      disabled={!selectedGrammarPoint}
                      onClick={handleAnalysisSubmit}
                    >
                      确认选择
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="challenge" className="space-y-4">
                    <div>
                      <Label htmlFor="user-analysis" className="text-sm font-medium">
                        请分析这道题的考点和解题思路:
                      </Label>
                      <Textarea
                        id="user-analysis"
                        placeholder="请描述你认为这道题考查的语法点和解题思路..."
                        value={userAnalysis}
                        onChange={(e) => setUserAnalysis(e.target.value)}
                        className="mt-2 min-h-[120px]"
                      />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      disabled={!userAnalysis.trim()}
                      onClick={handleAnalysisSubmit}
                    >
                      提交分析
                    </Button>
                  </TabsContent>
                </Tabs>
              </ScrollArea>
            </CardContent>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Evaluation Panel */}
        <ResizablePanel defaultSize={33} minSize={25}>
          <div className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">语法评估</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                {!submitted ? (
                  <div className="text-center text-muted-foreground py-8">
                    请先提交答案
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Score Result */}
                    <div>
                      <h4 className="font-medium mb-3">评分结果</h4>
                      <div className="flex items-center space-x-2">
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
                            ? "✓ 正确" 
                            : "✗ 错误"
                          }
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Analysis Feedback */}
                    <div>
                      <h4 className="font-medium mb-3">考点分析和指正</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium mb-2">正确答案:</p>
                          <p className="text-sm text-foreground">
                            {question.options.find(opt => opt.correct)?.id.toUpperCase()}. {question.options.find(opt => opt.correct)?.text}
                          </p>
                        </div>
                        
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium mb-2">解析:</p>
                          <p className="text-sm text-muted-foreground">
                            {question.explanation}
                          </p>
                        </div>
                        
                        {analysisMode === "challenge" && userAnalysis && (
                          <div className="p-3 bg-accent/50 rounded-lg">
                            <p className="text-sm font-medium mb-2">您的分析评价:</p>
                            <p className="text-sm text-muted-foreground">
                              分析思路正确，抓住了主要考点。建议在表述时更加准确和详细。
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedAnswer("");
                        setSubmitted(false);
                        setSelectedGrammarPoint("");
                        setUserAnalysis("");
                      }}
                    >
                      下一题
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Card>
  );
};

export default GrammarModule;