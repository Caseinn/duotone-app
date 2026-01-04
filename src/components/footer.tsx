import React from "react";
import { Github, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-white/10 px-6 py-6 sm:mt-10 sm:px-8 md:px-10 lg:px-12">
      <div className="mx-auto flex max-w-6xl items-center justify-between text-[0.55rem] font-[var(--font-display)] uppercase tracking-[0.22em] text-white sm:text-[0.6rem] sm:tracking-[0.3em] md:text-[0.65rem] md:tracking-[0.4em] lg:text-[0.7rem] lg:tracking-[0.45em]">
        
        {/* Brand */}
        <div className="flex flex-col leading-tight">
          <span>Duotone Identity</span>
          <span className="opacity-70">Caseinn {year}</span>
        </div>

        {/* Social */}
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/ditorifkii"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Instagram"
            className="flex items-center gap-2 transition hover:text-[#E1306C]"
          >
            <Instagram className="h-4 w-4" />
            <span>Instagram</span>
          </a>

          <a
            href="https://github.com/caseinn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub"
            className="flex items-center gap-2 transition hover:text-[#00C853]"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
