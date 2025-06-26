import { getFileIcon } from "@/lib/utils";
import Image from "next/image";

const Thumbnail = ({
  type,
  extension,
  url = "",
  imageClassName,
  className,
}: {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <div
      className={`flex size-10 items-center justify-center overflow-hidden rounded-full shadow-xl ring-2 ring-red-400 ${className}`}
    >
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={`size-8 object-contain ${isImage && "size-full object-cover object-center"} ${imageClassName}`}
      />
    </div>
  );
};

export default Thumbnail;
