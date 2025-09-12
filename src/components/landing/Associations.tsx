import Bounded from "@/components/landing/Bounded";
import StarBackground from "./StarBackground";
import Image from "next/image";
import background from "/public/background.jpg";
import React, { JSX } from "react";
import AssociationsAnimatedContent from "./AssociationsAnimatedContent";

const Associations = (): JSX.Element => {
  return (
    <Bounded
      data-slice-type="integrations"
      data-slice-variation="default"
      className="relative overflow-hidden"
    >
      <Image
        src={background}
        alt=""
        fill
        className="object-cover"
        quality={90}
      />
      <StarBackground />

      <div className="relative">
        <h2 className="mx-auto max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl text-background">
          Connect with EIT
        </h2>

        <div className="mx-auto mt-6 max-w-md text-balance text-center text-muted-foreground">
          <p>
            Follow us on social media and connect with our community across
            different platforms.
          </p>
        </div>

        <AssociationsAnimatedContent />
      </div>
    </Bounded>
  );
};

export default Associations;
