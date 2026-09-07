import { getContent } from "@/content";
import type { Lang } from "@/content/types";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Sailing } from "@/components/sections/Sailing";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const content = getContent(lang);

  return (
    <>
      <Nav content={content.nav} lang={lang} />
      <main id="main">
        <Hero content={content.hero} />
        <About content={content.about} />
        <Projects content={content.projects} />
        <Sailing content={content.sailing} />
        <Education content={content.education} />
        <Contact content={content.contact} />
      </main>
      <Footer content={content.footer} />
    </>
  );
}
