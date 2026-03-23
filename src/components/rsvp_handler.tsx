import { toast } from "sonner";

export default function rsvp_handler(email: string) {
  if (!email.includes("@")) {
    toast.error("Please enter a valid email address");
    return;
  }
  if (!email.includes(".")) {
    toast.error("Please enter a valid email address");
    return;
  }

  const searchParams = new URLSearchParams({ email });
  window.location.href = `https://forms.fillout.com/t/e2tRAi4Lh4us?${searchParams.toString()}`;
}
