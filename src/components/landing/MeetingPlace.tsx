import Bounded from "@/components/landing/Bounded";
import ButtonLink from "@/components/landing/ButtonLink";
import { PiMapPin } from "react-icons/pi";
import Image from "next/image";
import { JSX } from "react";
import ShowcaseAnimatedContent from "./ShowcaseAnimatedContent";

const icons = {
  mapPin: <PiMapPin />,
};

const MeetingPlace = (): JSX.Element => {
  return (
    <Bounded
      data-slice-type="meeting-place"
      data-slice-variation="default"
      className="relative"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-primary/20 blur-3xl filter" />

      <ShowcaseAnimatedContent>
        <h2 className="text-balance text-center text-5xl font-medium md:text-7xl text-foreground">
          Where We Meet
        </h2>
      </ShowcaseAnimatedContent>

      <div className="mt-16 grid items-center gap-8 rounded-xl border border-border bg-card/50 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-0 lg:py-12">
        <div>
          <div className="w-fit rounded-lg bg-primary/35 p-4 text-3xl">
            {icons.mapPin}
          </div>
          <div className="mt-6 text-2xl font-normal text-foreground">
            At Everest School & Virtually
          </div>

          <div className="prose prose-invert mt-4 max-w-xl">
            <p className="text-muted-foreground">
              Join us at Everest School for in-person workshops, hackathons, and
              networking events. Can&apos;t make it in person? No problem! We
              also host virtual meetups and online collaborative sessions to
              ensure everyone can participate.
            </p>
          </div>

          <ButtonLink href="/events" className="mt-6">
            View Meeting Schedule
          </ButtonLink>
        </div>

        <Image
          src="/meet.svg"
          alt="EIT Community Excellence"
          width={600}
          height={400}
          className="opacity-90 shadow-2xl lg:-order-2 lg:col-span-2 lg:translate-x-[-15%] lg:pt-0"
        />
      </div>
    </Bounded>
  );
};

export default MeetingPlace;
