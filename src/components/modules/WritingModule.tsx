import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useModule } from "@/contexts/ModuleContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

const WritingModule = () => {
  const [userText, setUserText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
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
    grade: "良好",
    suggestions: [
      "文章结构清晰，内容丰富",
      "词汇运用得当，表达自然",
      "建议增加更多复杂句式"
    ],
    sampleEssay: `Mein Lieblingshobby ist das Fotografieren. Ich fotografiere gerne, weil ich dadurch die Schönheit der Welt festhalten kann. Am Wochenende gehe ich oft in den Stadtpark oder besuche verschiedene Sehenswürdigkeiten. 

Mit meiner Digitalkamera mache ich Naturaufnahmen und Porträtfotos. Das Fotografieren hilft mir dabei, kreativ zu sein und neue Perspektiven zu entdecken. Außerdem kann ich meine Bilder in sozialen Netzwerken teilen.`
  };

  // Mock user text with errors for demonstration
  const userTextWithErrors = `Ich spiele gern Fußball am Wochenende. Fußball ist mein Lieblingssport, weil es sehr interessant und aufregend sind. Ich kann mit meinen Freunden zusammen spielen und wir haben immer viel Spaß. 

Wenn das Wetter gut sein, gehen wir zum Sportplatz in unserem Viertel. Dort treffen wir andere Mannschaften und spielen Turniere. Nach dem Spiel trinken wir oft zusammen und reden über das Spiel.`;

  const corrections = [
    {
      original: "Am Wochenende spiele ich gern Fußball",
      highlighted: "Am Wochenende spiele ich gern Fußball",
      corrected: "Am Wochenende spiele ich gern Fußball", 
      explanation: "这个句子是正确的，体现了德语的正常语序。",
      type: "correct"
    },
    {
      original: "weil es sehr interessant und aufregend sind",
      highlighted: "sind",
      corrected: "weil es sehr interessant und aufregend ist",
      explanation: "'es' 是第三人称单数，动词应该用 'ist' 而不是 'sind'。",
      type: "error"
    },
    {
      original: "Wenn das Wetter gut sein",
      highlighted: "sein",
      corrected: "Wenn das Wetter gut ist",
      explanation: "条件从句中应该使用 'ist' 而不是不定式 'sein'。",
      type: "error"
    }
  ];

  const handleSubmit = () => {
    setIsEvaluating(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsEvaluating(false);
      setSubmitted(true);
    }, 2000);
  };

  const wordCount = userText.trim().split(/\s+/).filter(word => word.length > 0).length;

  const renderTextWithHighlights = (text: string) => {
    let highlightedText = text;
    corrections.forEach((correction, index) => {
      if (correction.type === "error") {
        highlightedText = highlightedText.replace(
          correction.highlighted,
          `<mark class="bg-error-light text-error-foreground px-1 rounded" data-error="${index}">${correction.highlighted}</mark>`
        );
      }
    });
    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <Card className="h-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {!submitted ? (
          // Before submission - Single panel with writing interface
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">写作任务</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-4 mb-4">
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
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">您的作文:</h4>
                    <Badge variant="outline" className="text-xs">
                      {wordCount}/100 词
                    </Badge>
                  </div>
                  <Textarea
                    placeholder="在这里开始写作..."
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    className="flex-1 resize-none"
                    disabled={isEvaluating}
                  />
                  
                  <Button 
                    className="w-full mt-4" 
                    disabled={!userText.trim() || isEvaluating}
                    onClick={handleSubmit}
                  >
                    {isEvaluating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        评估中...
                      </>
                    ) : (
                      "提交作文"
                    )}
                  </Button>
                </div>
              </CardContent>
            </div>
          </ResizablePanel>
        ) : (
          // After submission - Three panels: original text, corrections, evaluation
          <>
            {/* Original Text with Highlights */}
            <ResizablePanel defaultSize={33} minSize={25}>
              <div className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">您的原文</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="prose prose-sm max-w-none">
                      {renderTextWithHighlights(userTextWithErrors)}
                    </div>
                  </ScrollArea>
                </CardContent>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Corrections and Explanations */}
            <ResizablePanel defaultSize={34} minSize={25}>
              <div className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">修改建议</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      {corrections.map((correction, index) => (
                        <div key={index} className="border border-border rounded-lg p-4">
                          <div className="mb-3">
                            <Badge 
                              variant={correction.type === "error" ? "destructive" : "secondary"}
                              className="mb-2"
                            >
                              {correction.type === "error" ? "错误" : "正确"}
                            </Badge>
                            <p className="text-sm font-medium mb-1">原文:</p>
                            <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                              {correction.original}
                            </p>
                          </div>
                          
                          {correction.type === "error" && (
                            <div className="mb-3">
                              <p className="text-sm font-medium mb-1 text-success">修正:</p>
                              <p className="text-sm text-success bg-success-light p-2 rounded">
                                {correction.corrected}
                              </p>
                            </div>
                          )}
                          
                          <div>
                            <p className="text-sm font-medium mb-1">解析:</p>
                            <p className="text-xs text-muted-foreground">
                              {correction.explanation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
          </>
        )}
        
        {/* Evaluation Panel - Always visible on the right */}
        <ResizablePanel defaultSize={submitted ? 33 : 40} minSize={25}>
          <div className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">写作点评</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                {!submitted ? (
                  <div className="text-center text-muted-foreground py-8">
                    请先完成写作任务
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Score */}
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {evaluation.score}/100
                      </div>
                      <Badge 
                        variant="secondary"
                        className="bg-success-light text-success-foreground"
                      >
                        {evaluation.grade}
                      </Badge>
                    </div>
                    
                    {/* Overall Suggestions */}
                    <div>
                      <h4 className="font-medium mb-3">总体建议</h4>
                      <ul className="space-y-2">
                        {evaluation.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm text-foreground flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Sample Essay */}
                    <div>
                      <h4 className="font-medium mb-3">范文参考</h4>
                      <div className="p-4 bg-accent/30 rounded-lg">
                        <div className="text-sm text-foreground whitespace-pre-line">
                          {evaluation.sampleEssay}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setUserText("");
                        setSubmitted(false);
                        setIsEvaluating(false);
                      }}
                    >
                      新的写作任务
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

export default WritingModule;