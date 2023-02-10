
import { useEffect } from "react";
import type { Molvis } from "./App";

interface IMolvisAppProps {
    app: Molvis;
}

export default function MolvisApp({app, }:IMolvisAppProps) {

  useEffect(()=>{
    app.init(document.getElementById("molvisCanvas") as HTMLCanvasElement);
  }, [app]);

  return (
    <div>
      <canvas id="molvisCanvas"></canvas>
    </div>
  )

}
