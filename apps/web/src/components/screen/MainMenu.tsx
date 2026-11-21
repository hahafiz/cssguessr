import { useNavigate } from "react-router";
import { Button } from "../ui/button/Button";

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 p-8 w-screen">
      <div>
        <span className="text-primary-600 font-mono font-bold">
          css_guessr <span className="text-gray-400">()</span>
        </span>
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
