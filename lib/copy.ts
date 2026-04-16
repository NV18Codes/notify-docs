import copy from "@/messages/en.json";

export { copy };

export function estimatedReadLabel(minutes: number): string {
  return copy.docs.estimatedRead.replace("{{count}}", String(minutes));
}
