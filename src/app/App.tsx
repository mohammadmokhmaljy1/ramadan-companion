import { Button } from '@/shared/ui/button';
import { Playground } from './Playground';
function App() {
  const isPlayground = window.location.pathname === '/playground';

  if (isPlayground) {
    return <Playground />;
  }
  return (
    <main dir="rtl" className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <header>
          <h1 className="text-gold-400 text-3xl font-extrabold">نظام التصميم — Design System</h1>

          <p className="text-muted-foreground mt-2">Ramadan Companion</p>
        </header>

        {/* Emerald */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Primary — Emerald</h2>

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
          <h2 className="text-xl font-bold">Accent — Gold</h2>

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
          <h2 className="text-xl font-bold">Surfaces</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-border-subtle bg-card shadow-card rounded-lg border p-6">
              <h3 className="font-bold">Card</h3>
              <p className="text-muted-foreground mt-2">Surface Card</p>
            </div>

            <div className="border-border-strong bg-secondary rounded-lg border p-6">
              <h3 className="font-bold">Raised Surface</h3>
              <p className="text-muted-foreground mt-2">Secondary Surface</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Typography</h2>

          <div className="border-border-subtle bg-card space-y-4 rounded-xl border p-6">
            <h1 className="text-4xl font-extrabold">Display — رمضان كريم</h1>

            <h2 className="text-2xl font-bold">Heading — رفيق رمضان لتنظيم العبادات</h2>

            <h3 className="text-xl font-bold">Title — أهلاً بك في رمضان</h3>

            <p>Body — نسعى لتقديم تجربة بسيطة تساعدك على تنظيم عباداتك وأعمالك.</p>

            <p className="text-muted-foreground">Muted — نص ثانوي باستخدام لون muted.</p>

            <p className="text-sm" dir="ltr">
              English — Ramadan Companion
            </p>
          </div>
        </section>

        {/* States */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">State Colors</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="bg-info-700 rounded-md p-5">Info</div>
            <div className="bg-danger-500 rounded-md p-5">Danger</div>
            <div className="bg-warning-500 text-background rounded-md p-5">Warning</div>
            <div className="bg-success-500 text-background rounded-md p-5">Success</div>
          </div>
        </section>

        {/* Radius & Shadows */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Radius & Shadows</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-card shadow-card rounded-md p-6">Card Shadow</div>

            <div className="bg-card shadow-elevation rounded-xl p-6">Elevation Shadow</div>

            <div className="bg-primary-900 shadow-glow rounded-2xl p-6">Glow Shadow</div>
          </div>
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
        </section>
      </div>
    </main>
  );
}

export default App;
