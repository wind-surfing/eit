import Link from "next/link";

export default function Footer() {
  const navigation = [
    { label: "Authentication", link: "/authentication" },
    {
      label: "Club Dashboard",
      link: "https://dashboard.hackclub.com/club-dashboard/211",
    },
    { label: "Hack Club", link: "https://hackclub.com" },
  ];

  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-border px-8 py-7 md:flex-row bg-background">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-bold text-foreground">EIT Club</span>
        <span className="sr-only">EIT Club Home Page</span>
      </Link>
      <nav aria-label="Footer">
        <ul className="flex gap-6">
          {navigation.map((item) => (
            <li key={item.label}>
              <Link
                href={item.link}
                className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground transition-colors"
                {...(item.link.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
