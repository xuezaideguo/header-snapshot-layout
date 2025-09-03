import Header from "@/components/Header";
import QuestionPanel from "@/components/QuestionPanel";
import PracticePanel from "@/components/PracticePanel";
import EvaluationPanel from "@/components/EvaluationPanel";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="german-exam-theme">
      <LanguageProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="h-[calc(100vh-4rem)]">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={30} minSize={20}>
                <div className="p-4 h-full">
                  <QuestionPanel />
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={40} minSize={30}>
                <div className="p-4 h-full">
                  <PracticePanel />
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={30} minSize={20}>
                <div className="p-4 h-full">
                  <EvaluationPanel />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
