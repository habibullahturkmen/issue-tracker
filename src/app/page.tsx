import LatestIssues from "@/app/LatestIssues"

export default function Home() {
  return (
    <main>
      <LatestIssues />
    </main>
  )
}

export const dynamic = "force-dynamic"
