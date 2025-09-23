import AboutEITContent from "@/components/blogs/AboutEITContent";
import Bounded from "@/components/landing/Bounded";
import React from "react";

function page() {
  return (
    <Bounded as="article">
      <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl text-foreground ">
        About EIT
      </h2>

      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-primary/20 blur-3xl filter" />

      <AboutEITContent />
    </Bounded>
  );
}

export default page;
