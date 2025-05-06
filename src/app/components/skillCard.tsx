import React, { JSX } from 'react';
import Image from 'next/image';

interface Skill {
    name: string;
    icon: string;
}

interface SkillCardProps {
    title: string;
    skills: Skill[];
}

const getIcon = (iconName: string) => {
    return (
        <div className="relative w-8 h-8">
            <Image
                src={`/icons/${iconName}.svg`}
                alt={`${iconName} icon`}
                fill
                className="object-contain text-primary-light"
            />
        </div>
    );
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