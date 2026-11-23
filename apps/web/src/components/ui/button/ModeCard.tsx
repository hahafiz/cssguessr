import type { MenuOptionsConfig } from "@cssguessr/shared-types";
import { Link } from "react-router";

export default function ModeCard({ id, label, path }: MenuOptionsConfig) {
  return (
    <Link
      key={id}
      to={path}
      className="inline-flex items-center justify-center font-medium font-mono rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors bg-primary-500 hover:bg-primary-700 text-primary-950 focus:ring-primary-300 py-2 px-4 text-sm"
    >
      {label}
    </Link>
  );
}
