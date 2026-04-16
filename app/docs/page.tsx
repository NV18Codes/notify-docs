import { docPaths, futureSectionPaths } from "@/lib/docs-nav";
import { copy } from "@/lib/copy";
import Link from "next/link";

export default function DocsHomePage() {
  return (
    <article className="doc-content max-w-3xl">
      <h1>Notifyy documentation</h1>
      <p className="lead text-zinc-600 dark:text-zinc-400">
        WhatsApp CRM and automation — setup, sending, and operations. Start with onboarding if this is your first workspace.
      </p>

      <h2>{copy.sidebar.gettingStarted}</h2>
      <ul>
        <li>
          <Link href={docPaths.onboarding}>{copy.nav.onboarding}</Link>
        </li>
        <li>
          <Link href={docPaths["connect-whatsapp"]}>{copy.nav.connectWhatsapp}</Link>
        </li>
        <li>
          <Link href={docPaths["verify-business"]}>{copy.nav.verifyBusiness}</Link>
        </li>
        <li>
          <Link href={docPaths["first-campaign"]}>{copy.nav.firstCampaign}</Link>
        </li>
        <li>
          <Link href="/docs/user-invite">{copy.nav.userInvite}</Link>
        </li>
      </ul>

      <h2>{copy.sidebar.messaging}</h2>
      <ul>
        <li>
          <Link href={futureSectionPaths.campaigns}>{copy.nav.campaigns}</Link>
        </li>
        <li>
          <Link href={futureSectionPaths.templates}>{copy.nav.whatsappTemplates}</Link>
        </li>
        <li>
          <Link href="/docs/carousel">{copy.nav.carouselTemplates}</Link>
        </li>
        <li>
          <Link href="/docs/catalog">{copy.nav.whatsappCatalog}</Link>
        </li>
      </ul>

      <h2>{copy.sidebar.automation}</h2>
      <ul>
        <li>
          <Link href={futureSectionPaths.chatbot}>{copy.nav.chatbots}</Link>
        </li>
      </ul>

      <h2>{copy.sidebar.crm}</h2>
      <ul>
        <li>
          <Link href={futureSectionPaths.contacts}>{copy.nav.contactManagement}</Link>
        </li>
        <li>
          <Link href="/docs/import">{copy.nav.importObject}</Link>
        </li>
        <li>
          <Link href="/docs/segments">{copy.nav.segments}</Link>
        </li>
        <li>
          <Link href="/docs/property">{copy.nav.propertyManagement}</Link>
        </li>
      </ul>

      <h2>{copy.sidebar.support}</h2>
      <ul>
        <li>
          <Link href="/docs/team-inbox">{copy.nav.teamInbox}</Link>
        </li>
      </ul>

      <h2>More</h2>
      <p>{copy.docs.comingSoonBody}</p>
      <ul className="text-zinc-600 dark:text-zinc-400">
        <li>
          <Link href={futureSectionPaths.crm}>{copy.nav.crm}</Link>
        </li>
      </ul>
    </article>
  );
}
