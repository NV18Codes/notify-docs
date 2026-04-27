import type { MDXComponents } from "mdx/types";
import { DocFooter } from "@/components/docs/DocFooter";
import { DocMetaStrip } from "@/components/docs/DocMetaStrip";
import { DocsVideo } from "@/components/docs/DocsVideo";
import { MdxImage } from "@/components/docs/MdxImage";
import { MdxLink } from "@/components/docs/MdxLink";
import { PlatformCta } from "@/components/docs/PlatformCta";
import { PreBlock } from "@/components/docs/PreBlock";
import { StepBlock } from "@/components/StepBlock";
import { TipBox } from "@/components/TipBox";
import { WarningBox } from "@/components/WarningBox";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: MdxLink,
    DocFooter,
    DocMetaStrip,
    DocsVideo,
    PlatformCta,
    StepBlock,
    TipBox,
    WarningBox,
    pre: (props) => <PreBlock {...props} />,
    hr: (props) => (
      <hr className="not-prose my-8 border-0 border-t border-gray-200 dark:border-slate-700/80" {...props} />
    ),
    img: (props) => <MdxImage {...props} />,
  };
}
