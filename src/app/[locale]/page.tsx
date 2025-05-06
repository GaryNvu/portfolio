import Image from "next/image";
import { useTranslations } from 'next-intl';
import SkillCard from "../components/skillCard";
import ContactForm from "../components/contactForm";
import ProjectCard from "../components/projectCard";
import ToggleLanguage from "../components/toggleLanguage";

import { VscSymbolColor } from "react-icons/vsc";
import { VscTools } from "react-icons/vsc";
import { VscVerifiedFilled } from "react-icons/vsc";
import { BsChatSquareDots } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";

const frontendSkills = [
  { name: "VueJS", icon: "vue" },
  { name: "React / NextJS", icon: "react" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Bootstrap", icon: "bootstrap" },
  { name: "TypeScript", icon: "typescript" },
];

const backendSkills = [
  { name: "Django", icon: "django" },
  { name: "NodeJS", icon: "nodejs" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "PostgreSQL", icon: "postgresql" },
];

const toolsSkills = [
  { name: "Docker", icon: "docker" },
  { name: "Figma", icon: "figma" },
  { name: "Power BI", icon: "powerbi" }
];

const projects = [
  {
    title: "CoreFit",
    description: "A comprehensive gym management platform with client and admin interfaces. Features include workout tracking, nutritional guidance, membership management, and analytics dashboard.",
    stack: ["Angular", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/GaryNvu/portfolio",
    image: "/corefit-project.png",
  },
  {
    title: "Cardory",
    description: "Trading card game e-commerce platform (Pokémon, Yu-Gi-Oh, Magic) with customer shopping experience and admin dashboard for inventory and sales management.",
    stack: ["Vue.js", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/GaryNvu/ecommerce-dashboard",
    image: "/cardory-project.png",
  },
  {
    title: "Batibill",
    description: "Construction company management system for handling inventory, client relationships, and invoice generation with an intuitive dashboard.",
    stack: ["Vue.js", "Firebase", "Tailwind CSS"],
    github: "https://github.com/GaryNvu/task-manager",
    image: "/batibill-project.png",
  }
];

export default function Home() {
  const t = useTranslations();
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 w-full backdrop-blur-sm z-50">
        <nav className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="text-xl font-bold text-primary-light">Gary Neveu</span>
          </div>
          <ul className="flex justify-end gap-6">
            <li className="nav-link">
              <a href="#home">{t('nav.home')}</a>
            </li>
            <li className="nav-link">
              <a href="#skills">{t('nav.skills')}</a>
            </li>
            <li className="nav-link">
              <a href="#projects">{t('nav.projects')}</a>
            </li>
            <li className="nav-link">
              <a href="#about-me">{t('nav.about')}</a>
            </li>
            <li className="nav-link">
              <a href="#contact">{t('nav.contact')}</a>
            </li>
            <div className="flex items-center gap-4">
              <ToggleLanguage />
            </div>
          </ul>
          
        </nav>
      </header>
      <main>
        <section id="home" className="flex flex-row content-center items-center justify-between h-[675px] w-[70%] mx-auto">
          <div className="flex flex-col items-start justify-center">
            <h3 className="text-2xl font-bold">Hi, I&apos;m</h3>
            <h1 className="text-6xl font-bold text-primary-light">Gary Neveu</h1>
            <h2 className="mt-4 text-4xl">Fullstack Developer</h2>
            <div className="flex flex-row mt-4 gap-4">
              <button className="button-primary-light flex flex-row items-center gap-4 px-4 py-2 rounded slide-up opacity-0 delay-100">
                <svg width="24" height="24" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none">
                    <path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" fill="#FFFFFF"/>
                    <path d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z" fill="var(--primary-light)"/>
                  </g>
                </svg>
                <a href="https://www.linkedin.com/in/gary-neveu-070573236/">Linkedin</a>
              </button>
              <button className="button-primary-light flex flex-row items-center gap-4 px-4 py-2 rounded slide-up opacity-0 delay-200">
                <svg width="24" height="24" viewBox="0 0 98 98"  xmlns="http://www.w3.org/2000/svg" fill="none" className="size-6" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/>
                </svg>
                <a href="https://github.com/GaryNvu">Github</a>
              </button>
              <button className="button-primary-light flex flex-row items-center gap-4 px-4 py-2 rounded slide-up opacity-0 delay-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <a href="#contact">Mail</a>
              </button>
            </div>
          </div>
          <div className="relative">
          <div className="absolute -top-4 -left-4 w-[400px] h-[400px] rounded-full bg-primary opacity-20 -z-10" />
          <div className="absolute -bottom-4 -right-4 w-[400px] h-[400px] rounded-full bg-primary opacity-20 -z-10" />
          
          <div className="relative w-[350px] h-[350px] rounded-full border border-primary-light flex items-center justify-center">
            <Image 
              src="/photo-profil-wb.png" 
              alt="Profile picture" 
              width={350} 
              height={350} 
              className="rounded-full h-[350px] relative z-10 object-cover"
            />
          </div>
            
          </div>
        </section>
        <section id="skills" className="min-h-screen flex items-center bg-background">
          <div className="w-[80%] mx-auto">
            <h2 className="text-4xl font-bold mb-12 section-title">{t('skills.title')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SkillCard title="Frontend" skills={frontendSkills} />
              <SkillCard title="Backend" skills={backendSkills} />
              <SkillCard title="Tools" skills={toolsSkills} />
            </div>
          </div>
        </section>
        <section id="projects" className="min-h-screen flex items-center bg-background">
          <div className="w-[80%] mx-auto">
          <h2 className="text-4xl font-bold mb-12 section-title">{t('projects.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </section>
        <section id="about-me" className="min-h-screen flex items-center bg-background">
          <div className="w-[80%] mx-auto">
            <h2 className="text-4xl font-bold mb-12 section-title">{t('about.title')}</h2>
            
            <div className="flex flex-row gap-8">
              <div className="space-y-4 w-2/5">
                <h3 className="text-2xl font-bold text-primary-light">{t('about.journey.title')}</h3>
                <div className="relative">
                  {/* Ligne verticale */}
                  <div className="absolute left-[7px] top-2 w-[2px] h-[calc(100%-24px)] bg-primary-light"></div>
                  <div className="space-y-8">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative">
                        <div className="w-4 h-4 mt-1 rounded-full bg-primary-light z-10 relative"></div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shrink-0">
                          <Image
                            src="/canon-logo.png"
                            alt="Canon Logo"
                            width={65}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary-light pb-1">{t('about.journey.canon.title')}</h4>
                          <p>{t('about.journey.canon.description')}</p>
                        </div>
                      </div>  
                    </div>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative">
                        <div className="w-4 h-4 mt-1 rounded-full bg-primary-light z-10 relative"></div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shrink-0">
                          <Image
                            src="/esgi-logo.png"
                            alt="ESGI Logo"
                            width={65}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div>
                        <h4 className="font-bold text-primary-light pb-1">{t('about.journey.master.title')}</h4>
                        <p>{t('about.journey.master.description')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative">
                        <div className="w-4 h-4 mt-1 rounded-full bg-primary-light z-10 relative"></div>
                      </div>
                      <div>
                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shrink-0">
                          <Image
                            src="/unicaen-logo.png"
                            alt="Unicaen Logo"
                            width={65}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div>
                        <h4 className="font-bold text-primary-light pb-1">{t('about.journey.bachelor.title')}</h4>
                        <p>{t('about.journey.bachelor.description')}</p>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pl-8 w-3/5">
                <h3 className="text-2xl font-bold text-primary-light">{t('about.vision.title')}</h3>
                <p className="leading-relaxed mb-8">
                  {t('about.vision.intro')}
                </p>
                <div className="flex flex-row gap-6 mx-auto">
                  <div className="flex flex-col items-center p-4 rounded-lg bg-dark-purple/30 hover:bg-dark-purple/50 transition-colors text-center">
                    <VscVerifiedFilled className="text-primary-light text-4xl mb-3" />
                    <span>{t('about.vision.qualities.code')}</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 rounded-lg bg-dark-purple/30 hover:bg-dark-purple/50 transition-colors text-center">
                    <VscSymbolColor className="text-primary-light text-4xl mb-3" />
                    <span>{t('about.vision.qualities.ux')}</span>
                  </div>

                  <div className="flex flex-col items-center p-4 rounded-lg bg-dark-purple/30 hover:bg-dark-purple/50 transition-colors text-center">
                    <VscTools className="text-primary-light text-4xl mb-3" />
                    <span>{t('about.vision.qualities.performance')}</span>
                  </div>
                </div>
                <div className="flex flex-row gap-6 w-3/5 mx-auto">
                  <div className="flex flex-col items-center p-4 rounded-lg bg-dark-purple/30 hover:bg-dark-purple/50 transition-colors text-center">
                    <BsChatSquareDots className="text-primary-light text-4xl mb-3" />
                    <span>{t('about.vision.qualities.communication')}</span>
                  </div>

                  <div className="flex flex-col items-center p-4 rounded-lg bg-dark-purple/30 hover:bg-dark-purple/50 transition-colors text-center">
                    <BsFileEarmarkText className="text-primary-light text-4xl mb-3" />
                    <span>{t('about.vision.qualities.documentation')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="min-h-screen flex items-center bg-background">
          <div className="w-[80%] mx-auto">
            <h2 className="text-4xl font-bold mb-12 section-title mx-auto">{t('contact.title')}</h2>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="">
      </footer>
    </div>
  );
}
