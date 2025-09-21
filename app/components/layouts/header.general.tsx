import { DotPattern } from "~/components/ui/dot-pattern";
import { cn } from "~/lib/utils";

export default function HeaderGeneral() {
  return (
    <header className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <div className="w-full xl:max-w-7xl">
        <h1>General Layout</h1>
        <p>Welcome to the general layout header!</p>
      </div>

      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
      />
    </header>
  );
}
