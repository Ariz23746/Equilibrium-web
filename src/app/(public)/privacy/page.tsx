import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy | Equilibrium",
  description: "What Equilibrium collects, why, who processes it, and how to delete your data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="9 October 2026">
      <p>
        Equilibrium is an expense tracker and budget planner made by an independent developer, Mohammad Ariz Khan
        (&ldquo;I&rdquo;, &ldquo;we&rdquo;). This policy explains what the app collects, why, who helps process it, and how
        you can delete it. Questions: <a href="mailto:hq.equilibrium.ai@gmail.com">hq.equilibrium.ai@gmail.com</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account details:</strong> your name, email address and profile picture, from Sign in with Apple, Google
          or email sign-up.
        </li>
        <li>
          <strong>What you log:</strong> expenses (amount, name, category, date, notes), budgets and settings such as your
          currency.
        </li>
        <li>
          <strong>Text you type or say for AI logging:</strong> the sentence you type, or the text your phone turns your
          speech into, so it can be split into expenses.
        </li>
        <li>
          <strong>Subscription status:</strong> whether you have Equilibrium Pro. Payments are handled by Apple or Google; we
          never see your card details.
        </li>
        <li>
          <strong>App usage and device information:</strong> which screens and features are used, app version, device type,
          and an approximate location (country/city) based on your IP address. This helps us fix bugs and improve the app.
        </li>
        <li>
          <strong>Notification token:</strong> if you allow notifications, a token that lets us send reminders to your
          device.
        </li>
      </ul>
      <p>
        <strong>We do not</strong> connect to your bank, read your SMS or card statements, record or store your voice
        audio, sell your data, or share it with advertisers.
      </p>

      <h2>Voice and AI logging</h2>
      <p>
        When you speak, your phone&apos;s built-in speech recognition (Apple or Google) turns your voice into text on your
        device or through their speech service. Equilibrium only receives the resulting text. That text, together with
        your category names, is sent to <strong>Google Gemini</strong> to pick out amounts, shops, categories and dates.
        The same happens with text you type into the AI log box.
      </p>

      <h2>Who processes your data</h2>
      <ul>
        <li><strong>Amazon Web Services</strong>: hosts our server.</li>
        <li><strong>MongoDB Atlas</strong>: hosts the database with your account and expenses.</li>
        <li><strong>Google Gemini</strong>: reads AI log text to extract expenses.</li>
        <li><strong>PostHog</strong>: analytics for the app (feature usage, crashes and errors) and this website (pages visited, the link or campaign you came from, download and store-button clicks). The website records anonymous visits only and no session recordings.</li>
        <li><strong>RevenueCat</strong>, with Apple and Google: subscription purchases and status.</li>
        <li><strong>Cloudinary</strong>: stores profile pictures.</li>
        <li><strong>Resend</strong>: sends sign-in codes and service emails.</li>
        <li><strong>Expo</strong>, with Apple and Google: delivers push notifications.</li>
        <li><strong>Apple and Google</strong>: sign-in and in-app purchases.</li>
      </ul>
      <p>These services process data only to provide their part of the app.</p>

      <h2>How we use it</h2>
      <ul>
        <li>To run the app: save your expenses, calculate budgets, your daily allowance, forecasts and monthly reports.</li>
        <li>To send reminders and service emails (like sign-in codes). You can turn notifications off in your phone settings.</li>
        <li>To rank users on the in-app leaderboard (see below).</li>
        <li>To understand which features help and to fix problems.</li>
      </ul>

      <h2>The leaderboard (what other users can see)</h2>
      <p>
        Equilibrium has an in-app leaderboard, &ldquo;The Summit&rdquo;. If you log expenses on at least 7 days in a month,
        you can appear on it. Other users can then see your <strong>name</strong>, your <strong>profile photo</strong> and
        the <strong>percentage of your budget you saved</strong>, overall and in individual categories. They never see your
        email, your amounts, your budget or any individual expense. You can change your profile photo in the app, and if
        you&apos;d rather not appear on the leaderboard at all, email us and we&apos;ll remove you.
      </p>

      <h2>Keeping and deleting your data</h2>
      <p>
        Your data is kept while you have an account. You can delete your account and all your data at any time in the
        app (Profile → Delete account) or on our <Link href="/delete-account">account deletion page</Link>. Deletion is
        permanent.
      </p>

      <h2>Security</h2>
      <p>
        Data is sent over encrypted connections (HTTPS) and access to your account is protected by sign-in tokens. No
        system is perfectly secure, but we take reasonable steps to protect your information.
      </p>

      <h2>Children</h2>
      <p>
        Equilibrium&apos;s content is suitable for all ages, but the app is designed for adults and older teens managing
        their own money. It is not directed at children under 13, and we do not knowingly collect personal data from them.
        If you believe a child has created an account, contact us and we will delete it.
      </p>

      <h2>Changes</h2>
      <p>If this policy changes, the date above will be updated and significant changes will be announced in the app.</p>
    </LegalPage>
  );
}
