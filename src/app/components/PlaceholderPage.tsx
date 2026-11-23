interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="bg-background text-foreground min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    </main>
  );
}
