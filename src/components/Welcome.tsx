import VsCode from "./SVG/VsCode";

const Welcome = () => {
  return (
    <div className="flex items-center justify-center h-screen dark:bg-[#1f1f1f] bg-white">
      <VsCode className="text-[#f2f2f2] dark:text-[#161616] w-96 h-96" />
    </div>
  );
};
export default Welcome;
