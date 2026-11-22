import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="bg-card border-border-subtle shadow-card w-full max-w-md rounded-xl border p-6">
        <Outlet />
      </div>
    </main>
  );
}
