import { useNavigate } from "react-router";
import { Button } from "../ui/button/Button";
import { UserRound } from "lucide-react";
import Logo from "../ui/Logo";

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 p-8 w-screen">
      <div className="flex items-center justify-between">
        <Logo />
        <Button variant="primary" size="xs" aria-label="profile button">
          <UserRound className="size-4" />
        </Button>
      </div>
      <Button variant="primary" onClick={() => navigate("/setup?mode=solo")}>
        Singleplayer
      </Button>
      <Button variant="primary" onClick={() => navigate("/setup?mode=party")}>
        Create Party
      </Button>
      <Button variant="primary" onClick={() => navigate("/practice")}>
        Practice
      </Button>
    </div>
  );
}
