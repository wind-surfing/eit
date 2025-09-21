import Bounded from "@/components/landing/Bounded";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { JSX } from "react";
import { getBlogs } from "@/supabase/rpc/content";
import type { Blog } from "@/supabase/rpc/content";

interface CombinedBlog {
  title: string;
  description: string;
  slug: string;
  isStatic: boolean;
  featured_image?: string;
  author?: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  };
  published_at?: string;
}

const Blogs = async (): Promise<JSX.Element> => {
  const staticBlogs: CombinedBlog[] = [
    {
      title: "About EIT",
      description:
        "Learn about the Entrepreneurship and Innovation Team and meet our talented leadership and core members.",
      slug: "about-eit",
      isStatic: true,
    },
    {
      title: "How to Join HackClub",
      description:
        "Step-by-step guide for EIT members to join our exclusive HackClub community platform.",
      slug: "join-hackclub",
      isStatic: true,
    },
  ];

  let dynamicBlogs: CombinedBlog[] = [];
  try {
    const blogsResponse = await getBlogs(20, 0, true);
    if (blogsResponse.success && blogsResponse.data?.blogs) {
      dynamicBlogs = blogsResponse.data.blogs.map(
        (blog: Blog): CombinedBlog => ({
          title: blog.title,
          description: blog.description,
          slug: blog.slug,
          isStatic: false,
          featured_image: blog.featured_image,
          author: blog.author,
          published_at: blog.published_at,
        })
      );
    }
  } catch (error) {
    console.error("Failed to fetch blogs from database:", error);
  }

  const allBlogs: CombinedBlog[] = [...staticBlogs, ...dynamicBlogs];
  return (
    <Bounded data-slice-type="case-studies" data-slice-variation="default">
      <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl text-foreground">
        EIT Blogs
      </h2>

      <div className="mt-20 grid gap-16">
        {allBlogs.map((blog, index) => (
          <div
            key={blog.slug}
            className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          >
            <div className="col-span-1 flex flex-col justify-center gap-4">
              <h3 className="text-4xl text-foreground">{blog.title}</h3>
              <div className="max-w-md">
                <p className="text-muted-foreground">{blog.description}</p>
              </div>

              {blog.author && blog.published_at && (
                <div className="text-sm text-muted-foreground">
                  By {blog.author.displayName || blog.author.username} •{" "}
                  {new Date(blog.published_at).toLocaleDateString()}
                </div>
              )}

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
                  blog.isStatic
                    ? blog.slug === "about-eit"
                      ? "/lineup.svg"
                      : "/hackclub.svg"
                    : blog.featured_image || "/eit.svg"
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
