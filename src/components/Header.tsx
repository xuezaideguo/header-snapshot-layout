import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sun, Moon, Globe, User } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import MembershipDialog from "@/components/MembershipDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-foreground bg-gradient-to-r from-german-red via-german-gold to-german-black bg-clip-text text-transparent">
            DeutschPro
          </h1>
          <span className="text-sm text-muted-foreground">- 德语考试练习</span>
        </div>
        <div className="flex items-center space-x-2">
          {/* Become Member Button */}
          <Button 
            onClick={() => setMembershipDialogOpen(true)}
            className="bg-german-red text-primary-foreground hover:bg-german-red/90 font-semibold"
            size="sm"
          >
            {t("becomeMember")}
          </Button>
          
          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                {t("language")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage("zh")}>
                中文
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          
          {/* Login Button */}
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-2" />
            {t("login")}
          </Button>
        </div>
      </header>
      
      <MembershipDialog 
        open={membershipDialogOpen} 
        onOpenChange={setMembershipDialogOpen} 
      />
    </>
  );
};

export default Header;