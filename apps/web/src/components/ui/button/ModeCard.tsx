import { Link } from "react-router";
import type { MenuOptionsConfig } from "../../screen/MainMenu";
import { ArrowRight } from "lucide-react";

export default function ModeCard({
  id,
  label,
  path,
  icon: Icon,
}: MenuOptionsConfig) {
  return (
    <Link
      key={id}
      to={path}
      className="inline-flex gap-4 items-stretch justify-center font-medium font-mono rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors bg-neutral-700 hover:bg-neutral-800 text-neutral-50 focus:ring-neutral-300 p-4 text-sm transition-transform duration-200 ease-out hover:-translate-y-1"
    >
      <div className="flex items-center justify-center px-2 rounded-sm bg-neutral-950">
        <Icon className="size-4 text-primary-500" />
      </div>
      <div className="flex flex-col flex-1 font-sans">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">{label}</span>
          <ArrowRight className="size-4" />
        </div>
        <span className="text-sm text-neutral-300 font-light">
          Lorem ipsum dolor sit amet consectoetur
        </span>
      </div>
    </Link>
  );
}
