import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import { ConfigsGroup } from '../../../../models/Configs';
import { SOLUTION_NAME } from '../../../../Constants';

const LOG_SOURCE: string = SOLUTION_NAME + ':GroupsCommandBar:';

export type GroupsCommandBarProps = {
    groups: ConfigsGroup[];
    selectedGroupId: string;
    onChange: (group: ConfigsGroup) => void;
}

const GroupsCommandBar: React.FC<GroupsCommandBarProps> = (props) => {
    console.debug(LOG_SOURCE);

    const { groups, onChange } = props;

    const handleLinkClick = (item?: PivotItem): void => {
        if (item) {
            const group = groups.filter(g => g.id === item.props.itemKey)[0];
            console.debug(LOG_SOURCE, `handleLinkClick`, `Selected group: ${group.title}`);
            onChange(group);
        }
    };
    const items = groups.map(group =>
        <PivotItem headerText={group.title} itemKey={group.id} key={group.id} />
    );

    return (
        <Pivot
            aria-label="Groups Command Bar"
            selectedKey={props.selectedGroupId}
            onLinkClick={handleLinkClick}
        >{items}</Pivot>
    );
};

export default GroupsCommandBar;