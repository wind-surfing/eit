"use client";

import Link from "next/link";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import UserAccountMenu from "@/components/navigation/UserAccountMenu";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import CommandBox from "@/components/navigation/CommandMenu";
import useUser from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import useKeyboardNavigation from "@/hooks/useKeyboardNavigation";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ButtonLink from "../landing/ButtonLink";

const navigationItems = [
  { label: "Home", link: "/", cta_button: false },
  { label: "Events", link: "/events", cta_button: false },
  { label: "Projects", link: "/projects", cta_button: false },
  { label: "Resources", link: "/resources", cta_button: false },
  { label: "Blogs", link: "/blogs", cta_button: false },
  { label: "About", link: "/about", cta_button: false },
  { label: "Join EIT", link: "/authentication", cta_button: true },
];

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuWrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuWrapperRef as React.RefObject<HTMLElement>, () =>
    setMenuVisible(false)
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        setMenuVisible((prev) => !prev);
      } else if (e.key === "Escape") {
        setMenuVisible(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  useKeyboardNavigation({
    "alt+a": "/authentication",
    "alt+l": "/",
    "alt+h": "/",
    "alt+e": "/events",
    "alt+p": "/projects",
    "alt+r": "/resources",
    "alt+b": "/blogs",
    "alt+o": "/about",
    "alt+d": "/dashboard",
    "alt+u": user?.username ? `/user/${user.username}` : "/authentication",
  });

  return (
    <>
      <div
        className={cn(
          "sticky z-[1502] top-0 inset-x-0 h-14 navbar bg-background border-b border-border"
        )}
      >
        <header className="relative">
          <div className="border-b border-border">
            <MaxWidthWrapper>
              <div className="flex h-14 items-center">
                <button
                  type="button"
                  className="block p-2 text-xl text-foreground md:hidden"
                  aria-expanded={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <MdMenu />
                  <span className="sr-only">Open menu</span>
                </button>

                <div
                  className={clsx(
                    "fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-start bg-background/95 backdrop-blur-sm pl-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
                    mobileMenuOpen ? "translate-x-0" : "translate-x-[-100%]"
                  )}
                >
                  <button
                    type="button"
                    className="fixed right-4 top-4 mb-4 block p-2 text-xl text-foreground md:hidden"
                    aria-expanded={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MdClose />
                    <span className="sr-only">Close menu</span>
                  </button>

                  <div className="grid justify-items-start gap-8">
                    {navigationItems.map((item) => {
                      if (item.cta_button && !user?.emailVerified) {
                        return (
                          <div
                            key={item.label}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <ButtonLink
                              href={item.link}
                              className="text-lg py-3 px-5"
                            >
                              {item.label}
                            </ButtonLink>
                          </div>
                        );
                      }
                      if (!item.cta_button) {
                        return (
                          <Link
                            key={item.label}
                            className="block px-3 text-2xl first:mt-8 text-foreground hover:text-primary transition-colors"
                            href={item.link}
                            onClick={() => setMobileMenuOpen(false)}
                            aria-current={
                              pathname === item.link ? "page" : undefined
                            }
                          >
                            {item.label}
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>

                <div className="mx-8 flex lg:ml-0">
                  <Link
                    href={"/"}
                    className="flex flex-row items-center justify-center gap-2"
                  >
                    <Image
                      priority
                      alt="Eit Abstract Logo"
                      src="/eit.svg"
                      width={96}
                      height={96}
                      className="h-12 w-12"
                      placeholder="blur"
                      blurDataURL="/eit.svg"
                    />
                    <span className="sr-only">EIT</span>
                  </Link>
                </div>

                <div className="hidden md:flex md:items-center md:space-x-6">
                  {navigationItems
                    .filter((item) => !item.cta_button)
                    .map((item) => (
                      <Link
                        key={item.label}
                        href={item.link}
                        className={cn(
                          "inline-flex min-h-11 items-center text-foreground hover:text-primary transition-colors",
                          pathname === item.link && "text-primary"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>

                <div className="ml-auto flex items-center gap-6">
                  <div
                    className="w-full flex-1 md:w-auto md:flex-none"
                    ref={menuWrapperRef}
                  >
                    <button
                      onClick={() => setMenuVisible((prev) => !prev)}
                      className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground p-2 relative h-8 w-8 justify-center rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none cursor-pointer"
                    >
                      <FaSearch className="h-4 w-4" />
                    </button>
                    {menuVisible && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-[1501]">
                        <CommandBox closeMenu={closeMenu} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2 lg:gap-6">
                    <span
                      className={cn(
                        user?.emailVerified ? "flex" : "hidden",
                        "lg:flex h-6 w-px bg-muted"
                      )}
                      aria-hidden="true"
                    />
                    <div className="flex flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      {user?.emailVerified ? (
                        <UserAccountMenu />
                      ) : (
                        <div className="flex items-center">
                          <ButtonLink
                            href="/authentication"
                            className="text-sm py-2 px-4"
                          >
                            Join EIT
                          </ButtonLink>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </MaxWidthWrapper>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
