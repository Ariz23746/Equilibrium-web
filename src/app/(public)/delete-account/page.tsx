import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  alternates: { canonical: "/delete-account" },
  title: "Delete Your Account | Equilibrium",
  description: "How to delete your Equilibrium account and data, in the app or by email, and what gets deleted.",
};

export default function DeleteAccountPage() {
  return (
    <LegalPage title="Delete your account" updated="9 October 2026">
      <p>
        You can delete your Equilibrium account and all the data in it at any time. There are two ways to do it. Deletion is
        permanent and can&apos;t be undone.
      </p>

      <div className="rounded-3xl bg-bg-card border border-border-subtle shadow-bento p-7 md:p-8">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-2">
          Option 1 · Recommended
        </p>
        <p className="font-serif text-2xl text-text-primary mb-4">Delete it in the app</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Open Equilibrium and go to your <strong>Profile</strong>.</li>
          <li>
            Scroll to the bottom and tap <strong>Delete Account &amp; ALL Data</strong>.
          </li>
          <li>
            Tap <strong>Confirm Delete</strong>.
          </li>
        </ol>
        <p className="mt-4 text-base">Your account and data are deleted straight away and you&apos;re signed out.</p>
      </div>

      <div className="rounded-3xl bg-bg-card border border-border-subtle shadow-bento p-7 md:p-8">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-2">Option 2</p>
        <p className="font-serif text-2xl text-text-primary mb-4">Ask by email</p>
        <p>
          No longer have the app? Email{" "}
          <a href="mailto:hq.equilibrium.ai@gmail.com?subject=Delete%20my%20Equilibrium%20account">
            hq.equilibrium.ai@gmail.com
          </a>{" "}
          from the address you signed up with (or tell us that address), with the subject &ldquo;Delete my account&rdquo;. We
          delete it within 7 days and reply to confirm.
        </p>
        <p className="mt-3 text-base">
          Signed in with Apple using &ldquo;Hide My Email&rdquo;? Mention that, and we&apos;ll help you find the right account.
        </p>
      </div>

      <h2>What gets deleted</h2>
      <ul>
        <li>Your profile: name, email address, username and profile photo link</li>
        <li>All your expenses, categories and budgets</li>
        <li>Your monthly Money Story reports</li>
        <li>Merchant-to-category shortcuts the app learned for you</li>
        <li>Feedback you sent from the app</li>
        <li>Your notification token, so reminders stop</li>
        <li>Your place on the leaderboard</li>
      </ul>

      <h2>What isn&apos;t deleted, and why</h2>
      <ul>
        <li>
          <strong>Subscriptions:</strong> deleting your account does <strong>not</strong> cancel Equilibrium Pro. Cancel it in
          your App Store or Google Play subscription settings. Apple and Google keep their own purchase records.
        </li>
        <li>
          <strong>Usage analytics:</strong> records of which app features were used (held by PostHog) are deleted
          automatically within 12 months.
        </li>
        <li>
          <strong>Profile photo file:</strong> if you uploaded a photo, the image file itself is stored with our image host.
          Mention it in your email and we&apos;ll remove it as well.
        </li>
      </ul>

      <p>
        More about what we collect is in our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
