import { Footer } from "@/components/Footer"
import Nav from "@/components/Nav"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function Shipping() {
  return (
    <>
    <Nav />
    <div className="max-w-4xl mb-10 mx-auto">
      <h1 className={`${playfair.className} text-4xl font-bold mb-8 text-center text-gold`}>Shipping Policy</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="mb-6">
          Eroe Designer is committed to ensuring your designer pieces reach you safely and promptly. Here's what you
          need to know about our shipping process:
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">1. Processing Time</h2>
        <p className="mb-6">
          Most orders are processed within 1-3 business days. Custom or made-to-order items may require additional
          processing time, which will be communicated at the time of purchase.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">2. Shipping Methods</h2>
        <p className="mb-6">
          We offer standard and express shipping options. Standard shipping typically takes 5-7 business days, while
          express shipping can deliver your items within 2-3 business days.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">3. Shipping Costs</h2>
        <p className="mb-6">
          Shipping costs are calculated based on the destination and the shipping method selected. Free standard
          shipping is available for orders over $500 within the continental United States.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">4. International Shipping</h2>
        <p className="mb-6">
          We ship to most countries worldwide. International orders may be subject to import duties and taxes, which are
          the responsibility of the recipient.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">5. Tracking Your Order</h2>
        <p className="mb-6">
          Once your order is shipped, you'll receive a confirmation email with a tracking number to monitor your
          package's journey.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">6. Delivery Issues</h2>
        <p className="mb-6">
          If you experience any issues with your delivery, please contact our customer service team at
          shipping@eroedesigner.com within 48 hours of the expected delivery date.
        </p>
        <p>
          For any questions about our shipping policy or to inquire about expedited shipping options, please don't
          hesitate to reach out to our customer service team.
        </p>
      </div>
    </div>
    <Footer />
    </>
  )
}

