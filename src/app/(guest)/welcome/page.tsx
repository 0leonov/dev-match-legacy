import React from "react";

import {
  Header,
  WelcomeSection,
  ScrollDownButton,
  FeaturesSection,
  Footer,
} from "./components";

export default function WelcomePage() {
  return (
    <>
      <main className="min-h-screen p-8 flex flex-col gap-8">
        <Header />

        <WelcomeSection />

        <div className="text-center">
          <ScrollDownButton elementId="features" />
        </div>
      </main>

      <FeaturesSection />

      <Footer />
    </>
  );
}
