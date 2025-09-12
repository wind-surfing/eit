import Bounded from "@/components/landing/Bounded";
import ButtonLink from "@/components/landing/ButtonLink";
import { PiGear } from "react-icons/pi";
import Image from "next/image";
import { JSX } from "react";
import ShowcaseAnimatedContent from "./ShowcaseAnimatedContent";

const icons = {
  gear: <PiGear />,
};

const Showcase = (): JSX.Element => {
  return (
    <Bounded
      data-slice-type="showcase"
      data-slice-variation="default"
      className="relative"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-primary/20 blur-3xl filter" />

      <ShowcaseAnimatedContent>
        <h2 className="text-balance text-center text-5xl font-medium md:text-7xl text-foreground">
          About EIT Club
        </h2>
      </ShowcaseAnimatedContent>

      <div className="mt-16 grid items-center gap-8 rounded-xl border border-border bg-card/50 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-0 lg:py-12">
        <div>
          <div className="w-fit rounded-lg bg-primary/35 p-4 text-3xl">
            {icons.gear}
          </div>
          <div className="mt-6 text-2xl font-normal text-foreground">
            Community Excellence
          </div>

          <div className="prose prose-invert mt-4 max-w-xl">
            <p className="text-muted-foreground">
              EIT (Everest IT Club) is a premier community for students and IT
              professionals. We foster innovation, collaboration, and skill
              development through hands-on projects, workshops, and networking
              opportunities.
            </p>
          </div>

          <ButtonLink href="/about" className="mt-6">
            Learn More About Us
          </ButtonLink>
        </div>

        <Image
          src="/workflow.avif"
          alt="EIT Community Excellence"
          width={600}
          height={400}
          className="opacity-90 shadow-2xl lg:-order-1 lg:col-span-2 lg:translate-x-[-15%] lg:pt-0"
        />
      </div>
    </Bounded>
  );
};

export default Showcase;
