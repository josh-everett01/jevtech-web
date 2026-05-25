"use client"

import dynamic from "next/dynamic"

const JevTechPortfolioHome = dynamic(
  () => import("@/components/jevtech/JevTechPortfolioHome"),
  { ssr: false }
)

export default function ContactPage() {
  return <JevTechPortfolioHome />
}