import { useNavigate } from "react-router";
import { Button } from "./ui/button/Button";

export default function RoomError({ message }: { message: string }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-white">{message}</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Back to Menu
      </Button>
    </div>
  );
}
