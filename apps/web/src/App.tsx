import { createBrowserRouter, RouterProvider } from "react-router";
import MainMenu from "./components/screen/MainMenu";
import GameOptions from "./components/screen/GameOptions";
import GameLobby from "./components/screen/GameLobby";
import SoloGameplay from "./components/screen/SoloGameplay";
import MultiplayerGameplay from "./components/screen/MultiplayerGameplay";
import PracticeMode from "./components/screen/PracticeMode";

const router = createBrowserRouter([
  { path: "/", element: <MainMenu /> },
  { path: "/setup", element: <GameOptions /> },
  { path: "/practice", element: <PracticeMode /> },
  { path: "/solo/:roomId", element: <SoloGameplay /> },
  { path: "/party/lobby/:roomId", element: <GameLobby /> },
  { path: "/room/:roomId", element: <MultiplayerGameplay /> },
]);

function App() {
  return (
    <div className="bg-gray-900 min-h-screen w-full flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
