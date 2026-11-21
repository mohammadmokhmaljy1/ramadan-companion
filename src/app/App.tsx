import { Button } from "@/shared/ui/button";
function App() {
  return (
    <main dir="rtl" className="min-h-screen bg-background p-8 text-foreground">
      <div className="mx-auto max-w-5xl space-y-10">
        <header>
          <h1 className="text-3xl font-extrabold text-gold-400">
            نظام التصميم — Design System
          </h1>

          <p className="mt-2 text-muted-foreground">Ramadan Companion</p>
        </header>

        {/* Emerald */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Primary — Emerald</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-md bg-primary-950 p-5">950</div>
            <div className="rounded-md bg-primary-900 p-5">900</div>
            <div className="rounded-md bg-primary-800 p-5">800</div>
            <div className="rounded-md bg-primary-700 p-5">700</div>
            <div className="rounded-md bg-primary-600 p-5">600</div>
            <div className="rounded-md bg-primary-500 p-5 text-background">
              500
            </div>
          </div>
        </section>

        {/* Gold */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Accent — Gold</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div className="rounded-md bg-gold-900 p-5">900</div>
            <div className="rounded-md bg-gold-700 p-5">700</div>
            <div className="rounded-md bg-gold-500 p-5 text-background">
              500
            </div>
            <div className="rounded-md bg-gold-400 p-5 text-background">
              400
            </div>
            <div className="rounded-md bg-gold-300 p-5 text-background">
              300
            </div>
          </div>
        </section>

        {/* Surfaces */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Surfaces</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border-subtle bg-card p-6 shadow-card">
              <h3 className="font-bold">Card</h3>
              <p className="mt-2 text-muted-foreground">Surface Card</p>
            </div>

            <div className="rounded-lg border border-border-strong bg-secondary p-6">
              <h3 className="font-bold">Raised Surface</h3>
              <p className="mt-2 text-muted-foreground">Secondary Surface</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Typography</h2>

          <div className="space-y-4 rounded-xl border border-border-subtle bg-card p-6">
            <h1 className="text-4xl font-extrabold">Display — رمضان كريم</h1>

            <h2 className="text-2xl font-bold">
              Heading — رفيق رمضان لتنظيم العبادات
            </h2>

            <h3 className="text-xl font-bold">Title — أهلاً بك في رمضان</h3>

            <p>
              Body — نسعى لتقديم تجربة بسيطة تساعدك على تنظيم عباداتك وأعمالك.
            </p>

            <p className="text-muted-foreground">
              Muted — نص ثانوي باستخدام لون muted.
            </p>

            <p className="text-sm" dir="ltr">
              English — Ramadan Companion
            </p>
          </div>
        </section>

        {/* States */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">State Colors</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-md bg-info-700 p-5">Info</div>
            <div className="rounded-md bg-danger-500 p-5">Danger</div>
            <div className="rounded-md bg-warning-500 p-5 text-background">
              Warning
            </div>
            <div className="rounded-md bg-success-500 p-5 text-background">
              Success
            </div>
          </div>
        </section>

        {/* Radius & Shadows */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Radius & Shadows</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-card p-6 shadow-card">
              Card Shadow
            </div>

            <div className="rounded-xl bg-card p-6 shadow-elevation">
              Elevation Shadow
            </div>

            <div className="rounded-2xl bg-primary-900 p-6 shadow-glow">
              Glow Shadow
            </div>
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
