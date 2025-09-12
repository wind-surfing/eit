import Bounded from "@/components/landing/Bounded";
import AnimatedContent from "@/components/landing/AnimatedContent";
import { JSX } from "react";

const Hero = (): JSX.Element => {
  return (
    <Bounded
      data-slice-type="hero"
      data-slice-variation="default"
      className="text-center"
    >
      <AnimatedContent />
    </Bounded>
  );
};

export default Hero;
