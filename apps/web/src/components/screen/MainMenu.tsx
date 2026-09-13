import { useNavigate } from "react-router";
import { Button } from "../ui/button/Button";

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <>
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
    </>
  );
}
