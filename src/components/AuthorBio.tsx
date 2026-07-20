import { getAuthor } from "@/data/authors";

export default function AuthorBio({ authorId }: { authorId: string }) {
  const author = getAuthor(authorId);
  return (
    <div className="flex gap-4 items-start rounded-xl border border-slate-200 p-5 bg-slate-50">
      <div
        className="shrink-0 h-14 w-14 rounded-full flex items-center justify-center text-white font-black text-lg"
        style={{ backgroundColor: "#006491" }}
        aria-hidden
      >
        {author.avatarInitials}
      </div>
      <div>
        <p className="font-bold text-slate-900 !bg-transparent">{author.name}</p>
        <p className="text-xs uppercase tracking-wide" style={{ color: "#C8102E" }}>
          {author.role}
        </p>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{author.bio}</p>
        <p className="text-xs text-slate-500 mt-2">
          Specialties: {author.specialties.join(" · ")}
        </p>
      </div>
    </div>
  );
}
