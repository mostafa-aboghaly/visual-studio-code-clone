import { useSelector } from "react-redux";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter";
import OpenedFilesBar from "./OpenedFilesBar";
import type { RootState } from "../app/store";

const Preview = () => {
  const { clickedFiles } = useSelector((state: RootState) => state.tree);
  return (
    <>
      <OpenedFilesBar />
      <FileSyntaxHighlighter
        content={
          String(clickedFiles.fileContent) === "undefined"
            ? ""
            : String(clickedFiles.fileContent)
        }
      />
    </>
  );
};
export default Preview;
