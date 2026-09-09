import { useNavigate } from "react-router";
import { Button } from "../ui/button/Button";

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <>
      <Button variant="primary" onClick={() => navigate("/solo")}>
        Solo Mode
      </Button>
      <Button variant="primary" disabled>
        Duel Mode
      </Button>
    </>
  );
}
