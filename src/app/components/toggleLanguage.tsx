'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function toggleLanguage() {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = pathname.startsWith('/fr') ? 'en' : 'fr';
    router.push(`/${newLocale}${pathname.substring(3)}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1 bg-dark-purple/30 hover:bg-dark-purple/50 transition-all"
    >
      <Image
        src={pathname.startsWith('/fr') ? '/icons/french-flag.svg' : '/icons/english-flag.svg'}
        alt="Language toggle"
        width={20}
        height={20}
      />
      <span className="text-sm font-medium">
        {pathname.startsWith('/fr') ? 'FR' : 'EN'}
      </span>
    </button>
  );
}