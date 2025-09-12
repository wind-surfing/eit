"use client";

import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import StylizedLogoMark from "./StylizedLogoMark";
import clsx from "clsx";

import {
  FaNpm,
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";
import Link from "next/link";

export default function AssociationsAnimatedContent() {
  const container = useRef(null);
  gsap.registerPlugin(useGSAP);

  const icons = [
    <FaNpm key="npm" />,
    <FaFacebook key="facebook" />,
    <FaTwitter key="twitter" />,
    <FaGithub key="github" />,
    <FaYoutube key="youtube" />,
    <FaInstagram key="instagram" />,
  ];

  const socialLinks = [
    { platform: "NPM", handle: "@eit", url: "https://npmjs.com/~eit" },
    { platform: "Facebook", handle: "@eit", url: "https://facebook.com/eit" },
    { platform: "Twitter", handle: "@eit", url: "https://twitter.com/eit" },
    { platform: "GitHub", handle: "@eit", url: "https://github.com/eit" },
    { platform: "YouTube", handle: "@eit", url: "https://youtube.com/@eit" },
    { platform: "Instagram", handle: "@eit", url: "https://instagram.com/eit" },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      });

      tl.to(".pulsing-logo", {
        keyframes: [
          {
            filter: "brightness(2)",
            opacity: 1,
            duration: 0.4,
            ease: "power2.in",
          },
          {
            filter: "brightness(1)",
            opacity: 0.7,
            duration: 0.9,
          },
        ],
      });

      tl.to(
        ".signal-line",
        {
          keyframes: [
            { backgroundPosition: "0% 0%" },
            {
              backgroundPosition: "100% 100%",
              stagger: { from: "center", each: 0.3 },
              duration: 1,
            },
          ],
        },
        "-=1.4"
      );

      tl.to(
        ".pulsing-icon",
        {
          keyframes: [
            {
              opacity: 1,
              stagger: {
                from: "center",
                each: 0.3,
              },
              duration: 1,
            },
            {
              opacity: 0.4,
              duration: 1,
              stagger: {
                from: "center",
                each: 0.3,
              },
            },
          ],
        },
        "-=2"
      );
    },
    { scope: container }
  );

  return (
    <div
      className="mt-20 flex flex-col items-center md:flex-row"
      ref={container}
    >
      {icons.map((item, index) => (
        <React.Fragment key={index}>
          {index === Math.floor(icons.length / 2) && (
            <>
              <StylizedLogoMark />
              <div className="signal-line rotate-180 bg-gradient-to-t" />
            </>
          )}
          <Link href={socialLinks[index].url} className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-blue-50/30 bg-blue-50/25 p-3 text-3xl text-blue-100 opacity-40 md:text-4xl lg:text-5xl">
            {item && icons[index]}
          </Link>
          {index !== icons.length - 1 && (
            <div
              className={clsx(
                "signal-line",
                index >= Math.floor(icons.length / 2)
                  ? "rotate-180"
                  : "rotate-0"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
