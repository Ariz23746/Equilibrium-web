import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Use | Equilibrium",
  description: "The terms for using Equilibrium and Equilibrium Pro.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="9 October 2026">
      <p>
        These terms apply to the Equilibrium app and website, made by Mohammad Ariz Khan. By using Equilibrium you agree to
        them. If you downloaded the app from the App Store, Apple&apos;s{" "}
        <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer">
          standard End User License Agreement
        </a>{" "}
        also applies.
      </p>

      <h2>1. Using the app</h2>
      <p>
        You may use Equilibrium for your personal budgeting. Keep your sign-in secure; you are responsible for activity on
        your account. Don&apos;t misuse the service, try to break or overload it, or use it for anything illegal.
      </p>

      <h2>2. Your data</h2>
      <p>
        What you log belongs to you. Our <Link href="/privacy">Privacy Policy</Link> explains what we collect and how it is
        used. You can delete your account and data at any time.
      </p>

      <h2>3. Equilibrium Pro subscriptions</h2>
      <ul>
        <li>Pro is offered as an auto-renewing subscription (monthly or yearly) and may also be offered as a one-time pass.</li>
        <li>Payment is charged to your Apple ID or Google Play account when you confirm the purchase.</li>
        <li>
          Subscriptions renew automatically unless you turn off auto-renew at least 24 hours before the end of the current
          period. Your account is charged for renewal within 24 hours before the period ends.
        </li>
        <li>
          You can manage or cancel your subscription in your App Store or Google Play account settings. Deleting the app
          does not cancel a subscription.
        </li>
        <li>Refunds are handled by Apple or Google under their policies.</li>
        <li>The free plan includes a monthly allowance of AI logs; prices and features may change, with notice in the app.</li>
      </ul>

      <h2>4. Not financial advice</h2>
      <p>
        Equilibrium helps you track and plan spending. Forecasts, allowances and insights are estimates based on what you log,
        and may be wrong. They are not financial, tax or investment advice. Decisions about your money are yours.
      </p>

      <h2>5. AI features</h2>
      <p>
        AI logging can misread what you type or say. Please check what gets logged; you can edit or delete any expense.
      </p>

      <h2>6. Availability and liability</h2>
      <p>
        We work to keep Equilibrium running smoothly but can&apos;t promise it will always be available or error-free. To the
        extent the law allows, Equilibrium is provided &ldquo;as is&rdquo; and we are not liable for indirect losses arising
        from its use.
      </p>

      <h2>7. Ending your use</h2>
      <p>
        You can stop using Equilibrium and delete your account at any time. We may suspend accounts that break these terms.
      </p>

      <h2>8. Contact</h2>
      <p>
        <a href="mailto:hq.equilibrium.ai@gmail.com">hq.equilibrium.ai@gmail.com</a>
      </p>
    </LegalPage>
  );
}
