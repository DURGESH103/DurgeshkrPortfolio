import Navbar          from '@/components/Navbar';
import Footer          from '@/components/Footer';
import Hero            from '@/components/sections/Hero';
import TechMarquee     from '@/components/sections/TechMarquee';
import About           from '@/components/sections/About';
import Skills          from '@/components/sections/Skills';
import Projects        from '@/components/sections/Projects';
import Experience      from '@/components/sections/Experience';
import Achievements    from '@/components/sections/Achievements';
import CodingProfiles  from '@/components/sections/CodingProfiles';
import Education       from '@/components/sections/Education';
import Certifications  from '@/components/sections/Certifications';
import WhyHireMe       from '@/components/sections/WhyHireMe';
import CurrentlyLearning from '@/components/sections/CurrentlyLearning';
import GithubDashboard from '@/components/sections/GithubDashboard';
import Resume          from '@/components/sections/Resume';
import Contact         from '@/components/sections/Contact';
import LoadingScreen   from '@/components/ui/LoadingScreen';
import CustomCursor    from '@/components/ui/CustomCursor';
import ScrollProgress  from '@/components/ui/ScrollProgress';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <CodingProfiles />
        <Education />
        <Certifications />
        <WhyHireMe />
        <CurrentlyLearning />
        <GithubDashboard />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
