import { createBrowserRouter, RouterProvider } from "react-router";
import MainMenu from "./components/screen/MainMenu";
import Gameplay from "./components/screen/Gameplay";
import GameOptions from "./components/screen/GameOptions";

const router = createBrowserRouter([
  { path: "/", element: <MainMenu /> },
  { path: "/setup", element: <GameOptions /> },
  { path: "/solo/:roomId", element: <Gameplay /> },
  { path: "/duel/lobby/:roomId" }, // placeholder for lobby
  { path: "/duel/:roomId", element: <Gameplay /> }, // gameplay mode
]);

function App() {
  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
