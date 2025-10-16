import { useState } from "react";
import type { IFile } from "../interfaces";
import RightArrowIcon from "./SVG/RightArrowIcon";
import BottomArrowIcon from "./SVG/BottomArrowIcon";
import RenderedFileIcon from "./RenderedFileIcon";
import { useDispatch, useSelector } from "react-redux";
import { setClickedFile, setOpenedFiles } from "../app/features/fileTreeSlice";
import type { RootState } from "../app/store";
import { doesFileObjectExist } from "../utils/functions";

interface IProps {
  fileTree: IFile;
  depth?: number;
}

const RecursiveComponent = ({ fileTree, depth = 0 }: IProps) => {
  const { id, isFolder, name, children, content, isRoot } = fileTree;
  const dispatch = useDispatch();
  const { openedFiles, clickedFiles } = useSelector(
    (state: RootState) => state.tree
  );

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggle = () => setIsOpen((prev) => !prev);

  const onFileClick = () => {
    toggle();
    const fileExist = doesFileObjectExist(openedFiles, id);
    if (isFolder) return;
    dispatch(
      setClickedFile({ filename: name, fileContent: content, activeTabId: id })
    );
    if (fileExist) return;
    dispatch(setOpenedFiles([...openedFiles, fileTree]));
  };

  return (
    <div className="text-lg w-full">
      <div
        className={`group relative select-none w-full ${
          fileTree.id === clickedFiles.activeTabId
            ? "dark:bg-[#37373D] bg-[#E4E6F1]"
            : ""
        }`}
        onClick={onFileClick}
      >
        <div className="absolute inset-0 transition-colors duration-75 group-hover:dark:bg-[#2A2D2E] group-hover:bg-[#F2F2F2]"></div>

        <div className="flex items-center mb-[1px] py-1 pr-2 relative z-10 cursor-pointer">
          <div style={{ width: `${depth * 20}px` }}></div>

          {isFolder ? (
            isOpen ? (
              <BottomArrowIcon />
            ) : (
              <RightArrowIcon />
            )
          ) : (
            <span className="w-[14px]" />
          )}

          <span className="mr-2">
            <RenderedFileIcon
              filename={name}
              isFolder={!!isFolder}
              isOpen={!!isOpen}
            />
          </span>

          <span className={`truncate flex-1 ${isRoot ? "font-bold" : ""}`}>
            {isRoot ? name.toUpperCase() : name}
          </span>
        </div>
      </div>

      {isOpen &&
        children?.map((file, idx) => (
          <RecursiveComponent
            key={file.id ?? idx}
            fileTree={file}
            depth={(depth || 0) + 1}
          />
        ))}
    </div>
  );
};

export default RecursiveComponent;
