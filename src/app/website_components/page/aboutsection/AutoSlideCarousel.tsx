import { Box } from "@mui/material";
import Marquee from "react-fast-marquee";

type Props = {
  data?: string[];
  children?: React.ReactNode;
  reverse?: boolean;
};

export function AutoSlideCarousel({ data, children, reverse }: Props) {
  return (
    // <Marquee reverse={reverse} pauseOnHover className="[--duration:50s]">
    <Marquee>
      {children
        ? children
        : data?.map((elem, index) => (
            <Box
              component={"img"}
              src={elem}
              key={index}
              sx={{
                height: "20px",
                marginRight: "60px",
              }}
            />
          ))}
    </Marquee>
  );
}
