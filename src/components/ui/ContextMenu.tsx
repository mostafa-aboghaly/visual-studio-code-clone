import { useEffect, useRef } from "react";

interface MenuItem {
  label: string;
  onClick: () => void;
}
interface IProps {
  setShowMenu: (value: boolean) => void;
  position: { x: number; y: number };
  items: MenuItem[];
  theme?: "" | "dark";
}
const ContextMenu = ({
  position: { x, y },
  setShowMenu,
  items,
  theme,
}: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        setShowMenu(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShowMenu]);
  return (
    <div ref={menuRef} className="z-50">
      <ul
        className="z-10 w-52 origin-top-right rounded-md dark:bg-[#1f1f1f] bg-white shadow-lg ring-1 dark:ring-[#454545] ring-[#CECECE] focus:outline-none p-2"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        style={{
          position: "absolute",
          top: y,
          left: x,
        }}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className={`block px-10 py-0.5 text-lg cursor-pointer duration-300 rounded-sm 
      ${
        theme !== undefined
          ? theme === "dark"
            ? item.label === "Dark"
              ? "dark:bg-[#04395E] dark:text-white"
              : item.label === "Light"
              ? "text-[#cccccc] hover:bg-[#2A2D2E]"
              : ""
            : item.label === "Light"
            ? "bg-[#E8E8E8] text-black"
            : item.label === "Dark"
            ? "text-[#3B3B3B] hover:bg-[#F2F2F2]"
            : ""
          : "dark:text-[#cccccc] dark:hover:text-white hover:bg-[#0078D4] hover:text-white text-[#3B3B3B]"
      }
      ${theme ? (theme === "dark" ? "bg-[#222222]" : "bg-[#F8F8F8]") : ""}
    `}
            onClick={item.onClick}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
