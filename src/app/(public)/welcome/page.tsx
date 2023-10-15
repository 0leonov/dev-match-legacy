import {
  Header,
  WelcomeSection,
  ScrollDownBlock,
  Footer,
  WhyChooseUsSection,
} from "./components";

export default function WelcomePage() {
  return (
    <>
      <main className="min-h-screen p-8 flex flex-col gap-8">
        <Header />

        <WelcomeSection />

        <ScrollDownBlock />
      </main>

      <WhyChooseUsSection />

      <Footer />
    </>
  );
}
