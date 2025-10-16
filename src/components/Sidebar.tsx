import Explorer from "./SVG/Explorer";
import Search from "./SVG/Search";
import Gear from "./SVG/Gear";
import type { ImperativePanelHandle } from "react-resizable-panels";
import { useTheme } from "../context/ThemeContext";
import ContextMenu from "./ui/ContextMenu";
import { useState } from "react";

interface SidebarProps {
  activeSection: "explorer" | "search";
  setActiveSection: (section: "explorer" | "search") => void;
  leftPanelRef: React.RefObject<ImperativePanelHandle | null>;
}

const Sidebar = ({
  activeSection,
  setActiveSection,
  leftPanelRef,
}: SidebarProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  const onDark = () => {
    setTheme("dark");
    setShowMenu(false);
  };

  const onLight = () => {
    setTheme("");
    setShowMenu(false);
  };

  return (
    <div className="px-[1px] w-14 flex flex-col dark:bg-[#181818] bg-[#f8f8f8] border-r dark:border-[#2b2b2b] border-[#E5E5E5]">
      <div
        className={`py-3 w-full flex justify-center items-center border-l-[3px] ${
          activeSection === "explorer"
            ? "border-[#0078D4]"
            : "border-transparent"
        }`}
        onClick={() => {
          setActiveSection("explorer");
          leftPanelRef.current?.isExpanded()
            ? activeSection === "search"
              ? leftPanelRef.current?.expand()
              : leftPanelRef.current?.collapse()
            : leftPanelRef.current?.expand();
        }}
      >
        <Explorer className="size-10 cursor-pointer dark:text-[#868686] dark:hover:text-white hover:text-[#3b3b3b] text-[#616161]" />
      </div>

      <div
        className={`py-3 w-full flex justify-center items-center border-l-[3px] ${
          activeSection === "search" ? "border-[#0078D4]" : "border-transparent"
        }`}
        onClick={() => {
          setActiveSection("search");
          leftPanelRef.current?.isExpanded()
            ? null
            : leftPanelRef.current?.expand();
        }}
      >
        <Search className="size-10 cursor-pointer dark:text-[#868686] dark:hover:text-white hover:text-[#3b3b3b] text-[#616161]" />
      </div>

      <div
        className="py-3 mb-16 mt-auto justify-self-end w-full flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(true);
        }}
      >
        <Gear className="size-10 cursor-pointer dark:text-[#868686] dark:hover:text-white hover:text-[#3b3b3b] text-[#616161]" />
      </div>

      {showMenu && (
        <ContextMenu
          setShowMenu={setShowMenu}
          items={[
            { label: "Dark", onClick: onDark },
            { label: "Light", onClick: onLight },
          ]}
          position={{ x: 55, y: 580 }}
          theme={theme}
        />
      )}
    </div>
  );
};

export default Sidebar;
