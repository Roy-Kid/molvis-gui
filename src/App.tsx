import { useEffect } from "react";
import { initializeMolvis } from "./app_package";

export default function App() {

  useEffect(()=>{
    initializeMolvis({canvas: document.querySelector("canvas") as HTMLCanvasElement});
  }, []);

  return (
    <div id="molvisContainer">
      <canvas />
    </div>
  )

}
