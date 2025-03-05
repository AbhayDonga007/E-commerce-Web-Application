import { Footer } from "@/components/Footer"
import Nav from "@/components/Nav"
import Image from "next/image"
import im from '@/images/Piyush Donga-images-0.jpg'

export default function About() {
  return (
    <>
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-gold">About Us</h1>
      <div className="flex items-center m-8">
        <Image
          src={im}
          alt="Eroe Designer"
          width={800}
          height={400}
          className="rounded-lg shadow-md"
        />
      </div>
      <p className="mb-6 text-lg">
        Welcome to Eroe Designer, where we craft dreams into reality. As &apos;The Royal Choice&apos; in fashion, we specialize in
        creating exquisite designer clothing for life&apos;s most cherished moments - weddings, engagements, and cultural
        celebrations that demand nothing short of perfection.
      </p>
      <p className="mb-6 text-lg">
        Our journey began with a passion for innovative design and an unwavering commitment to quality. Each Eroe
        Designer piece is a testament to our dedication, meticulously crafted to ensure you look and feel your absolute
        best on your most important days.
      </p>
      <p className="mb-6 text-lg">
        What sets us apart is our ability to blend timeless elegance with contemporary flair. We understand that true
        style is personal, which is why our designs cater to a diverse range of tastes and cultural traditions. Whether
        you&apos;re seeking a show-stopping wedding gown, a sophisticated engagement outfit, or a culturally rich ensemble
        for a special event, Eroe Designer has you covered.
      </p>
      <p className="mb-6 text-lg">
        Our reputation as &apos;The Royal Choice&apos; is built on the trust of our clients, who rely on us to bring their fashion
        visions to life. We take this responsibility seriously, pouring our expertise and passion into every stitch,
        every embellishment, and every design.
      </p>
      <p className="text-lg">
        Choose Eroe Designer and experience the difference that comes with wearing a garment that&apos;s been created with
        passion, precision, and an eye for regal beauty. Let us be part of your special moments, dressing you in designs
        that are as unique and memorable as the occasions themselves.
      </p>
    </div>
    </>
  )
}

