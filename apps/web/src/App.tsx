import { createBrowserRouter, RouterProvider } from "react-router";
import MainMenu from "./components/screen/MainMenu";
import Gameplay from "./components/screen/Gameplay";
import GameOptions from "./components/screen/GameOptions";

const router = createBrowserRouter([
  { path: "/", element: <MainMenu /> },
  { path: "/solo/setup", element: <GameOptions /> },
  { path: "/solo/:roomId", element: <Gameplay /> },
  { path: "/duel/setup", element: <GameOptions /> },
  { path: "/duel/lobby/:roomId" }, // placeholder for lobby
  { path: "/room/:roomId" }, // gameplay mode
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
