"use client";

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import useUser from "@/hooks/useUser";
import React, { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GiCrossMark } from "react-icons/gi";
import { DEFAULT_USER_DATA } from "@/config/userDefaultData";
import { useRouter } from "next/navigation";
import { User } from "@/types/User";
import { getCommandOptions } from "@/lib/commandMenuOptions";

const UserProfileIcon = ({ size }: { size: number }) => {
  const { user } = useUser();
  const { username, avatar } = (user || DEFAULT_USER_DATA) as User;

  return (
    <>
      <Avatar className="h-8 w-8">
        <AvatarImage
          alt={`${username}\'s Avatar`}
          src={avatar || "/placeholder-user.jpg"}
        ></AvatarImage>
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
    </>
  );
};

export default function CommandBox({ closeMenu }: { closeMenu: () => void }) {
  const { user } = useUser();
  const [inputValue, setInputValue] = useState("");
  const [hoverText, setHoverText] = useState("");
  const router = useRouter();

  const GroupOptions = useMemo(
    () => getCommandOptions(user, UserProfileIcon),
    [user]
  );

  const handleSelect = (link: string) => {
    router.push(link);
    closeMenu();
  };
  const isGoToPath =
    inputValue.startsWith(">") || inputValue.startsWith("goto:");
  const path = isGoToPath
    ? inputValue.startsWith(">")
      ? inputValue.replace(">", "").trim()
      : inputValue.replace("goto:", "").trim()
    : "";

  const filteredGroupOptions = useMemo(() => {
    if (isGoToPath || !inputValue.trim()) {
      return GroupOptions;
    }

    return GroupOptions.map((group) => ({
      ...group,
      Options: group.Options.filter(
        (option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
          option.value.toLowerCase().includes(inputValue.toLowerCase())
      ),
    })).filter((group) => group.Options.length > 0);
  }, [GroupOptions, inputValue, isGoToPath]);

  return (
    <Command
      className="w-[90vw] sm:w-[74vw] lg:w-[46vw] rounded-lg pt-1 pb-4 px-1 bg-background dark:bg-background"
      shouldFilter={false}
    >
      {" "}
      <div className="w-full flex flex-row items-center px-4">
        <div className="flex-1">
          <CommandInput
            className="py-6 bg-transparent focus:bg-transparent border-none focus:border-none focus:ring-0 w-full"
            autoFocus
            placeholder={"Type a command or search..."}
            value={inputValue}
            onValueChange={setInputValue}
          />
        </div>
        <button
          onClick={closeMenu}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground p-2 rounded-full ml-2"
        >
          <GiCrossMark />
        </button>
      </div>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {isGoToPath && (
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => handleSelect(path)}
              value={path}
              className="py-[10px] px-[8px] mx-[8px] rounded-md cursor-pointer"
            >
              Go to &quot;{path}&quot;
            </CommandItem>
          </CommandGroup>
        )}
        {!isGoToPath &&
          filteredGroupOptions.map((GroupOption, index) => (
            <React.Fragment key={`${GroupOption.Heading}-${index}`}>
              <CommandGroup heading={GroupOption.Heading}>
                {GroupOption.Options.map((option) => {
                  const Icon = option.icon;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.link)}
                      onMouseMove={() => setHoverText(option.value)}
                      onFocus={() => setHoverText(option.value)}
                      className="py-[10px] px-[8px] mx-[8px] rounded-md cursor-pointer"
                    >
                      <div className="flex flex-row gap-[10px] justify-between items-center">
                        <Icon size={14}></Icon>
                        {option.label}
                      </div>
                      <CommandShortcut>
                        <kbd className="font-mono">
                          {hoverText === option.value
                            ? `Jump to ${option.label}`
                            : option.shortCut}
                        </kbd>
                      </CommandShortcut>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {index < GroupOptions.length - 1 && <CommandSeparator />}
            </React.Fragment>
          ))}
      </CommandList>
    </Command>
  );
}
