import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import { ConfigsAction } from '../../../../models/Configs';
import { SOLUTION_NAME } from '../../../../Constants';

const LOG_SOURCE: string = SOLUTION_NAME + ':ActionsCommandBar:';

export type ActionsCommandBarProps = {
    actions: ConfigsAction[];
    selectedActionId: string;
    onChange: (action: ConfigsAction) => void;
}

const ActionsCommandBar: React.FC<ActionsCommandBarProps> = (props) => {
    console.debug(LOG_SOURCE);

    const { actions, onChange } = props;

    const handleLinkClick = (item?: PivotItem): void => {
        if (item) {
            const action = actions.filter(g => g.id === item.props.itemKey)[0];
            console.debug(LOG_SOURCE, `handleLinkClick`, `Selected action: ${action.title}`);
            onChange(action);
        }
    };

    const items = actions.map(group =>
        <PivotItem headerText={group.title} itemKey={group.id} key={group.id} />
    );

    return (
        <Pivot
            aria-label="Actions Command Bar"
            selectedKey={props.selectedActionId}
            onLinkClick={handleLinkClick}
        >{items}</Pivot>
    );
};

export default ActionsCommandBar;