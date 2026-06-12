import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Facilities from '../components/Facilities';
import Features from '../components/Features';
import SuccessStories from '../components/SuccessStories';
import Trainers from '../components/Trainers';
import MembershipPlans from '../components/MembershipPlans';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="bg-black scroll-smooth">
      <Hero />
      <About />
      <Facilities />
      <Features />
      <SuccessStories />
      <Trainers />
      <MembershipPlans />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
