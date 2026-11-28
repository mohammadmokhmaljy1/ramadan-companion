import { useTranslation } from 'react-i18next';

import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
  const { t } = useTranslation();

  return (
    <main
      dir="rtl"
      className="grid min-h-screen w-full max-w-none grid-cols-1 overflow-x-hidden bg-[#081d17] md:grid-cols-2"
    >
      {/* Registration Panel */}
      <section className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full">
          {/* Logo */}
          <div className="mb-5 flex items-center gap-3">
            <svg viewBox="0 0 40 40" className="size-8 shrink-0" aria-hidden="true">
              <path
                transform="translate(40 0) scale(-1 1)"
                d="M23.5 2.5C13.2 2.5 4.8 10.9 4.8 21.2c0 10.3 8.4 18.7 18.7 18.7 6.3 0 11.9-3.1 15.3-8.1-2 1-4.3 1.5-6.8 1.5-9.7 0-17.6-7.9-17.6-17.6 0-5.2 2.3-9.8 5.9-12.9 1-.2 2.1-.3 3.2-.3Z"
                fill="#e2be69"
              />
            </svg>

            <div>
              <h2 className="text-lg leading-6 font-bold text-[#f0d58c]">رفيق رمضان</h2>
              <p className="text-[10px] tracking-wide text-[#6f8c81]">Ramadan Companion</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-[30px] leading-tight font-bold text-[#f4efe1] sm:text-[32px]">
              {t('auth.register')}
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#afc3ba]">{t('auth.registerSubtitle')}</p>
          </div>

          <RegisterForm />
        </div>
      </section>

      {/* Original Figma Illustration */}
      <section className="relative hidden min-h-screen items-center justify-center overflow-hidden bg-[#0b3025] md:flex">
        <img
          src="/images/register-ramadan-panel.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </section>
    </main>
  );
}
