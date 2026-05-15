import { redirect } from "next/navigation";

/** Redirect legacy Property Management URL to Fields docs. */
export default function PropertyPage() {
  redirect("/docs/fields");
}
