import React from "react";
import Link from "next/link";

const JoinHackClubAuthContent = () => {
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <div className="bg-primary/20 border border-primary/30 rounded-lg p-6 my-8 not-prose">
        <h3 className="text-primary mt-0 mb-4 text-xl font-semibold">
          HackClub Access Key
        </h3>
        <p className="font-mono text-xl font-bold text-primary bg-primary/20 px-6 py-3 rounded mb-4">
          BJBT230H
        </p>
        <p className="text-sm text-muted-foreground mb-0 leading-relaxed">
          Keep this key secure and do not share it with non-members.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mb-6 mt-12">
        Step-by-Step Instructions
      </h2>
      <ol className="text-lg text-muted-foreground space-y-6 leading-relaxed">
        <li>
          <strong className="text-foreground">
            Visit the HackClub Dashboard:
          </strong>
          <br />
          <span className="mt-2 block">
            Go to{" "}
            <Link
              href="https://dashboard.hackclub.com/club-dashboard/211"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline break-all"
            >
              https://dashboard.hackclub.com/club-dashboard/211
            </Link>
          </span>
        </li>
        <li>
          <strong className="text-foreground">
            Login to your HackClub account:
          </strong>
          <br />
          <span className="mt-2 block">
            If you don&apos;t have an account, create one using your email
            address.
          </span>
        </li>
        <li>
          <strong className="text-foreground">Verify your email:</strong>
          <br />
          <span className="mt-2 block">
            Check your email for a verification link and click it to verify your
            account.
          </span>
        </li>
        <li>
          <strong className="text-foreground">Join the Club:</strong>
          <br />
          <span className="mt-2 block">
            Look for the &quot;Join a Club&quot; button or option on the
            dashboard.
          </span>
        </li>
        <li>
          <strong className="text-foreground">Enter the Access Key:</strong>
          <br />
          <span className="mt-2 block">
            When prompted, enter the key:{" "}
            <code className="bg-primary/20 text-primary px-3 py-1 rounded font-mono text-base">
              BJBT230H
            </code>
          </span>
        </li>
        <li>
          <strong className="text-foreground">Complete the Process:</strong>
          <br />
          <span className="mt-2 block">
            Follow any additional prompts to complete your membership.
          </span>
        </li>
      </ol>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 my-12 not-prose">
        <h3 className="text-primary mt-0 mb-4 text-xl font-semibold">
          What&apos;s Next?
        </h3>
        <ul className="mb-0 text-lg text-muted-foreground leading-relaxed">
          <li className="flex items-center gap-4 mb-3">
            <span className="text-primary text-xl">•</span>
            <span>Introduce yourself in the general channel</span>
          </li>
          <li className="flex items-center gap-4 mb-3">
            <span className="text-primary text-xl">•</span>
            <span>Check out ongoing projects and hackathons</span>
          </li>
          <li className="flex items-center gap-4 mb-3">
            <span className="text-primary text-xl">•</span>
            <span>Join channels that match your interests</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-primary text-xl">•</span>
            <span>Start collaborating with fellow EIT members</span>
          </li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-foreground mb-6 mt-16">
        Need Help?
      </h2>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        If you encounter any issues during the registration process, reach out
        to any of our leadership team members or post in our general chat for
        assistance.
      </p>
    </div>
  );
};

export default JoinHackClubAuthContent;
