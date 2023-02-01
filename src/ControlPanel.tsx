import * as React from 'react';
import { Panel } from '@fluentui/react/lib/Panel';
import { openControlPanelState } from './Menu';
import { useRecoilState } from 'recoil';

export default function ControlPanel() {

    const [isOpen, setOpenControlPanelState] = useRecoilState(openControlPanelState);

    // const [_isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

    return (
        <div>
          
          <Panel
            headerText="Non-modal panel"
            // this prop makes the panel non-modal
            isBlocking={false}
            isOpen={isOpen}
            onDismiss={()=>{setOpenControlPanelState(false)}}
            closeButtonAriaLabel="Close"
          >



          </Panel>
        </div>
      );
}
