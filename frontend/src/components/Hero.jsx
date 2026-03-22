import { Link } from "react-router-dom";
import NodeGraph from "./NodeGraph";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative border-b border-orange-200/20 bg-paper px-4 pb-36 pt-12 sm:px-6 sm:pb-52 sm:pt-16"
    >
      {/* ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-90" aria-hidden="true">
        <div className="absolute -left-1/4 top-0 h-[480px] w-[480px] rounded-full bg-orange-300/25 blur-[100px]" />
        <div className="absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-orange-200/35 blur-[90px]" />
        <div className="absolute left-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-orange-200/20 blur-[70px]" />
      </div>

      {/* node graph — fills the section as ambient background */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.18] sm:opacity-[0.28]"
        aria-hidden="true"
      >
        <div className="w-full max-w-7xl px-4">
          <NodeGraph />
        </div>
      </div>

      {/* foreground content */}
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-terracotta ring-1 ring-orange-200/80">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(234,88,12,0.45)]" />
          Home intelligence platform
        </p>
        <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
          A complete understanding of every home
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Cortex turns scattered facts (appliance age, maintenance history,
          utilities, climate exposure, repairs, and specs) into a{" "}
          <span className="font-medium text-ink">living system of record</span>{" "}
          that interprets context, surfaces risk, and recommends what to do
          next.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#explore" className="btn-primary">
            See how it works
          </a>
          <Link to="/my-home" className="btn-secondary">
            My home
          </Link>
          <Link to="/data" className="btn-secondary">
            Explore data
          </Link>
        </div>
      </div>
    </section>
  );
}
