import { Footer } from "@/components/Footer"
import Nav from "@/components/Nav"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function Returns() {
  return (
    <>
    <div className="max-w-4xl mb-10 mx-auto">
      <h1 className={`${playfair.className} text-4xl font-bold mb-8 text-center text-gold`}>Return Policy</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="mb-6">
          At Eroe Designer, we want you to be completely satisfied with your purchase. If for any reason you&apos;re not
          happy with your order, we offer a straightforward return and exchange policy.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">1. Return Eligibility</h2>
        <p className="mb-6">
          Items must be returned within 30 days of delivery. They must be unworn, unwashed, and in the same condition as
          received, with all original tags attached.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">2. Non-Returnable Items</h2>
        <p className="mb-6">
          Custom-made or personalized items, intimate apparel, and sale items marked as final sale are not eligible for
          return or exchange.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">3. Return Process</h2>
        <p className="mb-6">
          To initiate a return, please contact our customer service team at returns@eroedesigner.com. We&apos;ll provide you
          with a return authorization and shipping instructions.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">4. Refunds</h2>
        <p className="mb-6">
          Once we receive and inspect your return, we&apos;ll process your refund. The original payment method will be
          refunded within 5-10 business days.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">5. Exchanges</h2>
        <p className="mb-6">
          If you need a different size or color, we&apos;re happy to process an exchange. Please contact our customer service
          team to arrange this.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gold">6. Return Shipping</h2>
        <p className="mb-6">
          Customers are responsible for return shipping costs unless the item is defective or we made an error in your
          order.
        </p>
        <p>
          If you have any questions about our return policy, please don&apos;t hesitate to contact us at
          support@eroedesigner.com.
        </p>
      </div>
    </div>
    </>
  )
}

