import StylizedLogoMark from "./StylizedLogoMark";
import Bounded from "@/components/landing/Bounded";
import ButtonLink from "@/components/landing/ButtonLink";
import { JSX } from "react";

const CallToAction = (): JSX.Element => {
  return (
    <Bounded
      data-slice-type="cta"
      data-slice-variation="default"
      className="relative py-32 text-center font-medium md:py-40"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-primary/50 blur-[160px] filter" />

      <div className="glass-container rounded-lg bg-gradient-to-b from-card to-card/80 border border-border p-4 md:rounded-xl">
        <StylizedLogoMark />
      </div>

      <div className="mt-8 max-w-xl text-balance text-5xl text-foreground">
        Ready to Join EIT?
      </div>

      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        Join thousands of IT professionals and students who are building the
        future together through collaboration, innovation, and community.
      </p>

      <ButtonLink href="/authentication" className="mt-6">
        Join Our Community
      </ButtonLink>
    </Bounded>
  );
};

export default CallToAction;
