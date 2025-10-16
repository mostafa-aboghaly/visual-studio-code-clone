import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileTree } from "../data/fileTree";
import { setOpenedFiles, setClickedFile } from "../app/features/fileTreeSlice";
import type { RootState } from "../app/store";
import type { IFile } from "../interfaces";
import RenderedFileIcon from "./RenderedFileIcon";

interface ISearchResult {
  file: string;
  line: number;
  text: string;
}

const SearchPanel = () => {
  const dispatch = useDispatch();
  const { openedFiles } = useSelector((state: RootState) => state.tree);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ISearchResult[]>([]);

  const traverseTree = (
    tree: IFile[],
    term: string,
    acc: ISearchResult[] = []
  ) => {
    for (const node of tree) {
      if (
        !node.isFolder &&
        node.content?.toLowerCase().includes(term.toLowerCase())
      ) {
        const lines = node.content.split("\n");
        lines.forEach((line, i) => {
          if (line.toLowerCase().includes(term.toLowerCase())) {
            acc.push({
              file: node.name,
              line: i + 1,
              text: line.trim(),
            });
          }
        });
      }
      if (node.children) traverseTree(node.children, term, acc);
    }
    return acc;
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const found = traverseTree([fileTree], query);
      setResults(found);
    }, 300);

    return () => clearTimeout(delay);
  }, [query, fileTree]);

  const findFileByName = (tree: IFile[], name: string): IFile | null => {
    for (const node of tree) {
      if (node.name === name && !node.isFolder) return node;
      if (node.children) {
        const found = findFileByName(node.children, name);
        if (found) return found;
      }
    }
    return null;
  };

  const handleResultClick = (result: ISearchResult) => {
    const file = findFileByName([fileTree], result.file);
    if (!file) return;

    const alreadyOpened = openedFiles.find((f) => f.id === file.id);
    if (alreadyOpened) {
      dispatch(
        setClickedFile({
          filename: file.name,
          fileContent: file.content,
          activeTabId: file.id,
        })
      );
    } else {
      dispatch(setOpenedFiles([...openedFiles, file]));
      dispatch(
        setClickedFile({
          filename: file.name,
          fileContent: file.content,
          activeTabId: file.id,
        })
      );
    }
  };

  function escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  const highlight = (text: string, query: string) => {
    const safeQuery = escapeRegex(query);
    const parts = text.split(new RegExp(`(${safeQuery})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={i}
          className="bg-[#F3C4A6] dark:bg-[#5D2E10] px-[2px] rounded"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-full p-3 text-sm dark:bg-[#181818] bg-[#f8f8f8] text-[#3B3B3B] dark:text-[#cccccc]">
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full text-xl p-1 mb-3 dark:bg-[#313131] bg-white rounded-xs dark:focus:outline-[#0078D4] focus:outline-[#005FB8] focus:outline-1"
      />
      {results.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <div className="space-y-2">
          {results.map((r, i) => (
            <div
              onClick={() => handleResultClick(r)}
              key={i}
              className="cursor-pointer dark:bg-[#181818] bg-[#f8f8f8] hover:bg-[#F2F2F2] dark:hover:bg-[#2A2D2E] p-1 rounded"
            >
              <div className="flex gap-1.5">
                <RenderedFileIcon filename={r.file} />
                {r.file}
              </div>
              <div className="text-xs">Line {r.line}</div>
              <div className="truncate">{highlight(r.text, query)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
