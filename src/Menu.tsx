import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { setVirtualParent } from '@fluentui/dom-utilities';
import { atom, useRecoilState } from 'recoil';

export const openControlPanelState = atom({
    key: 'openControlPanelState',
    default: false,
});

export default function TopMenu() {


    const [isOpen, setOpenControlPanelState] = useRecoilState(openControlPanelState);

    const _items: ICommandBarItemProps[] = [
        {
            key: 'openFile',
            text: 'Open',
            cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
            iconProps: { iconName: 'Add' },
            subMenuProps: {
                items: [
                    {
                        key: 'data',
                        text: 'Data',
                        iconProps: { iconName: 'Mail' },
                        preferMenuTargetAsEventTarget: true,
                        onClick: (ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> | undefined) => {
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
                        },
                    },
                    {
                        key: 'trajectory',
                        text: 'Trajectory',
                        iconProps: { iconName: 'Calendar' },
                    },
                ],
            },
        },
        {
            key: 'upload',
            text: 'Upload',
            iconProps: { iconName: 'Add' },
            subMenuProps: {
                items: [
                    {
                        key: 'uploadfile',
                        text: 'File',
                        preferMenuTargetAsEventTarget: true,
                        onClick: (ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> | undefined) => {
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
                        },
                    },
                    {
                        key: 'uploadfolder',
                        text: 'Folder',
                        preferMenuTargetAsEventTarget: true,
                        onClick: (ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> | undefined) => {
                            ev?.persist();

                            Promise.resolve().then(() => {
                                const inputElement = document.createElement('input');
                                inputElement.style.visibility = 'hidden';
                                inputElement.setAttribute('type', 'file');

                                (inputElement as { webkitdirectory?: boolean }).webkitdirectory = true;

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
                        },
                    },
                ],
            },
        },
        {
            key: 'share',
            text: 'Share',
            iconProps: { iconName: 'Share' },
            onClick: () => console.log('Share'),
        },

    ];


    const _farItems: ICommandBarItemProps[] = [
        {
            key: 'openPanel',
            text: 'OpenPanel',
            iconOnly: true,
            iconProps: { iconName: 'Add' },
            onClick: () => {
                if (isOpen) return;
                else {
                    setOpenControlPanelState(true);
                }
            },
        },
    ];



    return (
        <CommandBar
            items={_items}
            farItems={_farItems}
        />
    );
};

