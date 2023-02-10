import * as React from 'react';
import { Panel } from '@fluentui/react/lib/Panel';
import { IContextualMenuProps, IIconProps, IButtonProps, Stack } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import type { IControlPanelState, Molvis } from './App';
import {
  DetailsList,
  IColumn,
  IDetailsList,
  GroupedListV2_unstable as GroupedListV2,
} from '@fluentui/react';
import { Separator } from '@fluentui/react/lib/Separator';

interface IControlPanelProps {
  app: Molvis;
  controlPanelState: IControlPanelState;
}

export default function ControlPanel({app, controlPanelState}: IControlPanelProps) {

  return (
    <div>

      <Panel
        headerText="Control Panel"
        // this prop makes the panel non-modal
        isBlocking={false}
        isOpen={controlPanelState.isOpen}
        onDismiss={() => { controlPanelState.set(false) }}
        closeButtonAriaLabel="Close"
      >
        <Separator>Modifiers</Separator>
        <ModifierList />
      </Panel>
    </div>
  );
}

export interface IModifier {
  key: string;
  name: string;
  group: string;
}

const menuProps: IContextualMenuProps = {
  items: [
    {
      key: 'emailMessage',
      text: 'Email message',
      iconProps: { iconName: 'Mail' },
      onClick: () => { alert("test") }
    },
    {
      key: 'calendarEvent',
      text: 'Calendar event',
      iconProps: { iconName: 'Calendar' },
      onClick: () => { alert("test2") }
    },
  ],
  directionalHintFixed: true,
};

const emojiIcon: IIconProps = { iconName: 'Emoji2' };

const onAddModifier = () => { alert("test") };

function _alertClicked() {
  alert('Clicked');
}

function ModifierList() {

  const root = React.useRef<IDetailsList>(null);

  const [columns] = React.useState<IColumn[]>([
    { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
  ]);

  const [modifiers, setModifiers] = React.useState<IModifier[]>([
  ]);

  // TODO: group

  React.useEffect(() => {
    root.current?.focusIndex(modifiers.length - 1, true);
  }, [modifiers]);

  const addItem = React.useCallback((ev?: React.SyntheticEvent<any>, button?: IButtonProps): void => {
    // const newGroups = [...groups];
    // newGroups[_blueGroupIndex].count++;
    console.log(ev);
    console.log(button);
    setModifiers(
      modifiers.concat([
        {
          key: 'item-' + modifiers.length,
          name: 'New item ' + modifiers.length,
          group: 'test',
        },
      ]),
    );

    // setGroups(newGroups);
  }, [modifiers]);

  const onRenderColumn = (item: IModifier, index: number | undefined, column: IColumn | undefined) => {
    const value =
      item && column && column.fieldName ? item[column.fieldName as keyof IModifier] || '' : '';

    return <div data-is-focusable={true}>{value}</div>;
  };

  // const onRenderDetailsHeader = (props: IDetailsHeaderProps, _defaultRender?: IRenderFunction<IDetailsHeaderProps> ) => {
  //   return <DetailsHeader {...props}/>;
  // };

  // const removeItem = React.useCallback(
  //   (): void => { console.log(modifiers.length); }, [modifiers]
  // );

  return (
    <div>
      <Stack tokens={{ childrenGap: 8 }} horizontal>
        <IconButton
          menuProps={menuProps}
          iconProps={emojiIcon}
          title="Add"
          onClick={_alertClicked}
        // onMenuClick={addItem}
        />
        <IconButton
          menuProps={menuProps}
          iconProps={emojiIcon}
          title="Add"
          onClick={onAddModifier}
        />
      </Stack>
      <DetailsList
        componentRef={root}
        items={modifiers}
        // groups={groups}
        columns={columns}
        isHeaderVisible={false}
        // onRenderDetailsHeader={onRenderDetailsHeader}
        groupProps={{
          showEmptyGroups: true,
          groupedListAs: GroupedListV2,
        }}
        onRenderItemColumn={onRenderColumn}
        compact={true}
      />
    </div>
  );
}
