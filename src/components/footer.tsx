import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="rounded-lg shadow-sm m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-wrap items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          © {currentYear}, Developed by Caseinn.
        </span>
        <ul className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 space-x-4 mt-0">
          <li>
            <a
              href="https://github.com/caseinn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-white flex items-center p-1"
              aria-label="Visit GitHub repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;