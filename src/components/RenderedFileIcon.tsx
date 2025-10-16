import { extensionIconPaths } from "../constants";
import IconImage from "./IconImage";
import File from "./SVG/File";

interface IProps {
  filename: string;
  isOpen?: boolean;
  isFolder?: boolean;
}
const RenderedFileIcon = ({ filename, isFolder, isOpen }: IProps) => {
  const extension = filename.split(".").pop();
  if (
    extension &&
    Object.prototype.hasOwnProperty.call(extensionIconPaths, extension)
  ) {
    const iconPath = isFolder
      ? isOpen
        ? `${extensionIconPaths[extension]}-open.svg`
        : `${extensionIconPaths[extension]}.svg`
      : `${extensionIconPaths[extension]}.svg`;
    return <IconImage src={iconPath} />;
  }
  if (isFolder && isOpen)
    return <IconImage src="/icons/folder-default-open.svg" />;
  if (isFolder && !isOpen) return <IconImage src="/icons/folder-default.svg" />;
  return <File />;
};

export default RenderedFileIcon;
