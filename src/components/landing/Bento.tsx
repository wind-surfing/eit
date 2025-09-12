import Bounded from "@/components/landing/Bounded";
import clsx from "clsx";
import Image from "next/image";
import { JSX } from "react";

const bentoItems = [
  {
    title: "Project Showcase",
    description:
      "Share your projects with the community and get feedback from fellow developers. Build your portfolio and gain recognition.",
  },
  {
    title: "Resource Library",
    description:
      "Access a curated collection of learning materials, tutorials, and tools shared by the community to accelerate your learning.",
  },
  {
    title: "Wall of Fame",
    description:
      "Earn badges and recognition for your contributions. Get featured on our wall of fame for outstanding achievements.",
  },
  {
    title: "Community Events",
    description:
      "Join hackathons, workshops, and networking events. Connect with like-minded individuals and grow your professional network.",
  },
];

const Bento = (): JSX.Element => {
  return (
    <Bounded data-slice-type="bento" data-slice-variation="default">
      <h2 className="text-balance text-center text-5xl font-medium md:text-7xl">
        <span className="text-foreground">The ultimate </span>
        <span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text not-italic text-transparent">
          IT Community.
        </span>
      </h2>

      <div className="mx-auto mt-6 max-w-md text-balance text-center text-muted-foreground">
        <p>
          Experience a new way of learning, sharing, and growing together in the
          IT field.
        </p>
      </div>

      <div className="mt-16 grid max-w-4xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
        {bentoItems.map((item, index) => (
          <div
            className={clsx(
              "glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-card to-card/80 border border-border p-4",
              index === 1 || index === 2 ? "md:col-span-2" : "md:col-span-1"
            )}
            key={item.title}
          >
            <h3 className="text-2xl text-foreground">{item.title}</h3>
            <div className="max-w-md text-balance text-muted-foreground">
              <p>{item.description}</p>
            </div>
            <Image
              src={`/${index + 1}.avif`}
              alt={item.title}
              width={400}
              height={300}
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Bento;
