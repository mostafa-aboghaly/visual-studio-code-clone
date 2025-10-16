import { useDispatch, useSelector } from "react-redux";
import type { IFile } from "../interfaces";
import RenderedFileIcon from "./RenderedFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import {
  setClickedFile,
  setOpenedFiles,
  setTabIdToRemove,
} from "../app/features/fileTreeSlice";
import type { RootState } from "../app/store";

interface IProps {
  file: IFile;
}

const BarTab = ({ file }: IProps) => {
  const dispatch = useDispatch();
  const {
    clickedFiles: { activeTabId },
    openedFiles,
  } = useSelector((state: RootState) => state.tree);
  // ** Handlers
  const onClick = () => {
    const { id, name, content } = file;
    dispatch(
      setClickedFile({ filename: name, fileContent: content, activeTabId: id })
    );
  };
  const onRemove = (id: string) => {
    const filtered = openedFiles.filter((file) => file.id !== id);
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
  };
  return (
    <div
      className={`h-full flex items-center p-2.5 group  border-b-[2px] border-l-[1px] dark:border-l-[#2b2b2b] border-l-[#e5e5e5] ${
        file.id === activeTabId
          ? "dark:border-t-[#0078D4] border-t-[#005FB8] dark:border-t-[2px] border-t-[3px] dark:border-b-[#1f1f1f] border-b-[#fff] border-b-[2px] dark:bg-[#1f1f1f] bg-white dark:text-white text-[#3b3b3b]"
          : "border-t-transparent dark:border-t-[2px] border-t-[3px] dark:border-b-[#2B2B2B] border-b-[#e5e5e5] border-b-[2px] text-[#9d9d9d] dark:bg-[#181818] bg-[#f8f8f8] dark:hover:bg-[#1f1f1f] dark:hover:text-white hover:bg-white hover:text-[#3b3b3b]"
      }`}
      onClick={onClick}
      onContextMenu={(event) => {
        event.preventDefault();
        dispatch(setTabIdToRemove(file.id));
      }}
    >
      <RenderedFileIcon filename={file.name} />
      <span className="cursor-pointer duration-300 flex justify-center items-center w-fit mr-2 p-1 rounded-md">
        {file.name}
      </span>
      <span
        className={`flex cursor-pointer dark:hover:bg-[#313232] hover:bg-[#E9E9E9] duration-300 justify-center ${
          file.id !== activeTabId ? "opacity-0" : ""
        } items-center w-fit mr-2 p-1 rounded-md group-hover:opacity-100`}
        onClick={(event) => {
          event.stopPropagation();
          onRemove(file.id);
        }}
      >
        <CloseIcon className="dark:text-white text-[#3b3b3b]" />
      </span>
    </div>
  );
};

export default BarTab;
