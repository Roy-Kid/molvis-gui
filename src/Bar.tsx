import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { setVirtualParent } from '@fluentui/dom-utilities';
import type { Molvis, IControlPanelState } from './App';

const openFile = (ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> | undefined) => {
    ev?.persist();

    Promise.resolve().then(() => {
        const inputElement = document.createElement('input');
        inputElement.style.visibility = 'hidden';
        inputElement.setAttribute('type', 'file');

        document.body.appendChild(inputElement);

        const target = ev?.target as HTMLElement | undefined;

        if (target) {
            setVirtualParent(inputElement, target);
        }

        inputElement.click();

        if (target) {
            setVirtualParent(inputElement, null);
        }

        setTimeout(() => {
            inputElement.remove();
        }, 10000);
    });
};

interface IBarProps {
    app: Molvis;
    controlPanelState: IControlPanelState;
};

const Bar = ({app, controlPanelState}: IBarProps): JSX.Element => {

    const _items: ICommandBarItemProps[] = [
        {
            key: 'openFile',
            text: 'Open',
            cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
            iconProps: { iconName: 'OpenFolderHorizontal' },
            subMenuProps: {
                items: [
                    {
                        key: 'data',
                        text: 'Data',
                        // iconProps: { iconName: 'Mail' },
                        preferMenuTargetAsEventTarget: true,
                        onClick: openFile
                    },
                    {
                        key: 'trajectory',
                        text: 'Trajectory',
                        // iconProps: { iconName: 'Calendar' },
                        preferMenuTargetAsEventTarget: true,
                        onClick: openFile
                    },
                ],
            },
        },
    ];

    const openControlPanelButton: ICommandBarItemProps[] = [
        {
            key: 'openPanel',
            text: 'OpenPanel',
            iconOnly: true,
            iconProps: { iconName: 'OpenPane' },
            onClick: () => {
                if (!controlPanelState.isOpen) {
                    controlPanelState.set(true);
                }
            },
        },
    ];

    return (
        <CommandBar
            items={_items}
            farItems={openControlPanelButton}
        />
    );
};

export default Bar;