import { type ReactNode, type RefObject } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import SearchPanel from "./SearchPanel";

interface IProps {
  defaultLayout?: number[] | undefined;
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  showLeftPanel: boolean;
  panelRef?: RefObject<ImperativePanelHandle | null>;
  activePanel: "explorer" | "search";
}
const ResizablePanel = ({
  defaultLayout = [30, 70],
  leftPanel,
  rightPanel,
  showLeftPanel,
  panelRef,
  activePanel,
}: IProps) => {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };
  return (
    <PanelGroup
      direction="horizontal"
      onLayout={onLayout}
      autoSaveId="condition"
    >
      {showLeftPanel && (
        <>
          <Panel
            ref={panelRef}
            defaultSize={defaultLayout[0]}
            minSize={20}
            style={{ overflow: "auto" }}
            className="left-panel h-screen"
            collapsible
          >
            {activePanel === "explorer" ? leftPanel : <SearchPanel />}
          </Panel>
          <PanelResizeHandle className="border-r dark:border-[#ffffff1f] border-[#e5e5e5] border-[1px] hover:border-[#0078D4] hover:border-2" />
        </>
      )}
      <Panel defaultSize={defaultLayout[1]} minSize={20}>
        {rightPanel}
      </Panel>
    </PanelGroup>
  );
};

export default ResizablePanel;
