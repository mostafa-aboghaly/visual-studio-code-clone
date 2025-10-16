interface IProps {
  className?: string;
}
const Search = ({ className }: IProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m23.03 21.97l-7.868-7.868a8 8 0 1 0-1.06 1.06l7.868 7.868zM2.5 9c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5A6.51 6.51 0 0 1 2.5 9"
      />
    </svg>
  );
};
export default Search;
