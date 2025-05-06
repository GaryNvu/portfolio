import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Project {
    title: string;
    description: string;
    stack: string[];
    github: string;
    image?: string;
}
  
export default function ProjectCard({ title, description, stack, github, image }: Project) {
const t = useTranslations();
return (
    <div className="bg-dark-purple p-6 rounded-lg hover:cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        {image && (
            <div className="mb-4 relative aspect-[16/9] w-full">
            <Image 
                src={image} 
                alt={title} 
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            </div>
        )}
        <h3 className="text-2xl font-bold text-primary-light mb-2">{title}</h3>
        <p className="text-text mb-4 line-clamp-3 h-[4rem]">{t(`${title}.description`)}</p>
        <div className="flex flex-wrap gap-2 mb-4">
            {stack.map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-medium-purple rounded-full text-xs">
                {tech}
            </span>
            ))}
    </div>
    <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-primary-light hover:text-primary transition-colors"
    >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.58v-2.02c-3.338.72-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.74.084-.725.084-.725 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.29c0 .32.21.694.825.577C20.565 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        {t('projects.github-link')}
    </a>
    </div>
);
}