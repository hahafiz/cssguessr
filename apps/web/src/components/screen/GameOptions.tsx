import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { createRoom } from "../../api/rooms";
import { Button } from "../ui/button/Button";
import { storePlayerId } from "../../api/playerId";

export default function GameOptions() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const [maxPlayers, setMaxPlayers] = useState(2);
  const [colorFormat, setColorFormat] = useState<"rgb" | "hsl">("rgb");
  const [inputMethod, setInputMethod] = useState<"slider" | "hex">("slider");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  if (mode !== "solo" && mode !== "duel") {
    return (
      <p>
        Invalid game mode
        <Button onClick={() => navigate("/")}>Back to Menu</Button>
      </p>
    );
  }

  const onCreateGame = async () => {
    setIsSubmitting(true);
    try {
      const newRoom = await createRoom({
        max_players: mode === "duel" ? maxPlayers : 1,
      });
      storePlayerId(newRoom.id, newRoom.player_id);

      if (mode === "duel") {
        navigate(`/duel/lobby/${newRoom.id}`);
      } else {
        navigate(`/solo/${newRoom.id}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <p>Select color mode</p>
        <div>
          <Button variant="primary" onClick={() => setColorFormat("rgb")}>
            RGB
          </Button>
          <Button
            variant="primary"
            onClick={() => setColorFormat("hsl")}
            disabled
          >
            HSL
          </Button>
        </div>
      </div>

      {colorFormat === "rgb" && (
        <div>
          <p>Select RGB input format</p>
          <div>
            <Button variant="primary" onClick={() => setInputMethod("slider")}>
              Slider
            </Button>
            <Button
              variant="primary"
              onClick={() => setInputMethod("hex")}
              disabled
            >
              Hex
            </Button>
          </div>
        </div>
      )}

      {mode === "duel" && (
        <>
          <label>Max player</label>
          <input
            id="max-player"
            type="number"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(Number(e.target.value))}
          ></input>
        </>
      )}

      <Button variant="primary" onClick={onCreateGame} disabled={isSubmitting}>
        Start Game
      </Button>
    </>
  );
}
