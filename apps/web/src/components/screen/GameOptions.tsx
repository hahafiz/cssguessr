import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { createRoom } from "../../api/rooms";
import { Button } from "../ui/button/Button";
import { storePlayer } from "../../api/playerId";
import { Hash, Palette, Pipette, SlidersHorizontal } from "lucide-react";

export default function GameOptions() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const [maxPlayers, setMaxPlayers] = useState(2);
  const [colorFormat, setColorFormat] = useState<"rgb" | "hsl">("rgb");
  const [inputMethod, setInputMethod] = useState<"slider" | "hex">("slider");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (mode !== "solo" && mode !== "party") {
    return (
      <p>
        Invalid game mode
        <Button onClick={() => navigate("/")}>Back to Menu</Button>
      </p>
    );
  }

  const onCreateGame = async () => {
    if (mode === "party" && (maxPlayers < 2 || maxPlayers > 10)) {
      setError("Party needs 2 to 10 players");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      const newRoom = await createRoom({
        max_players: mode === "party" ? maxPlayers : 1,
      });
      storePlayer(newRoom.id, {
        playerId: newRoom.player_id,
        publicId: newRoom.public_id,
      });

      if (mode === "party") {
        navigate(`/party/lobby/${newRoom.id}`);
      } else {
        navigate(`/solo/${newRoom.id}`);
      }
    } catch (err) {
      console.error("Failed to create game: ", err);
      setError("Could not create the game. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-8 w-screen">
      <div className="flex flex-col gap-2">
        <p className="text-white font-mono text-xs">color_mode:</p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="flex-1 gap-2"
            onClick={() => setColorFormat("rgb")}
          >
            <Palette className="size-4" />
            RGB
          </Button>
          <Button
            variant="secondary"
            className="flex-1 gap-2"
            onClick={() => setColorFormat("hsl")}
            disabled
          >
            <Pipette className="size-4" />
            HSL
          </Button>
        </div>
      </div>

      {colorFormat === "rgb" && (
        <div className="flex flex-col gap-2">
          <p className="text-white font-mono text-xs">input_format:</p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="flex-1 gap-2"
              onClick={() => setInputMethod("slider")}
            >
              <SlidersHorizontal className="size-4" />
              Slider
            </Button>
            <Button
              variant="secondary"
              className="flex-1 gap-2"
              onClick={() => setInputMethod("hex")}
              disabled
            >
              <Hash className="size-4" />
              Hex
            </Button>
          </div>
        </div>
      )}

      {mode === "party" && (
        <>
          <label className="text-white font-mono text-xs">party_size:</label>
          <input
            id="max-player"
            type="number"
            min={2}
            max={10}
            value={maxPlayers}
            className="text-black bg-white rounded-sm py-1 px-2"
            onChange={(e) => {
              setMaxPlayers(Number(e.target.value));
              setError(null);
            }}
          ></input>
        </>
      )}

      {error && (
        <p role="alert" className="text-red-400">
          {error}
        </p>
      )}

      <Button variant="primary" onClick={onCreateGame} disabled={isSubmitting}>
        start_game
      </Button>
    </div>
  );
}
