import { Button } from '@/shared/ui/button';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
function App() {
  const { t } = useTranslation();
  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-gold-400 text-3xl font-extrabold">{t('common.appName')}</h1>

            <p className="text-muted-foreground mt-2">{t('playground.appDescription')}</p>
          </div>

          <LanguageSwitcher />
        </header>

        {/* Emerald */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">{t('playground.primaryEmerald')}</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div className="bg-primary-950 rounded-md p-5">950</div>
            <div className="bg-primary-900 rounded-md p-5">900</div>
            <div className="bg-primary-800 rounded-md p-5">800</div>
            <div className="bg-primary-700 rounded-md p-5">700</div>
            <div className="bg-primary-600 rounded-md p-5">600</div>
            <div className="bg-primary-500 text-background rounded-md p-5">500</div>
          </div>
        </section>

        {/* Gold */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">{t('playground.accentGold')}</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div className="bg-gold-900 rounded-md p-5">900</div>
            <div className="bg-gold-700 rounded-md p-5">700</div>
            <div className="bg-gold-500 text-background rounded-md p-5">500</div>
            <div className="bg-gold-400 text-background rounded-md p-5">400</div>
            <div className="bg-gold-300 text-background rounded-md p-5">300</div>
          </div>
        </section>

        {/* Surfaces */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">{t('playground.surfaces')}</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-border-subtle bg-card shadow-card rounded-lg border p-6">
              <h3 className="font-bold">{t('playground.card')}</h3>
              <p className="text-muted-foreground mt-2">{t('playground.surfaceCard')}</p>
            </div>

            <div className="border-border-strong bg-secondary rounded-lg border p-6">
              <h3 className="font-bold">{t('playground.raisedSurface')}</h3>
              <p className="text-muted-foreground mt-2">{t('playground.secondarySurface')}</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">{t('playground.typography')}</h2>

          <div className="border-border-subtle bg-card space-y-4 rounded-xl border p-6">
            <h1 className="text-4xl font-extrabold">
              {t('playground.display')} — {t('playground.displaySample')}
            </h1>

            <h2 className="text-2xl font-bold">
              {t('playground.heading')} — {t('playground.headingSample')}
            </h2>

            <h3 className="text-xl font-bold">
              {t('playground.title')} — {t('playground.titleSample')}
            </h3>

            <p>
              {t('playground.body')} — {t('playground.bodyDescription')}
            </p>

            <p className="text-muted-foreground">
              {t('playground.muted')} — {t('playground.mutedDescription')}
            </p>

            <p className="text-sm" dir="ltr">
              {t('playground.englishExample')} — Ramadan Companion
            </p>
          </div>
        </section>

        {/* States */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">{t('playground.stateColors')}</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="bg-info-700 rounded-md p-5">{t('playground.info')}</div>
            <div className="bg-danger-500 rounded-md p-5">{t('playground.danger')}</div>
            <div className="bg-warning-500 text-background rounded-md p-5">
              {t('playground.warning')}
            </div>
            <div className="bg-success-500 text-background rounded-md p-5">
              {t('playground.success')}
            </div>
          </div>
        </section>

        {/* Radius & Shadows */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">{t('playground.radiusShadows')}</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-card shadow-card rounded-md p-6">{t('playground.cardShadow')}</div>

            <div className="bg-card shadow-elevation rounded-xl p-6">
              {t('playground.elevationShadow')}
            </div>

            <div className="bg-primary-900 shadow-glow rounded-2xl p-6">
              {t('playground.glowShadow')}
            </div>
          </div>
          <Button>{t('playground.primary')}</Button>
          <Button variant="outline">{t('playground.outline')}</Button>
          <Button variant="secondary">{t('playground.secondary')}</Button>
        </section>
      </div>
    </main>
  );
}

export default App;
