import { Footer } from "@/components/Footer"
import Nav from "@/components/Nav"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function Terms() {
  return (
    <>
    <div className="max-w-4xl mb-10 mx-auto">
      <h1 className={`${playfair.className} text-4xl font-bold mb-8 text-center text-gold`}>Terms of Service</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="mb-6">
          Welcome to Eroe Designer. By accessing or using our website, you agree to comply with and be bound by the
          following terms and conditions:
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">1. Use of the Website</h2>
        <p className="mb-6">
          You agree to use our website for lawful purposes only and in a way that does not infringe upon the rights of
          others or restrict their use of the website.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">2. Product Information</h2>
        <p className="mb-6">
          We strive to provide accurate product descriptions and images. However, we do not warrant that product
          descriptions or other content on the site are accurate, complete, reliable, current, or error-free.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">3. Pricing and Availability</h2>
        <p className="mb-6">
          All prices are subject to change without notice. We reserve the right to modify or discontinue any product
          without notice.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">4. Intellectual Property</h2>
        <p className="mb-6">
          All content on this website, including text, graphics, logos, and images, is the property of Eroe Designer and
          protected by copyright laws.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">5. Limitation of Liability</h2>
        <p className="mb-6">
          Eroe Designer shall not be liable for any direct, indirect, incidental, consequential, or punitive damages
          arising out of your access to, or use of, the website.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">6. Governing Law</h2>
        <p className="mb-6">
          These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without
          regard to its conflict of law provisions.
        </p>
        <p>
          By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of
          Service.
        </p>
      </div>
    </div>
    </>
  )
}

