import Image from "next/image";
import { CardDescription, CardTitle } from "./card";

// Define prop types
interface AuthHeaderProps {
  imageSrc: string;
  imageAlt: string;
  imageW: number;
  imageH: number;
  title: string;
  subtitle: string;
  subtitle2?: string;
  email?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  imageSrc,
  imageAlt,
  imageW,
  imageH,
  title,
  subtitle,
  subtitle2,
  email,
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-[490px]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageW}
        height={imageH}
        className="mb-3"
      />
      <div className="flex flex-col items-center gap-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-forcedGray text-lg text-center">
          {subtitle}
        </CardDescription>
        {email && (
          <CardDescription className="text-forcedGray">
            {email}
          </CardDescription>
        )}
        {subtitle2 && (
          <CardDescription className="text-forcedGray text-lg">
            {subtitle2}
          </CardDescription>
        )}
      </div>
    </div>
  );
};

export default AuthHeader;
