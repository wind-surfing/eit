import Bounded from "@/components/landing/Bounded";

type RichTextProps = {
  slice: {
    content: string;
  };
};

export default function RichText({ slice }: RichTextProps) {
  return (
    <Bounded>
      <div className="prose prose-lg prose-slate prose-invert">
        <p>{slice.content}</p>
      </div>
    </Bounded>
  );
}
