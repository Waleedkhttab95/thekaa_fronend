import Image from "next/image";
import { Card, CardContent } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
type props = {
  testimonial: {
    name: string;
    quote: string;
    avatar: string;
  };
  index: number;
}
export const TestimonialCard = ({ testimonial, index }: props) => {
  const quoteColor = index % 2 === 0 ? "#F7AEF3" : "#23F6F0";
  return (
    <Card className={`w-[238px] max-w-[238px] h-[170px] md:w-[405px] mb-0 md:max-w-[405px] md:h-[289px]  flex-shrink-0 bg-[#231F20] border border-[${quoteColor}] shadow-[0_0_58px_${quoteColor}]  relative`}
      style={{
        borderColor: quoteColor,
        boxShadow: `0 4px 18px 0 ${quoteColor}4D`, // 4D = 0.3 alpha in hex
      }}>
      <CardContent className="p-6 h-full flex-col gap-4 relative">
        {/* Quote marks */}
        <div className={`absolute text-lg font-bold top-5 right-5 ${quoteColor}`}>
          <Image
            src={`/assets/images/icons/${index % 2 === 0 ? "pink" : "cyan"}-qoute.svg`}
            alt="Quote"
            width={50}
            height={50}
            className="size-[21px] md:size-[50px]"
          />
        </div>

        {/* Quote content */}
        <p className="text-white text-md md:text-xl font-bold md:mb-5 text-right ms-3 mt-6 md:mt-16" >
          {testimonial.quote}
        </p>

        {/* Person info */}
        <div className="flex items-center justify-start w-full gap-3 md:mt-2">
          <Avatar>
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
};