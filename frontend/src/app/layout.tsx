import "../styles/globals.css";
import AppShell from "../components/layout/AppShell";
import { DomainProvider } from "../lib/DomainContext";

export const metadata = {
  title: "LEARNOS X — Autonomous Career Intelligence & Learning OS",
  description: "Closed-loop agentic personalized career-learning operating system with domain-aware intelligence."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-brand-bg text-brand-textMain selection:bg-indigo-500 selection:text-white">
        <DomainProvider>
          <AppShell>{children}</AppShell>
        </DomainProvider>
      </body>
    </html>
  );
}

