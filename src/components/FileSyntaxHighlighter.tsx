import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "../context/ThemeContext";
interface IProps {
  content: string;
}

const FileSyntaxHighlighter = ({ content }: IProps) => {
  const { theme } = useTheme();
  return (
    <SyntaxHighlighter
      language="typescript"
      style={theme === "dark" ? atomOneDark : atomOneLight}
      customStyle={{
        backgroundColor: theme === "dark" ? "#1f1f1f" : "white",
        width: "100%",
        maxHeight: "100vh",
        overflowX: "auto",
        fontSize: "1.2rem",
        minHeight: "100vh",
        paddingBottom: 500,
        paddingLeft: 30,
      }}
      showLineNumbers
    >
      {content}
    </SyntaxHighlighter>
  );
};

export default FileSyntaxHighlighter;
