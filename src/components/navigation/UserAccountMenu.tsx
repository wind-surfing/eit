"use client";

import { ChangeEvent, useState } from "react";
import type { ComponentType } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUser from "@/hooks/useUser";
import { MdOutlineZoomOutMap, MdOutlineZoomInMap } from "react-icons/md";
import VerificationBadge from "@/components/shared/VerificationBadge";
import { DEFAULT_USER_DATA } from "@/config/userDefaultData";
import {
  Home,
  LayoutDashboard,
  User,
  Calendar,
  FolderOpen,
  BookOpen,
  FileText,
  Info,
  LogIn,
} from "lucide-react";

const UserAccountMenu = () => {
  const { user, loading, logoutUser } = useUser();
  const { username, avatar } = user || DEFAULT_USER_DATA;

  const [correctUsername, setCorrectUsername] = useState("");
  async function signOutFromDevice() {
    await signOut();
    logoutUser();
  }

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false));
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
          <div className="h-auto w-full flex flex-row items-center gap-2">
            {loading ? (
              <>
                <div className="flex items-center space-x-2">
                  <div className="animate-pulse rounded-full bg-muted h-12 w-12"></div>
                </div>
              </>
            ) : (
              <>
                <Avatar className="relative cursor-pointer">
                  <AvatarImage
                    className="unselectable"
                    src={avatar || "/placeholder-user.jpg"}
                    alt={username + "'s Avatar"}
                  />
                  <AvatarFallback className="unselectable">
                    {username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </>
            )}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-60" align="end">
          <div className="flex items-center justify-usert gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              <p className="font-bold text-sm">
                <Link
                  href={`/user/${username}`}
                  className="h-auto w-full flex flex-row items-center gap-1"
                >
                  <VerificationBadge
                    user={user}
                    size="14"
                    sizeOfLogo={10}
                    tooltip={true}
                  />
                </Link>
              </p>
            </div>
          </div>

          <DropdownMenuSeparator />

          {(() => {
            const menuLookup: Record<
              string,
              {
                label: string;
                href: string;
                icon: ComponentType<{ className?: string }>;
              }
            > = {
              home: { label: "Home", href: "/home", icon: Home },
              events: { label: "Events", href: "/events", icon: Calendar },
              projects: {
                label: "Projects",
                href: "/projects",
                icon: FolderOpen,
              },
              resources: {
                label: "Resources",
                href: "/resources",
                icon: BookOpen,
              },
              blogs: { label: "Blogs", href: "/blogs", icon: FileText },
              about: { label: "About", href: "/about", icon: Info },
              authentication: {
                label: "Authentication",
                href: "/authentication",
                icon: LogIn,
              },
              profile: { label: "Profile", href: "/profile", icon: User },
              dashboard: {
                label: "Dashboard",
                href: "/dashboard",
                icon: LayoutDashboard,
              },
            };

            const order = [
              "home",
              "events",
              "projects",
              "resources",
              "blogs",
              "about",
            ] as const;

            const userOrder = user?.emailVerified
              ? ["profile", "dashboard"]
              : (["authentication"] as const);

            return (
              <>
                {order.map((key) => {
                  const Item = menuLookup[key];
                  const Icon = Item.icon;
                  return (
                    <DropdownMenuItem asChild key={key}>
                      <Link
                        href={Item.href}
                        className="h-auto w-full flex flex-row items-center gap-2 cursor-pointer"
                      >
                        <Icon className="text-primary/80 hover:text-primary" />
                        {Item.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                {userOrder.map((key) => {
                  const Item = menuLookup[key];
                  const Icon = Item.icon;
                  return (
                    <DropdownMenuItem asChild key={key}>
                      <Link
                        href={Item.href}
                        className="h-auto w-full flex flex-row items-center gap-2 cursor-pointer"
                      >
                        <Icon className="text-primary/80 hover:text-primary" />
                        {Item.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </>
            );
          })()}

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <div onClick={toggleFullscreen}>
              <div className="hidden sm:flex h-auto w-full flex-row items-center gap-2 cursor-pointer">
                {isFullscreen ? (
                  <MdOutlineZoomInMap className="text-primary/80 hover:text-primary" />
                ) : (
                  <MdOutlineZoomOutMap className="text-primary/80 hover:text-primary" />
                )}
                {isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="hidden sm:flex" />

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="cursor-pointer text-primary/80 hover:text-primary  w-full border-none"
              >
                Logout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are you sure to Logout?</DialogTitle>
                <DialogDescription>
                  {`Type "${username}" to Logout from this device.`}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    className="col-span-3"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCorrectUsername(e.target.value)
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => signOutFromDevice()}
                  disabled={correctUsername !== username}
                >
                  Logout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAccountMenu;
