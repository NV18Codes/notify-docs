import { redirect } from "next/navigation";

export default function LegacyOnboardingVerifyBusinessRedirect() {
  redirect("/docs/verify-business");
}
