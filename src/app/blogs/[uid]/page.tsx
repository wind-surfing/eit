import { Metadata } from "next";
import { notFound } from "next/navigation";
import Bounded from "@/components/landing/Bounded";
import StarGrid from "@/components/landing/StarGrid";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { getBlogBySlug } from "@/supabase/rpc/content";
import AuthRequiredContent from "@/components/blogs/AuthRequiredContent";
import AboutEITContent from "@/components/blogs/AboutEITContent";
import JoinHackClubContent from "@/components/blogs/JoinHackClubContent";
import JoinHackClubAuthContent from "@/components/blogs/JoinHackClubAuthContent";

type Params = { uid: string };

const staticBlogs = {
  "about-eit": {
    title: "About EIT",
    description:
      "Learn about the Entrepreneurship and Innovation Team and our mission to foster tech innovation.",
    content: AboutEITContent,
    featuredImage: "/lineup.svg",
  },
  "join-hackclub": {
    title: "How to Join HackClub",
    description:
      "Step-by-step guide for EIT members to join our HackClub community.",
    content: JoinHackClubContent,
    requiresAuth: true,
    authContent: JoinHackClubAuthContent,
    featuredImage: "/hackclub.svg",
  },
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;

  const staticBlog = staticBlogs[uid as keyof typeof staticBlogs];

  if (staticBlog) {
    const ContentComponent = staticBlog.content;

    return (
      <Bounded as="article">
        <Link
          href="/blogs"
          className="mb-8 inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
        >
          <FaArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>

        <div className="relative grid place-items-center text-center">
          <StarGrid />
          <h1 className="text-7xl font-medium text-foreground">
            {staticBlog.title}
            <p className="text-lg text-primary">Blog Post</p>
          </h1>
          <p className="mb-4 mt-8 max-w-xl text-lg text-muted-foreground">
            {staticBlog.description}
          </p>
          <div className="mt-8 overflow-hidden rounded-xl">
            <img
              src={staticBlog.featuredImage}
              alt={`${staticBlog.title} blog post`}
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <ContentComponent />

          {"requiresAuth" in staticBlog &&
            staticBlog.requiresAuth &&
            "authContent" in staticBlog &&
            staticBlog.authContent && (
              <AuthRequiredContent
                fallback={
                  <Link
                    href="/authentication"
                    className="text-primary hover:text-primary/80 underline"
                  >
                    Login to view full content
                  </Link>
                }
              >
                <staticBlog.authContent />
              </AuthRequiredContent>
            )}
        </div>
      </Bounded>
    );
  }

  try {
    const result = await getBlogBySlug(uid);

    if (result.success && result.blog) {
      const blog = result.blog;

      return (
        <Bounded as="article">
          <Link
            href="/blogs"
            className="mb-8 inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
          >
            <FaArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>

          <div className="w-full relative grid place-items-center text-center">
            <StarGrid />
            <h1 className="text-7xl font-medium text-foreground">
              {blog.title}
              <p className="text-lg text-primary">Blog Post</p>
            </h1>
            <p className="mb-4 mt-8 max-w-xl text-lg text-muted-foreground">
              {blog.description}
            </p>
            {blog.featured_image && (
              <div className="mt-8 overflow-hidden rounded-xl">
                <img
                  src={blog.featured_image}
                  alt={`${blog.title} blog post`}
                  className="h-auto w-full"
                />
              </div>
            )}
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            {blog.content_type === "html" ? (
              <div
                className="prose prose-lg prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            ) : (
              <div className="prose prose-lg prose-invert max-w-none">
                <pre>{blog.content}</pre>
              </div>
            )}

            {blog.author && (
              <div className="mt-8 border-t border-muted/30 pt-8">
                <div className="flex items-center gap-4">
                  {blog.author.avatar && (
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.displayName || blog.author.username}
                      className="h-12 w-12 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium text-foreground">
                      {blog.author.displayName || blog.author.username}
                    </p>
                    <p className="text-sm text-muted-foreground">Author</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Bounded>
      );
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
  }

  notFound();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;

  const staticBlog = staticBlogs[uid as keyof typeof staticBlogs];
  if (staticBlog) {
    return {
      title: `${staticBlog.title} | EIT Community Blog`,
      description: staticBlog.description,
    };
  }

  try {
    const result = await getBlogBySlug(uid);
    if (result.success && result.blog) {
      return {
        title: `${result.blog.title} | EIT Community Blog`,
        description: result.blog.description || "EIT Community Blog Post",
      };
    }
  } catch (error) {
    console.error("Error fetching blog for metadata:", error);
  }

  return {
    title: "Blog Post Not Found",
    description: "The requested blog post could not be found.",
  };
}

export async function generateStaticParams() {
  const staticSlugs = Object.keys(staticBlogs);

  return staticSlugs.map((uid) => ({
    uid,
  }));
}
