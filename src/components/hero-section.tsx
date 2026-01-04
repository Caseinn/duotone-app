import FileUpload from "@/components/file-upload";

const HeroSection = () => {
  return (
    <section className="relative pb-16 pt-12 sm:pb-20 sm:pt-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-16">
        <div className="flex flex-col items-start gap-2 text-[0.5rem] font-[var(--font-display)] uppercase tracking-[0.18em] text-white animate-in fade-in-0 slide-in-from-top-4 duration-700 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-[0.65rem] sm:tracking-[0.45em] md:text-[0.7rem] md:tracking-[0.5em] lg:text-[0.75rem] lg:tracking-[0.55em]">
          <span>Caseinn / Duotone Identity</span>
          <span>Issue 01 / 2026</span>
        </div>

        <div className="grid gap-10 sm:gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-start">
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-left-6 duration-700 delay-100 sm:space-y-8 md:space-y-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 px-4 py-2 text-[0.5rem] font-[var(--font-display)] uppercase tracking-[0.2em] text-white sm:text-[0.6rem] sm:tracking-[0.4em] md:text-[0.7rem] md:tracking-[0.45em]">
              <span className="h-2 w-2 rounded-full bg-[#00C853]" />
              <span>Local Processing</span>
            </div>

            <h1 className="text-[clamp(2rem,10vw,4.8rem)] leading-[0.95] text-white sm:text-[clamp(2.8rem,6vw,6rem)] sm:leading-[0.85] md:text-[clamp(3.4rem,5vw,6rem)] md:leading-[0.82] lg:leading-[0.78]">
              <span className="block">Brave Pink.</span>
              <span className="block">Heroic Green.</span>
              <span className="block">Duotone Filter.</span>
            </h1>

            <p className="max-w-[32rem] text-[0.85rem] text-white/70 sm:text-base md:text-lg lg:text-xl">
              Brave Pink and Heroic Green originate from an Indonesian digital solidarity movement, symbolizing civilian courage and collective struggle. Together, they represent quiet resistance and hope.
            </p>

            <div className="text-[0.55rem] font-[var(--font-display)] uppercase tracking-[0.2em] text-white sm:hidden">
              No uploads / On device / PNG export
            </div>

            <div className="hidden flex-wrap gap-2 text-[0.55rem] font-[var(--font-display)] uppercase tracking-[0.22em] text-white sm:flex sm:gap-3 sm:text-[0.6rem] sm:tracking-[0.32em] md:text-[0.65rem] md:tracking-[0.36em] lg:text-[0.7rem] lg:tracking-[0.4em]">
              <span className="rounded-full border border-white/20 px-3 py-1">No Uploads</span>
              <span className="rounded-full border border-white/20 px-3 py-1">On Device</span>
              <span className="rounded-full border border-white/20 px-3 py-1">PNG Export</span>
            </div>
          </div>

          <div className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-6 duration-700 delay-150 sm:space-y-4 md:space-y-5 lg:space-y-6">
            <div className="rounded-[1.4rem] border border-white/15 bg-black/40 p-4 shadow-[0_25px_80px_-50px_rgba(0,0,0,0.8)] backdrop-blur sm:rounded-[1.75rem] sm:p-5 md:rounded-[2rem] md:p-6 lg:p-7">
              <FileUpload />
            </div>
            <div className="flex items-center justify-between text-[0.55rem] font-[var(--font-display)] uppercase tracking-[0.25em] text-white sm:text-[0.65rem] sm:tracking-[0.4em] md:text-[0.7rem] md:tracking-[0.5em] lg:text-[0.75rem] lg:tracking-[0.55em]">
              <span>Duotone Engine</span>
              <span>On-device</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
