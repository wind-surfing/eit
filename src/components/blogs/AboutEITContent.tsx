import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa6";

const teamData = {
  leadership: [
    {
      name: "Shishir Bashyal",
      role: "President",
      specialization: "AI/ML, Overstack, UI/UX",
      image: "/team/shishir.jpg",
      social: {
        github: "wind-surfing",
        website: "eit.neploom.com",
      },
    },
    {
      name: "Pratish Subedi",
      role: "Co-President",
      specialization: "AI Automation, Fullstack",
      image: "/team/pratish.jpg",
      social: {},
    },
    {
      name: "Suved Gewali",
      role: "Co-President",
      specialization: "Hardware Expert, UI/UX",
      image: "/team/suved.jpg",
      social: {},
    },
    {
      name: "Pujan Pandey",
      role: "Secretary",
      specialization: "Quantum, AI/ML",
      image: "/team/pujan.jpg",
      social: {},
    },
    {
      name: "Sambhav Aryal",
      role: "Co-Secretary",
      specialization: "UI/UX, Overstack, AI Engineer",
      image: "/team/sambhav.jpg",
      social: {
        github: "Echoinbyte",
        linkedin: "echoinbyte",
        website: "starbyte.neploom.com",
      },
    },
    {
      name: "Rijan",
      role: "Treasurer",
      specialization: "UI/UX, Fullstack",
      image: "/team/rijan.jpg",
      social: {
        website: "bentotodo.netlify.app"
      },
    },
  ],
  members: [
    {
      name: "Subodh",
      specialization: "Frontend Developer",
      image: "/team/subodh.jpg",
      social: {},
    },
    {
      name: "Pawan",
      specialization: "Django Specialist",
      image: "/team/pawan.jpg",
      social: {},
    },
    {
      name: "Roshan",
      specialization: "UI/UX Designer",
      image: "/team/roshan.jpg",
      social: {},
    },
  ],
};

interface SocialMediaLinks {
  github?: string;
  linkedin?: string;
  website?: string;
}

const SocialLinks = ({
  social,
  name,
}: {
  social: SocialMediaLinks;
  name: string;
}) => {
  if (!social || Object.keys(social).length === 0) return null;

  return (
    <div className="flex justify-center gap-3 mt-3">
      {social.github && (
        <Link
          href={`https://github.com/${social.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors"
          aria-label={`${name} GitHub`}
        >
          <FaGithub size={18} />
        </Link>
      )}
      {social.linkedin && (
        <Link
          href={`https://linkedin.com/in/${social.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors"
          aria-label={`${name} LinkedIn`}
        >
          <FaLinkedin size={18} />
        </Link>
      )}
      {social.website && (
        <Link
          href={`https://${social.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors"
          aria-label={`${name} Website`}
        >
          <FaGlobe size={18} />
        </Link>
      )}
    </div>
  );
};

const AboutEITContent = () => {
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-foreground mb-6">
        About EIT (Entrepreneurship and Innovation Team)
      </h2>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        The Entrepreneurship and Innovation Team (EIT) is a dynamic community of
        tech enthusiasts, innovators, and future entrepreneurs dedicated to
        fostering innovation, collaboration, and technological advancement.
      </p>

      <h2 className="text-3xl font-bold text-foreground mb-6 mt-12">
        Our Mission
      </h2>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        We strive to create an environment where students and professionals can
        collaborate on cutting-edge projects, share knowledge, and build the
        future of technology together.
      </p>

      <h2 className="text-3xl font-bold text-foreground mb-8 mt-16">
        Team Lineup
      </h2>

      <h3 className="text-2xl font-semibold text-foreground mb-8 mt-12">
        Leadership Team
      </h3>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12 not-prose">
        {teamData.leadership.map((member) => (
          <div
            key={member.name}
            className="rounded-xl bg-primary/10 p-6 border border-primary/20 text-center"
          >
            <div className="mb-4 flex justify-center aspect-[15/12]">
              <Image
                src={member.image}
                alt={member.name}
                width={100}
                height={100}
                className="rounded-xl object-cover w-full"
              />
            </div>
            <h4 className="text-xl font-semibold text-primary mb-3">
              {member.role}
            </h4>
            <p className="text-lg font-medium text-foreground mb-2">
              {member.name}
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              {member.specialization}
            </p>
            <SocialLinks social={member.social} name={member.name} />
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-semibold text-foreground mb-8 mt-16">
        Core Members
      </h3>
      <div className="grid gap-8 md:grid-cols-3 mb-12 not-prose">
        {teamData.members.map((member) => (
          <div
            key={member.name}
            className="rounded-xl bg-muted/20 p-6 border border-muted/30 text-center"
          >
            <div className="mb-4 flex justify-center">
              <Image
                src={member.image}
                alt={member.name}
                width={80}
                height={80}
                className="rounded-xl object-cover"
              />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              {member.name}
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              {member.specialization}
            </p>
            <SocialLinks social={member.social} name={member.name} />
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-foreground mb-6 mt-16">
        What We Do
      </h2>
      <div className="not-prose">
        <ul className="text-lg text-muted-foreground space-y-3 mb-8 leading-relaxed">
          <li className="flex items-center gap-4">
            <span className="text-primary text-xl">•</span>
            <span>Organize workshops and technical sessions</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-primary text-xl">•</span>
            <span>Collaborate on innovative projects</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-primary text-xl">•</span>
            <span>Mentor and support emerging tech talent</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-primary text-xl">•</span>
            <span>Build connections within the tech community</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-primary text-xl">•</span>
            <span>Foster entrepreneurship and innovation</span>
          </li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-foreground mb-6 mt-16">
        Join Our Community
      </h2>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        Interested in becoming part of EIT? We welcome passionate individuals
        who are eager to learn, collaborate, and make an impact in the world of
        technology and innovation.
      </p>
    </div>
  );
};

export default AboutEITContent;
