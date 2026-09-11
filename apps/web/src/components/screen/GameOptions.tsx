import { useSearchParams } from "react-router";
export default function GameOptions() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  return <>Test</>;
}
