import { Button } from "../ui/button/Button";
import {
  UserRound,
  PaintBucket,
  Palette,
  Component,
  type LucideIcon,
} from "lucide-react";
import Logo from "../ui/Logo";
import ModeCard from "../ui/button/ModeCard";

export interface MenuOptionsConfig {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}

export default function MainMenu() {
  const MenuOptions: MenuOptionsConfig[] = [
    {
      id: "singleplayer",
      label: "Singleplayer",
      path: "/setup?mode=solo",
      icon: PaintBucket,
    },
    {
      id: "party",
      label: "Create Party",
      path: "/setup?mode=party",
      icon: Component,
    },
    { id: "practice", label: "Practice", path: "/practice", icon: Palette },
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
        <ModeCard
          key={c.id}
          id={c.id}
          label={c.label}
          path={c.path}
          icon={c.icon}
        />
      ))}
    </div>
  );
}
