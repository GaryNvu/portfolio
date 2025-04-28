import { JSX } from 'react';
import * as Fa from 'react-icons/fa'
import * as Si from 'react-icons/si'
import * as Tb from 'react-icons/tb'
import * as Di from "react-icons/di";
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi";
import { DiBootstrap } from "react-icons/di";

interface Skill {
    name: string;
    icon: string;
}

interface SkillCardProps {
    title: string;
    skills: Skill[];
}

const icon_classes = "w-8 h-8 text-primary-light";

const getIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
        "react": <Si.SiReact className={icon_classes} />,
        "vue": <Si.SiVuedotjs className={icon_classes} />,
        "nextjs": <Si.SiNextdotjs className={icon_classes} />,
        "typescript": <Si.SiTypescript className={icon_classes} />,
        "django": <Si.SiDjango className={icon_classes} />,
        "tailwind": <Si.SiTailwindcss className={icon_classes} />,
        "bootstrap": <Di.DiBootstrap className={icon_classes} />,
        "nodejs": <Fa.FaNodeJs className={icon_classes} />,
        "mongodb": <Si.SiMongodb className={icon_classes} />,
        "postgresql": <Si.SiPostgresql className={icon_classes} />,
        "docker": <Si.SiDocker className={icon_classes} />,
        "figma": <Si.SiFigma className={icon_classes} />,
        "powerbi": <PiMicrosoftPowerpointLogoFill className={icon_classes} />,
    }
    return icons[iconName] || <Tb.TbCode className={icon_classes} />
}

export default function SkillCard({ title, skills }: SkillCardProps) {
    return (
        <div className="bg-background p-6 rounded-lg border-2 border-primary hover:border-primary-light transition-colors duration-300">
            <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
            <ul className="space-y-4">
                {skills.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {getIcon(skill.icon)}
                        <span className="text-xl ml-2">{skill.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}