import { Footer } from "@/components/Footer"
import Nav from "@/components/Nav"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function Privacy() {
  return (
    <>
    <div className="max-w-4xl mb-10 mx-auto">
      <h1 className={`${playfair.className} text-4xl font-bold mb-8 text-center text-gold`}>Privacy Policy</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="mb-6">
          At Eroe Designer, we are committed to protecting your privacy and ensuring the security of your personal
          information. This Privacy Policy outlines how we collect, use, and safeguard your data.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">1. Information We Collect</h2>
        <p className="mb-6">
          We collect personal information such as your name, email address, shipping address, and payment details when
          you make a purchase or create an account. We also collect non-personal information like browser type and IP
          address.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">2. How We Use Your Information</h2>
        <p className="mb-6">
          We use your information to process orders, provide customer support, improve our services, and send
          promotional emails (if you opt-in). We do not sell or share your personal information with third parties for
          marketing purposes.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">3. Data Security</h2>
        <p className="mb-6">
          We implement a variety of security measures to maintain the safety of your personal information. All payment
          transactions are encrypted using SSL technology.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">4. Cookies</h2>
        <p className="mb-6">
          We use cookies to enhance your browsing experience and analyze our website traffic. You can choose to disable
          cookies through your browser settings.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">5. Your Rights</h2>
        <p className="mb-6">
          You have the right to access, correct, or delete your personal information. You can also opt-out of marketing
          communications at any time.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">6. Changes to This Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
          policy on this page.
        </p>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@eroedesigner.com.</p>
      </div>
    </div>
    </>
  )
}

