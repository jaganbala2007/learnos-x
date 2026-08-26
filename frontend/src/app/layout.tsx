import "../styles/globals.css";
import AppShell from "../components/layout/AppShell";

export const metadata = {
  title: "LEARNOS X — Autonomous Career OS",
  description: "Closed-loop agentic personalized career-learning operating system."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-brand-bg text-brand-textMain selection:bg-indigo-500 selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
