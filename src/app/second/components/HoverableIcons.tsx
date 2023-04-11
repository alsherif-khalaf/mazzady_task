import Image from "next/image";

type HoverableIconsProps = {
  firstIconSrc: string;
  secIconSrc: string;
};

const HoverableIcons: React.FC<HoverableIconsProps> = ({
  firstIconSrc,
  secIconSrc,
}) => {
    
  return (
    <div className="group hoverable_images w-full h-full  relative aspect-square">
      <Image
        src={firstIconSrc}
        fill
        alt="mazzady"
        className="cursor-pointer transition-all duration-300 group-hover:hidden"
      />
      <Image
        src={secIconSrc}
        fill
        alt="mazzady"
        className="cursor-pointer transition-all duration-300 hidden group-hover:block"
      />
    </div>
  );
};

export default HoverableIcons;
