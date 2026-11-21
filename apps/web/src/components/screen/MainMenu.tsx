import { useNavigate } from "react-router";
import { Button } from "../ui/button/Button";
import { UserRound } from "lucide-react";

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 p-8 w-screen">
      <div className="flex items-baseline justify-between">
        <span className="text-primary-600 font-mono font-bold">
          css_guessr <span className="text-gray-400">()</span>
        </span>
        <Button variant="primary" size="xs">
          <UserRound size={16} />
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
