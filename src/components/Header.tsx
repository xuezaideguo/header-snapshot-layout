import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-foreground">德语考试练习</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          设置
        </Button>
        <Button variant="ghost" size="sm">
          帮助
        </Button>
      </div>
    </header>
  );
};

export default Header;