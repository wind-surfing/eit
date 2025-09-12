import { FaPager } from "react-icons/fa";
import {
  LayoutDashboard,
  Home,
  Calendar,
  FolderOpen,
  BookOpen,
  FileText,
  Info,
  LogIn,
} from "lucide-react";
import { SessionUser } from "@/types/User";
import { ComponentType } from "react";

interface CommandOption {
  value: string;
  label: string;
  link: string;
  shortCut: string;
  icon: ComponentType<{ size: number }>;
}

interface CommandGroup {
  Heading: string;
  Options: CommandOption[];
}

export const getCommandOptions = (
  user: SessionUser | null,
  UserProfileIcon: ComponentType<{ size: number }>
): CommandGroup[] => {
  const options: CommandGroup[] = [
    {
      Heading: "Pages",
      Options: [
        {
          value: "home",
          label: "Home",
          link: "/",
          shortCut: "alt h",
          icon: Home,
        },
        {
          value: "events",
          label: "Events",
          link: "/events",
          shortCut: "alt e",
          icon: Calendar,
        },
        {
          value: "projects",
          label: "Projects",
          link: "/projects",
          shortCut: "alt p",
          icon: FolderOpen,
        },
        {
          value: "resources",
          label: "Resources",
          link: "/resources",
          shortCut: "alt r",
          icon: BookOpen,
        },
        {
          value: "blogs",
          label: "Blogs",
          link: "/blogs",
          shortCut: "alt b",
          icon: FileText,
        },
        {
          value: "about",
          label: "About",
          link: "/about",
          shortCut: "alt o",
          icon: Info,
        },
      ],
    },
    {
      Heading: "User",
      Options: [
        {
          value: "dashboard",
          label: "Dashboard",
          link: "/dashboard",
          shortCut: "alt d",
          icon: LayoutDashboard,
        },
      ],
    },
  ];

  if (user?.emailVerified) {
    options[1].Options.push({
      value: "me",
      label: "Your Profile",
      link: `/user/${user?.username}`,
      shortCut: "alt u",
      icon: UserProfileIcon,
    });
  } else {
    options[0].Options.unshift(
      {
        value: "landing",
        label: "Landing",
        link: "/",
        shortCut: "alt l",
        icon: FaPager,
      },
      {
        value: "authentication",
        label: "Authentication",
        link: "/authentication",
        shortCut: "alt a",
        icon: LogIn,
      }
    );
  }

  return options;
};
