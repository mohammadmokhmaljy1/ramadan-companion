import { Button } from "@/shared/ui/button";
function App() {
  return (
    <main dir="rtl" className="min-h-screen bg-background p-8 text-foreground">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-primary">Ramadan Companion</h1>

          <p className="text-muted-foreground">
            صفحة اختبار نظام التصميم — Design Tokens Preview
          </p>
        </header>

        {/* Brand Colors */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Brand Colors</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-primary p-6 text-primary-foreground">
              <p className="font-semibold">Primary / Emerald</p>
              <p className="mt-2 text-sm">#047857</p>
            </div>

            <div className="rounded-lg bg-accent p-6 text-accent-foreground">
              <p className="font-semibold">Accent / Gold</p>
              <p className="mt-2 text-sm">#D4A64A</p>
            </div>

            <div className="rounded-lg bg-secondary p-6 text-secondary-foreground">
              <p className="font-semibold">Secondary</p>
              <p className="mt-2 text-sm">Secondary surface</p>
            </div>
          </div>
        </section>

        {/* Text */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Typography</h2>

          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h1 className="text-3xl font-bold">رمضان كريم 🌙</h1>

            <h2 className="mt-4 text-xl font-semibold">أهلاً بك في رمضان</h2>

            <p className="mt-3 text-muted-foreground">
              نسعى لتقديم تجربة بسيطة تساعدك على تنظيم عباداتك وأعمالك خلال
              الشهر الفضيل.
            </p>

            <p className="mt-4 text-sm" dir="ltr">
              Ramadan Companion — Your companion throughout Ramadan.
            </p>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Cards & Radius & Shadows</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 shadow-card">
              <h3 className="font-semibold">Card - Small Radius</h3>
              <p className="mt-2 text-muted-foreground">
                Testing the card background, border and shadow.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-card-hover">
              <h3 className="font-semibold">Card - Larger Radius</h3>
              <p className="mt-2 text-muted-foreground">
                Testing the hover shadow token.
              </p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Buttons</h2>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground">
              Primary Button
            </button>

            <button className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-foreground">
              Accent Button
            </button>

            <button className="rounded-lg border bg-background px-5 py-3 font-medium">
              Outline Button
            </button>

            <button className="rounded-lg bg-destructive px-5 py-3 font-medium text-destructive-foreground">
              Destructive Button
            </button>
          </div>
          <Button>shadcn Primary</Button>
          <Button variant="outline">shadcn Outline</Button>
          <Button variant="secondary">shadcn Secondary</Button>
        </section>

        {/* Muted */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Muted & Background</h2>

          <div className="rounded-xl bg-muted p-6">
            <p className="font-medium">Muted Background</p>

            <p className="mt-2 text-muted-foreground">
              Secondary text using the muted token.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
