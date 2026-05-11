'use client'

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="min-h-screen" style={{ background: "var(--brutal-bg)" }}>
      <header className="brutal-header">
        WORDAY — ERROR
      </header>

      <div className="max-w-[720px] mx-auto px-6 py-12">
        <div className="brutal-card">
          <h1
            className="text-5xl md:text-6xl font-bold uppercase tracking-tight mb-6"
            style={{ color: "#FF2D00" }}
          >
            ERROR
          </h1>

          <div className="border-t-[3px] border-[#0A0A0A] my-6" />

          <p className="text-lg leading-relaxed mb-8">
            {error.message || "Unable to load today's word. Please try again."}
          </p>

          <button className="brutal-btn" onClick={reset} type="button">
            ↺ TRY AGAIN
          </button>
        </div>
      </div>
    </main>
  );
}
