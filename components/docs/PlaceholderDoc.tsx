import { copy } from "@/lib/copy";

type Props = {
  title: string;
};

export function PlaceholderDoc({ title }: Props) {
  return (
    <div className="space-y-4">
      <h1>{title}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">{copy.docs.comingSoon}</p>
      <p>{copy.docs.comingSoonBody}</p>
    </div>
  );
}
