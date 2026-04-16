import { DocsChrome } from "@/components/docs/DocsChrome";
import type { ReactNode } from "react";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocsChrome>{children}</DocsChrome>;
}
