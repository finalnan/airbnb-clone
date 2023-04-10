"use client";

import Image from "next/image";
import placeholader from "../assets/images/placeholder.jpg";

interface AvatarProps {
  src?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src || placeholader}
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
    />
  );
};

export default Avatar;
