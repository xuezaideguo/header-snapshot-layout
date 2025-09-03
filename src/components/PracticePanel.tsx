import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const PracticePanel = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>("");
  const [freeText, setFreeText] = useState<string>("");
  const { t } = useLanguage();

  const strategies = [
    {
      id: "grammar",
      title: "语法分析",
      description: "这道题考察的是德语动词的人称变化，需要根据主语选择正确的动词形式。"
    },
    {
      id: "context",
      title: "语境理解", 
      description: "通过理解句子的整体含义，判断说话人的意图和时态。"
    },
    {
      id: "vocabulary",
      title: "词汇辨析",
      description: "区分相似词汇的用法和搭配，选择最合适的表达方式。"
    },
    {
      id: "structure",
      title: "句子结构",
      description: "分析句子的语法结构，确定各个成分的关系和位置。"
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple">{t("simple")}</TabsTrigger>
            <TabsTrigger value="advanced">{t("difficult")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simple" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">选择出题思路:</h3>
              <RadioGroup value={selectedStrategy} onValueChange={setSelectedStrategy}>
                {strategies.map((strategy) => (
                  <div key={strategy.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={strategy.id} id={strategy.id} />
                      <Label htmlFor={strategy.id} className="cursor-pointer font-medium">
                        {strategy.title}
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      {strategy.description}
                    </p>
                  </div>
                ))}
              </RadioGroup>
              <Button className="w-full" disabled={!selectedStrategy}>
                确认选择
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">自由分析:</h3>
              <Textarea
                placeholder="请在此处写下您对这道题的分析和思路..."
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                className="min-h-[300px]"
              />
              <Button className="w-full" disabled={!freeText.trim()}>
                提交分析
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
};

export default PracticePanel;