"use client";

import React, { useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Bounded from "@/components/landing/Bounded";
import StarGrid from "@/components/landing/StarGrid";
import VerificationBadge from "@/components/shared/VerificationBadge";
import {
  AtSign,
  User,
  FileText,
  Shield,
  BookOpen,
  FolderOpen,
  Library,
  Award,
  ExternalLink,
  Github,
  CalendarDays,
} from "lucide-react";

export type UserSummary = {
  id: string;
  username: string;
  displayName?: string | null;
  bio: string | null;
  avatar: string | null;
  role: string;
  skills: string[];
  createdAt: string;
};

export type UserPublicProfile = {
  user: UserSummary;
  blogs: Array<{
    id: string;
    title: string;
    description: string;
    slug: string;
    featured_image?: string;
    tags: string[];
    created_at: string;
    published_at?: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    deployed_url?: string;
    code_url?: string;
    screenshots: string[];
    tags: string[];
    creators: string[];
    creator_roles: Record<string, string>;
    created_at: string;
    approved_at?: string;
  }>;
  resources: Array<{
    id: string;
    title: string;
    description: string;
    resource_type: string;
    url: string;
    difficulty_level?: string;
    tags: string[];
    created_at: string;
  }>;
  events: Array<{
    id: string;
    title: string;
    description: string;
    event_type: string;
    mode: string;
    start_date: string;
    end_date?: string;
    location?: string;
    registration_deadline?: string;
    max_participants?: number;
    tags: string[];
    created_at: string;
  }>;
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon?: string;
    color?: string;
  }>;
};

