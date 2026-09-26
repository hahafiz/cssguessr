import { createBrowserRouter, RouterProvider } from "react-router";
import MainMenu from "./components/screen/MainMenu";
import Gameplay from "./components/screen/Gameplay";
import GameOptions from "./components/screen/GameOptions";
import GameLobby from "./components/screen/GameLobby";

const router = createBrowserRouter([
  { path: "/", element: <MainMenu /> },
  { path: "/setup", element: <GameOptions /> },
  { path: "/solo/:roomId", element: <Gameplay /> },
  { path: "/duel/lobby/:roomId", element: <GameLobby /> }, // placeholder for lobby
  { path: "/room/:roomId", element: <Gameplay /> }, // gameplay mode
]);

function App() {
  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
