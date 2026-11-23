import { Button } from "../ui/button/Button";
import { UserRound } from "lucide-react";
import Logo from "../ui/Logo";
import type { MenuOptionsConfig } from "@cssguessr/shared-types";
import ModeCard from "../ui/button/ModeCard";

export default function MainMenu() {
  const MenuOptions: MenuOptionsConfig[] = [
    { id: "singleplayer", label: "Singleplayer", path: "/setup?mode=solo" },
    { id: "party", label: "Create Party", path: "/setup?mode=party" },
    { id: "practice", label: "Practice", path: "/practice" },
  ];

  return (
    <div className="flex flex-col gap-4 p-8 w-screen">
      <div className="flex items-center justify-between">
        <Logo />
        <Button variant="primary" size="xs" aria-label="profile button">
          <UserRound className="size-4" />
        </Button>
      </div>
      {MenuOptions.map((c) => (
        <ModeCard id={c.id} label={c.label} path={c.path} />
      ))}
    </div>
  );
}
