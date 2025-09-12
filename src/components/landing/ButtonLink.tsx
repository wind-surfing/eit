import Link from "next/link";
import clsx from "clsx";

interface ButtonLinkProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function ButtonLink({
  href = "#",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "relative inline-flex h-fit w-fit rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary outline-none ring-primary/30 transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-primary/20 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-primary/40 hover:text-primary hover:bg-primary/20 after:hover:bg-opacity-15 focus:ring-2",
        className
      )}
    >
      {children}
    </Link>
  );
}
