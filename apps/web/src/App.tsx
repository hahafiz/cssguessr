import { createBrowserRouter, RouterProvider } from "react-router";
import MainMenu from "./components/screen/MainMenu";
import GameOptions from "./components/screen/GameOptions";
import GameLobby from "./components/screen/GameLobby";
import SoloGameplay from "./components/screen/SoloGameplay";
import MultiplayerGameplay from "./components/screen/MultiplayerGameplay";

const router = createBrowserRouter([
  { path: "/", element: <MainMenu /> },
  { path: "/setup", element: <GameOptions /> },
  { path: "/solo/:roomId", element: <SoloGameplay /> },
  { path: "/duel/lobby/:roomId", element: <GameLobby /> }, // placeholder for lobby
  { path: "/room/:roomId", element: <MultiplayerGameplay /> }, // gameplay mode
]);

function App() {
  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
