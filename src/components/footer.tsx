import React from "react";
import { Github } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-white/10 px-6 py-6 sm:mt-10 sm:px-8 md:px-10 lg:px-12">
      <div className="mx-auto flex max-w-6xl items-center justify-between text-[0.55rem] font-[var(--font-display)] uppercase tracking-[0.22em] text-white sm:text-[0.6rem] sm:tracking-[0.3em] md:text-[0.65rem] md:tracking-[0.4em] lg:text-[0.7rem] lg:tracking-[0.45em]">

        {/* Mobile */}
        <span className="block sm:hidden">Caseinn</span>

        {/* Tablet & Desktop */}
        <span className="hidden sm:block">
          Caseinn | Duotone Identity {currentYear}
        </span>

        <a
          href="https://github.com/caseinn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition hover:text-[#00C853]"
          aria-label="Visit GitHub"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
