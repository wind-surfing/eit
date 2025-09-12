import Bounded from "@/components/landing/Bounded";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { JSX } from "react";

const blogItems = [
  {
    title: "About EIT",
    description:
      "Learn about the Entrepreneurship and Innovation Team and meet our talented leadership and core members.",
    slug: "about-eit",
  },
  {
    title: "How to Join HackClub",
    description:
      "Step-by-step guide for EIT members to join our exclusive HackClub community platform.",
    slug: "join-hackclub",
  },
];

const Blogs = (): JSX.Element => {
  return (
    <Bounded data-slice-type="case-studies" data-slice-variation="default">
      <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl text-foreground">
        EIT Community Stories
      </h2>

      <div className="mx-auto mt-6 max-w-md text-balance text-center text-muted-foreground">
        <p>
          Discover how our community members are making an impact in the tech
          industry through collaboration and innovation.
        </p>
      </div>

      <div className="mt-20 grid gap-16">
        {blogItems.map((blog, index) => (
          <div
            key={blog.title}
            className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          >
            <div className="col-span-1 flex flex-col justify-center gap-4">
              <h3 className="text-4xl text-foreground">{blog.title}</h3>
              <div className="max-w-md">
                <p className="text-muted-foreground">{blog.description}</p>
              </div>

              <Link
                href={`/blogs/${blog.slug}`}
                className="after:absolute after:inset-0 hover:underline"
              >
                Read more about {blog.title}
              </Link>
            </div>
            <div
              className={clsx(
                "rounded-xl lg:col-span-2",
                index % 2 && "md:-order-1"
              )}
            >
              <Image
                src={
                  blog.slug === "about-eit" ? "/lineup.svg" : "/hackclub.svg"
                }
                alt={`${blog.title} blog post`}
                width={600}
                height={400}
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Blogs;
