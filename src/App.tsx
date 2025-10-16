import { useSelector } from "react-redux";
import ResizablePanel from "./components/ResizablePanel";
import { fileTree } from "./data/fileTree";
import type { RootState } from "./app/store";
import Preview from "./components/Preview";
import Welcome from "./components/Welcome";
import { useRef, useState } from "react";
import type { ImperativePanelHandle } from "react-resizable-panels";
import Sidebar from "./components/Sidebar";
import RecursiveComponent from "./components/RecursiveComponent";

function App() {
  const [activeSection, setActiveSection] = useState<"explorer" | "search">(
    "explorer"
  );
  const leftPanelRef = useRef<ImperativePanelHandle | null>(null);
  const { openedFiles } = useSelector(({ tree }: RootState) => tree);

  return (
    <div className="min-h-screen">
      <div className="flex h-screen">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          leftPanelRef={leftPanelRef}
        />

        <ResizablePanel
          leftPanel={
            <div
              style={{ overflow: "auto" }}
              className="pt-2 pb-48 dark:bg-[#181818] bg-[#f8f8f8] text-[#3B3B3B] dark:text-[#cccccc] min-h-screen"
            >
              <RecursiveComponent fileTree={fileTree} />
            </div>
          }
          rightPanel={openedFiles.length ? <Preview /> : <Welcome />}
          showLeftPanel
          panelRef={leftPanelRef}
          activePanel={activeSection}
        />
      </div>
    </div>
  );
}

export default App;
