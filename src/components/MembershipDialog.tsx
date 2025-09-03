import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface MembershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MembershipDialog = ({ open, onOpenChange }: MembershipDialogProps) => {
  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log("Starting subscription process...");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            升级到会员版本
          </DialogTitle>
          <DialogDescription className="text-center">
            解锁所有功能，提升您的德语学习体验
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">非会员限制：</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-muted-foreground">
                <span className="w-2 h-2 bg-destructive rounded-full mr-3"></span>
                每日只能练习 5 道题目
              </li>
              <li className="flex items-center text-muted-foreground">
                <span className="w-2 h-2 bg-destructive rounded-full mr-3"></span>
                无法使用困难模式
              </li>
              <li className="flex items-center text-muted-foreground">
                <span className="w-2 h-2 bg-destructive rounded-full mr-3"></span>
                无法查看详细解析
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">会员特权：</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="w-4 h-4 text-primary mr-3" />
                无限制练习所有题目
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-primary mr-3" />
                使用简单版和困难版模式
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-primary mr-3" />
                获得详细的答题解析
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-primary mr-3" />
                支持所有德语考试等级
              </li>
            </ul>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              ¥19 / 月
            </div>
            <p className="text-sm text-muted-foreground">
              随时可以取消订阅
            </p>
          </div>

          <Button 
            onClick={handleSubscribe}
            className="w-full text-lg py-6"
            size="lg"
          >
            立即订阅会员
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipDialog;