import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const EvaluationPanel = () => {
  const { t } = useLanguage();
  // 模拟评估状态
  const evaluation = {
    status: "pending", // "correct", "incorrect", "pending"
    score: null,
    feedback: "",
    correctAnswer: "A",
    explanation: "动词 'möchte' 是 'mögen' 的虚拟式第一人称单数形式，用于表达愿望。"
  };

  const getStatusBadge = () => {
    switch (evaluation.status) {
      case "correct":
        return (
          <Badge variant="default" className="bg-green-500 text-white">
            <CheckCircle className="w-4 h-4 mr-1" />
            正确
          </Badge>
        );
      case "incorrect":
        return (
          <Badge variant="destructive">
            <XCircle className="w-4 h-4 mr-1" />
            错误
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <RotateCcw className="w-4 h-4 mr-1" />
            等待评估
          </Badge>
        );
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          {t("evaluation")}
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {evaluation.status === "pending" ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">请先完成答题</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">得分</h4>
              <div className="text-2xl font-bold text-primary">
                {evaluation.score || "0"}/100
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground">正确答案</h4>
              <Badge variant="outline">{evaluation.correctAnswer}</Badge>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground">解析</h4>
              <p className="text-sm text-muted-foreground">
                {evaluation.explanation}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground">学习建议</h4>
              <div className="space-y-1">
                <Badge variant="secondary" className="text-xs">
                  复习动词变位
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  练习虚拟式
                </Badge>
              </div>
            </div>
          </>
        )}

        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full">
            下一题
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluationPanel;