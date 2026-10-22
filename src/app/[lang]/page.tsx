import { getContent, isLang } from "@/content";
import { DEFAULT_LANG } from "@/content/types";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Hackathons } from "@/components/sections/Hackathons";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { VoyageProgress } from "@/components/ui/VoyageProgress";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const segment = (await params).lang;
  const lang = isLang(segment) ? segment : DEFAULT_LANG;
  const content = getContent(lang);

  return (
    <>
      <Nav content={content.nav} lang={lang} />
      <main id="main">
        <Hero content={content.hero} />
        <Projects content={content.projects} />
        <Hackathons content={content.hackathons} />
        <About content={content.about} />
        <Education content={content.education} />
        <Contact content={content.contact} />
      </main>
      <Footer content={content.footer} />
      <VoyageProgress />
    </>
  );
}
