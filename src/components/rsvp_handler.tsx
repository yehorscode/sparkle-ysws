import { toast } from "sonner";

const rsvpHelperApiKey = "rsvpk_jqtgPur85swbADCjzvjpXBUCo01dLsPR";

export default async function rsvp_handler(email: string) {
  if (!email.includes("@")) {
    toast.error("Please enter a valid email address");
    return;
  }
  if (!email.includes(".")) {
    toast.error("Please enter a valid email address");
    return;
  }

  const searchParams = new URLSearchParams({
    email,
  });

  try {
    const response = await fetch(
      "https://rsvphelper.anscg.net/api/v1/slack/users/by-email",
      {
        method: "POST",
        headers: {
          "x-api-key": rsvpHelperApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails: [email] }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `RSVP helper lookup failed with status ${response.status}`,
      );
    }

    const data: {
      results?: Array<{
        ok?: boolean;
        found?: boolean;
        slackId?: string;
        realName?: string;
      }>;
    } = await response.json();

    const firstResult = data.results?.[0];

    if (firstResult?.ok && firstResult.found) {
      if (firstResult.realName) {
        searchParams.set("name", firstResult.realName);
      }
      if (firstResult.slackId) {
        searchParams.set("slackid", firstResult.slackId);
      }
    }
  } catch (error) {
    console.error("RSVP helper lookup failed", error);
  }

  window.location.href = `https://forms.fillout.com/t/e2tRAi4Lh4us?${searchParams.toString()}`;
}
