import { createBrowserRouter, RouterProvider } from "react-router";
import MainMenu from "./components/screen/MainMenu";
import Gameplay from "./components/screen/Gameplay";

const router = createBrowserRouter([
  { path: "/", element: <MainMenu /> },
  { path: "/solo", element: <Gameplay /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
