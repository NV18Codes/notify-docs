import type { MDXComponents } from "mdx/types";
import { DocFooter } from "@/components/docs/DocFooter";
import { DocMetaStrip } from "@/components/docs/DocMetaStrip";
import { MdxLink } from "@/components/docs/MdxLink";
import { PlatformCta } from "@/components/docs/PlatformCta";
import { PreBlock } from "@/components/docs/PreBlock";
import { StepBlock } from "@/components/StepBlock";
import { TipBox } from "@/components/TipBox";
import { WarningBox } from "@/components/WarningBox";
import { cn } from "@/lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: MdxLink,
    DocFooter,
    DocMetaStrip,
    PlatformCta,
    StepBlock,
    TipBox,
    WarningBox,
    pre: (props) => <PreBlock {...props} />,
    hr: (props) => (
      <hr
        className="not-prose my-8 border-0 border-t border-notifyy-border dark:border-notifyy-borderDark"
        {...props}
      />
    ),
    img: ({ className, alt, ...props }) => (
      <img
        className={cn(
          "doc-screenshot not-prose my-4 h-auto max-w-full rounded-lg border border-notifyy-border bg-notifyy-card shadow-notifyy-md dark:border-notifyy-borderDark dark:bg-notifyy-cardDark/50",
          className,
        )}
        alt={alt ?? "Step screenshot"}
        {...props}
      />
    ),
  };
}
