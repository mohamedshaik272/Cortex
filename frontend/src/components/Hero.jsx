import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-orange-200/20 bg-paper px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden="true">
        <div className="absolute -left-1/4 top-0 h-[480px] w-[480px] rounded-full bg-orange-300/25 blur-[100px]" />
        <div className="absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-orange-200/35 blur-[90px]" />
        <div className="absolute left-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-orange-200/20 blur-[70px]" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50/90 px-3 py-1 text-xs font-medium text-terracotta ring-1 ring-orange-200/80">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(234,88,12,0.45)]" />
          Home management platform
        </p>
        <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
          Everything about your home, in one place
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Cortex brings together appliance age, maintenance history, utilities, climate exposure, repairs, and specs into{" "}
          <span className="font-medium text-ink">one complete home record</span>{" "}
          that helps you understand what needs attention and plan what to do next.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#insights" className="btn-primary">
            Get started
          </a>
          <Link to="/data" className="btn-secondary">
            Neighborhood data atlas
          </Link>
        </div>
      </div>
    </section>
  );
}
