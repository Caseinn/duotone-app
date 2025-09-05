import { Badge } from "@/components/ui/badge";
import FileUpload from "@/components/file-upload";

const HeroSection = () => {
  return (
    <section className="min-h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-12">
      <div className="max-w-screen-md w-full mx-auto flex flex-col gap-16">
        <div className="flex flex-col justify-center space-y-6 text-center">
          <Badge className="bg-gradient-to-br from-[#f784c5] to-[#1b602f] rounded-full py-1 px-4 text-sm font-semibold text-white border-none shadow-md mx-auto">
            Just Released
          </Badge>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
            Upload & Apply Duotone Filter
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300">
            Apply heroic green and brave pink duotone filters to your images locally.
          </p>
        </div>

        <div className="w-full aspect-video bg-accent rounded-xl p-3 md:p-6 flex items-center justify-center shadow-lg">
          <FileUpload />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
