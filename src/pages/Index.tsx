import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";
import GrammarModule from "@/components/modules/GrammarModule";
import ReadingModule from "@/components/modules/ReadingModule";
import WritingModule from "@/components/modules/WritingModule";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ModuleProvider, useModule } from "@/contexts/ModuleContext";

const MainContent = () => {
  const { currentModule } = useModule();
  
  const renderModule = () => {
    switch (currentModule) {
      case "grammar":
        return <GrammarModule />;
      case "reading":
        return <ReadingModule />;
      case "writing":
        return <WritingModule />;
      default:
        return <GrammarModule />;
    }
  };

  return renderModule();
};

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="german-exam-theme">
      <LanguageProvider>
        <ModuleProvider>
          <div className="min-h-screen bg-background">
            <HeaderWrapper />
            <NavigationBar />
            <div className="h-[calc(100vh-7rem)] p-4">
              <MainContent />
            </div>
          </div>
        </ModuleProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

const HeaderWrapper = () => {
  const { isHeaderCollapsed } = useModule();
  
  return (
    <div className={`transition-all duration-300 ${isHeaderCollapsed ? 'h-0 overflow-hidden' : 'h-16'}`}>
      <Header />
    </div>
  );
};

export default Index;
