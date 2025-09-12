import React from "react";

const JoinHackClubContent = () => {
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-foreground mb-6">
        Welcome to EIT HackClub!
      </h2>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        HackClub is our exclusive community platform where EIT members
        collaborate, share projects, and participate in hackathons and coding
        challenges.
      </p>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 my-8 not-prose">
        <h3 className="text-primary mt-0 mb-3 text-xl font-semibold">
          Member Access Required
        </h3>
        <p className="mb-0 text-muted-foreground leading-relaxed">
          The following information is only available to authenticated EIT
          members with member access or higher.
        </p>
      </div>
    </div>
  );
};

export default JoinHackClubContent;
