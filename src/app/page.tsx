import Hero from "@/components/landing/Hero";
import Showcase from "@/components/landing/Showcase";
import MeetingPlace from "@/components/landing/MeetingPlace";
import Bento from "@/components/landing/Bento";
import Associations from "@/components/landing/Associations";
import CallToAction from "@/components/landing/CallToAction";
import Blogs from "@/components/landing/Blogs";

export default async function Index() {
  return (
    <div>
      <Hero />
      <Showcase />
      <MeetingPlace />
      <Bento />
      <Blogs />
      <Associations />
      <CallToAction />
    </div>
  );
}
