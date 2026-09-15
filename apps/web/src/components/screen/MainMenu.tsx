import { useNavigate } from "react-router";
import { Button } from "../ui/button/Button";

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-4 w-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Button variant="primary" onClick={() => navigate("/setup?mode=solo")}>
          Solo Mode
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate("/setup?mode=duel")}
          disabled
        >
          Duel Mode
        </Button>
      </div>
    </>
  );
}
