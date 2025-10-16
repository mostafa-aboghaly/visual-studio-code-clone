interface IProps {
  src: string;
  className?: string;
}

const IconImage = ({ src, className = "w-5 h-5 min-w-5 min-h-5" }: IProps) => {
  return <img src={src} className={className} />;
};

export default IconImage;