export default function UsersProfilePublic({
  profile,
}: {
  profile: UserPublicProfile;
}) {
  const {
    user,
    blogs = [],
    projects = [],
    resources = [],
    events = [],
    badges = [],
  } = profile;

  const contentTabs = [
    "Blogs",
    "Projects",
    "Resources",
    "Events",
    "About",
  ] as const;
  const [activeTab, setActiveTab] =
    useState<(typeof contentTabs)[number]>("Blogs");

  const counts = useMemo(
    () => ({
      blogs: blogs?.length ?? 0,
      projects: projects?.length ?? 0,
      resources: resources?.length ?? 0,
      events: events?.length ?? 0,
      badges: badges?.length ?? 0,
      about: 4, // Basic Data, Skills, Socials, Badges sections
    }),
    [blogs, projects, resources, events, badges]
  );

  return (
    <div className="w-full min-h-screen relative">
      <StarGrid />
      <Bounded className="py-20">
        <div className="w-full">
          <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center">
              <div className="relative h-36 w-36 flex items-center justify-center rounded-full p-1">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4f7cff] to-blue-500 rounded-full p-4" />
                <div className="relative bg-white dark:bg-black h-full w-full rounded-full flex items-center justify-center">
                  <Avatar className="h-32 w-32 border">
                    <AvatarImage
                      src={user.avatar || undefined}
                      alt={`${user.username}'s avatar`}
                    />
                    <AvatarFallback>
                      {user.displayName?.charAt(0) || user.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl flex items-center flex-wrap gap-2 md:gap-3">
                    <VerificationBadge
                      user={{
                        username: user.username,
                        displayName: user.displayName || undefined,
                        emailVerified: true,
                      }}
                      size={24}
                      tooltip={true}
                    />
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    @{user.username}
                  </p>
                  {user.bio && (
                    <p className="text-base text-gray-700 dark:text-gray-300 mt-2">
                      {user.bio}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-1">
                    <Shield className="h-4 w-4" /> Role:{" "}
                    <strong>
                      {user.role?.replace("_", " ").toUpperCase()}
                    </strong>
                  </span>
                </div>

                {user.skills && user.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {badges && badges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Badges:
                    </span>
                    {badges.map((badge) => (
                      <span
                        key={badge.id}
                        className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full"
                        title={badge.description}
                      >
                        <Award className="h-3 w-3" />
                        {badge.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-1 border-b">
                {contentTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                      activeTab === tab
                        ? "border-[#4f7cff] text-[#4f7cff]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab} (
                    {tab === "About"
                      ? counts.about
                      : counts[tab.toLowerCase() as keyof typeof counts]}
                    )
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeTab === "Blogs" ? (
            <div className="py-6">
              <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-white dark:bg-gray-800 border-t-2 border-b-2 border-gray-100 dark:border-gray-700 p-6"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {blog.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>
                          {new Date(blog.created_at).toLocaleDateString()}
                        </span>
                        <a
                          href={`/blogs/${blog.slug}`}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          Read More <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                {blogs.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No blogs published yet.
                  </p>
                )}
              </div>
            </div>
          ) : activeTab === "Projects" ? (
            <div className="py-6">
              <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white dark:bg-gray-800 border-t-2 border-b-2 border-gray-100 dark:border-gray-700 p-6"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 mb-4">
                        {project.code_url && (
                          <a
                            href={project.code_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1 bg-gray-900 text-white text-sm rounded"
                          >
                            <Github className="h-3 w-3" />
                            Code
                          </a>
                        )}
                        {project.deployed_url && (
                          <a
                            href={project.deployed_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Live
                          </a>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Created:{" "}
                        {new Date(project.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
                {projects.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No projects available yet.
                  </p>
                )}
              </div>
            </div>
          ) : activeTab === "Resources" ? (
            <div className="py-6">
              <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="bg-white dark:bg-gray-800 border-t-2 border-b-2 border-gray-100 dark:border-gray-700 p-6"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded">
                          {resource.resource_type}
                        </span>
                        {resource.difficulty_level && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                            {resource.difficulty_level}
                          </span>
                        )}
                      </div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mb-2"
                      >
                        View Resource <ExternalLink className="h-3 w-3" />
                      </a>
                      <div className="text-sm text-gray-500">
                        Created:{" "}
                        {new Date(resource.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
                {resources.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No resources shared yet.
                  </p>
                )}
              </div>
            </div>
          ) : activeTab === "Events" ? (
            <div className="py-6">
              <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white dark:bg-gray-800 border-t-2 border-b-2 border-gray-100 dark:border-gray-700 p-6"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                          {event.event_type}
                        </span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                          {event.mode}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div>
                          Start:{" "}
                          {new Date(event.start_date).toLocaleDateString()}
                        </div>
                        {event.end_date && (
                          <div>
                            End: {new Date(event.end_date).toLocaleDateString()}
                          </div>
                        )}
                        {event.location && (
                          <div>Location: {event.location}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {events.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No events organized yet.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full py-6">
              <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Basic Data Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#4f7cff] dark:text-[#4f7cff] mb-4 pl-10">
                    Basic Data
                  </h3>
                  <div className="bg-white dark:bg-gray-800 border-t-2 border-b-2 border-gray-100 dark:border-gray-700 overflow-hidden">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <User className="h-4 w-4 text-[#4f7cff]" />
                            Display Name
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            <VerificationBadge
                              user={{
                                username: user.username,
                                displayName: user.displayName || undefined,
                                emailVerified: true, // You can adjust this based on actual verification status
                              }}
                              size={14}
                              tooltip={true}
                            />
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <AtSign className="h-4 w-4 text-[#4f7cff]" />
                            Username
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            @{user.username}
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-[#4f7cff]" />
                            Bio
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {user.bio || "No bio provided"}
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-[#4f7cff]" />
                            Role
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {user.role?.replace("_", " ").toUpperCase()}
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-[#4f7cff]" />
                            Total Blogs
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {counts.blogs}
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <FolderOpen className="h-4 w-4 text-[#4f7cff]" />
                            Total Projects
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {counts.projects}
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <Library className="h-4 w-4 text-[#4f7cff]" />
                            Total Resources
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {counts.resources}
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-[#4f7cff]" />
                            Total Events
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {counts.events}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#4f7cff] dark:text-[#4f7cff] mb-4 pl-10">
                    Skills
                  </h3>
                  <div className="bg-white dark:bg-gray-800 border-t-2 border-b-2 border-gray-100 dark:border-gray-700 p-6">
                    {user.skills && user.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {user.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No skills listed yet
                      </p>
                    )}
                  </div>
                </div>

                {/* Socials Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#4f7cff] dark:text-[#4f7cff] mb-4 pl-10">
                    Socials
                  </h3>
                  <div className="bg-white dark:bg-gray-800 border-t-2 border-b-2 border-gray-100 dark:border-gray-700 p-6">
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      Social links not available yet
                    </p>
                  </div>
                </div>

                {/* Badges Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#4f7cff] dark:text-[#4f7cff] mb-4 pl-10">
                    Badges
                  </h3>
                  <div className="bg-white dark:bg-gray-800 border-t-2 border-b-2 border-gray-100 dark:border-gray-700 p-6">
                    {badges && badges.length > 0 ? (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {badges.map((badge) => (
                          <div
                            key={badge.id}
                            className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border border-yellow-200 dark:border-yellow-700"
                          >
                            <div className="flex-shrink-0">
                              <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                                {badge.name}
                              </p>
                              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                                {badge.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No badges earned yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Bounded>
    </div>
  );
}
