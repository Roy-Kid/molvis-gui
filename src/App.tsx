import {initMolvis, Molvis} from "./app_package"
import MolvisApp from "./MolvisApp";
import ControlPanel from "./ControlPanel";
import Bar from "./Bar";
import { useState } from "react";

export interface IControlPanelState {
  isOpen: boolean;
  set: (isOpen: boolean) => void;
};

export {Molvis};

export default function App() {

  const molvis:Molvis = initMolvis();
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(true);
  const controlPanelState = {"isOpen": isControlPanelOpen, "set":setIsControlPanelOpen};

  return (
    <div>
      <Bar app={molvis} controlPanelState={controlPanelState}/>
      <MolvisApp app={molvis}/>
      <ControlPanel app={molvis} controlPanelState={controlPanelState}/>
    </div>
  )

}
