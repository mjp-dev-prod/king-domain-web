import { Head } from 'vite-react-ssg/single-page'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { Difference } from './sections/Difference'
import { HowItWorks } from './sections/HowItWorks'
import { Status } from './sections/Status'
import { Waitlist } from './sections/Waitlist'
import { Footer } from './sections/Footer'

const DESCRIPTION =
  'King Domain is a marketplace where student and emerging talent prove their skills, work under protected payment terms, and build a reputation that lasts beyond graduation. Join the waitlist for early access.'

function App() {
  return (
    <>
      <Head>
        <title>King Domain — Proof beats promises</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="theme-color" content="#151A2E" />

        <meta property="og:title" content="King Domain — Proof beats promises" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="King Domain" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="King Domain — Proof beats promises" />
        <meta name="twitter:description" content={DESCRIPTION} />

        <link rel="canonical" href="https://kingdomain.app/" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,600&family=Public+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </Head>

      <Nav />
      <main>
        <Hero />
        <Problem />
        <Difference />
        <HowItWorks />
        <Status />
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}

export default App
