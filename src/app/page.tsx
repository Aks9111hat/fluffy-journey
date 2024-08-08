"use client"

import Hero from '@/components/DisplayComponents/Hero';
import Features1 from '@/components/DisplayComponents/features1';
import Features2 from '@/components/DisplayComponents/features2';
import CTA from '@/components/DisplayComponents/cta';
import Steps from '@/components/DisplayComponents/Steps';
import Contact from '@/components/DisplayComponents/contact';
// import Footer from '@/components/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <Features1 />
      <CTA />
      <Features2 />
      <Steps />
      <Contact />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
