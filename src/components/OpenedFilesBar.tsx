import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import BarTab from "./BarTab";
import { useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { setClickedFile, setOpenedFiles } from "../app/features/fileTreeSlice";
import ContextMenu from "./ui/ContextMenu";
const OpenedFilesBar = () => {
  const { openedFiles, tabIdToRemove } = useSelector(
    (state: RootState) => state.tree
  );
  const dispatch = useDispatch();
  const onCloseAll = () => {
    dispatch(setOpenedFiles([]));
    dispatch(
      setClickedFile({ activeTabId: "", fileContent: "", filename: "" })
    );
    setShowMenu(false);
  };
  const onClose = () => {
    const filtered = openedFiles.filter((file) => file.id !== tabIdToRemove);
    const lastTab = filtered[filtered.length - 1];
    if (!lastTab) {
      dispatch(setOpenedFiles([]));
      dispatch(
        setClickedFile({
          filename: "",
          activeTabId: null,
          fileContent: "",
        })
      );
      return;
    }
    dispatch(setOpenedFiles(filtered));
    dispatch(
      setClickedFile({
        filename: lastTab.name,
        activeTabId: lastTab.id,
        fileContent: lastTab.content,
      })
    );
    setShowMenu(false);
  };
  const { theme } = useTheme();
  const divRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div
      ref={divRef}
      className="opened-files-bar overflow-x-auto"
      onWheel={(e) => {
        divRef.current?.scrollBy({
          left: e.deltaY,
        });
      }}
    >
      <div
        className="flex items-end dark:bg-[#181818] bg-[#f8f8f8] h-[55px]"
        onContextMenu={(event) => {
          event.preventDefault();
          setPosition({ x: event.clientX, y: event.clientY });
          setShowMenu(true);
        }}
      >
        {openedFiles.map((file) => (
          <BarTab key={file.id} file={file} />
        ))}
        <div
          className="spacer | h-full pointer-events-none"
          style={{
            flex: 1,
            borderBottom: `2px solid ${
              theme === "dark" ? "#2B2B2B" : "#e5e5e5"
            }`,
            borderLeft: `2px solid ${theme === "dark" ? "#2B2B2B" : "#e5e5e5"}`,
          }}
        ></div>
      </div>
      {showMenu && (
        <ContextMenu
          position={position}
          setShowMenu={setShowMenu}
          items={[
            { label: "Close", onClick: onClose },
            { label: "Close All", onClick: onCloseAll },
          ]}
        />
      )}
    </div>
  );
};

export default OpenedFilesBar;
