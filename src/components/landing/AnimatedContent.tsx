"use client";
import ButtonLink from "@/components/landing/ButtonLink";
import StarGrid from "@/components/landing/StarGrid";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import Image from "next/image";

export default function AnimatedContent() {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          ".hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow",
          { opacity: 1 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.fromTo(
        ".hero__heading",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.4 }
      );

      tl.fromTo(
        ".hero__body",
        { y: 20 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.6"
      );

      tl.fromTo(
        ".hero__button",
        { scale: 1.5 },
        { scale: 1, opacity: 1, duration: 1.3 },
        "-=0.8"
      );
      tl.fromTo(
        ".hero__image",
        { y: 100 },
        { y: 0, opacity: 1, duration: 1.3 },
        "+=0.3"
      );
      tl.fromTo(
        ".hero__glow",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.8 },
        "-=1"
      );
    },
    { scope: container }
  );

  return (
    <div className="relative" ref={container}>
      <StarGrid />
      <h1 className="hero__heading text-balance text-5xl font-medium opacity-0 md:text-7xl text-foreground">
        Connect. Create. Conquer.
      </h1>

      <div className="hero__body mx-auto mt-6 max-w-md text-balance text-muted-foreground opacity-0">
        <p>
          Join EIT, the premier IT community where students and professionals
          unite to create events, share projects, build resources, and earn
          recognition through our wall of fame and badges.
        </p>
      </div>

      <ButtonLink
        href="/authentication"
        className="hero__button mt-8 opacity-0"
      >
        Join EIT Community
      </ButtonLink>

      <div className="hero__image glass-container mx-auto mt-16 w-full max-w-6xl opacity-0">
        <div className="hero__glow absolute inset-0 -z-10 bg-primary/30 opacity-0 blur-2xl filter" />
        <Image
          src="/hero.avif"
          alt="EIT Community Platform"
          width={1200}
          height={800}
          className="h-auto w-full rounded-lg object-cover shadow-2xl"
        />
      </div>
    </div>
  );
}
