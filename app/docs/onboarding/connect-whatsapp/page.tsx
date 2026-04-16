import { redirect } from "next/navigation";

export default function LegacyOnboardingConnectRedirect() {
  redirect("/docs/connect-whatsapp");
}
