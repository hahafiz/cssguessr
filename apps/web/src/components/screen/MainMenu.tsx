import { useNavigate } from "react-router";
import { Button } from "../ui/button/Button";

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-4 w-28">
        <Button variant="primary" onClick={() => navigate("/setup?mode=solo")}>
          Solo Mode
        </Button>
        <Button variant="primary" onClick={() => navigate("/setup?mode=duel")}>
          Duel Mode
        </Button>
        <Button variant="primary" onClick={() => navigate("/practice")}>
          Practice
        </Button>
      </div>
    </>
  );
}
