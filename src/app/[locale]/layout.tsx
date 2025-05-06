import { cascadiaMono, geistMono, geistSans, montserrat, notoSansMath, poppins, robotoMono } from "../../fonts/fonts";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from "next/navigation";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`
          ${poppins.variable}
          ${montserrat.variable}
          ${robotoMono.variable}
          ${geistSans.variable}
          ${geistMono.variable}
          ${cascadiaMono.variable}
          ${notoSansMath.variable}
          antialiased
        `}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}