'use client';

import type { ReactNode } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 overflow-y-auto px-4 py-10 w-full">
        {children}
      </main>
    </div>
  );
}
