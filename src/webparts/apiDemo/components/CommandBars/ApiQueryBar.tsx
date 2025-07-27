import * as React from 'react';
import { IStackTokens, Position, PrimaryButton, SpinButton, Stack, TextField, TooltipHost } from '@fluentui/react';
import { SOLUTION_NAME } from '../../../../Constants';
import { ApiQuery } from '../../../../models/ApiQuery';

const LOG_SOURCE: string = SOLUTION_NAME + ':ApiQueryBar:';

const stackTokens: IStackTokens = { childrenGap: 10 };

export type ApiQueryBarProps = {
    query: ApiQuery;
    onChange: (query: ApiQuery) => void;
    onExecute: () => void;
}

const ApiQueryBar: React.FC<ApiQueryBarProps> = (props) => {
    console.debug(LOG_SOURCE);

    const { query, onChange, onExecute } = props;
    const { webUrl, apiUrl, mode, select, filter, orderBy, expand, top, skip } = query;
    const isSearch = mode === "search";

    return (
        <form noValidate autoComplete="on">
            <Stack styles={{ root: { width: '100%' } }}>
                <Stack horizontal tokens={stackTokens} styles={{ root: { width: '100%' } }}>
                    <TextField label="Web URL" value={webUrl} onChange={(_, newValue) => { onChange({ ...query, webUrl: newValue }) }} styles={{ root: { width: '25%' } }} />
                    <TextField label="API URL" value={apiUrl} onChange={(_, newValue) => { onChange({ ...query, apiUrl: newValue }) }} styles={{ root: { width: '65%' } }} />
                    <PrimaryButton text="Execute" onClick={onExecute} styles={{ root: { marginTop: "29px", width: '10%' } }} />
                </Stack>
                {isSearch
                    ? <>
                        <Stack tokens={stackTokens} styles={{ root: { width: '100%' } }}>
                            <TextField label="querytext" value={filter} onChange={(_, newValue) => { onChange({ ...query, filter: newValue }) }} styles={{ root: { width: '100%' } }} />
                        </Stack>
                        <Stack horizontal tokens={stackTokens} styles={{ root: { width: '100%' } }}>
                            <TextField label="selectproperties" value={select} onChange={(_, newValue) => { onChange({ ...query, select: newValue }) }} styles={{ root: { width: '90%' } }} />
                            <SpinButton label="rowlimit" labelPosition={Position.top} value={top?.toString()} onChange={(_, newValue) => { onChange({ ...query, top: newValue ? parseInt(newValue) : 10 }) }} min={1} max={5000} step={1} styles={{ root: { width: '10%' } }} />
                        </Stack>
                    </>
                    : <>
                        <Stack horizontal tokens={stackTokens} styles={{ root: { width: '100%' } }}>
                            <TextField label="select" value={select} onChange={(_, newValue) => { onChange({ ...query, select: newValue }) }} styles={{ root: { width: '100%' } }} />
                            <TooltipHost content="Filter is used for $filter, querytext for search">
                                <TextField label="filter" value={filter} onChange={(_, newValue) => { onChange({ ...query, filter: newValue }) }} styles={{ root: { width: '100%' } }} />
                            </TooltipHost>
                        </Stack>
                        <Stack horizontal tokens={stackTokens} styles={{ root: { width: '100%' } }}>
                            <TextField label="expand" value={expand} onChange={(_, newValue) => { onChange({ ...query, expand: newValue }) }} styles={{ root: { width: '100%' } }} />
                            <TextField label="orderby" value={orderBy} onChange={(_, newValue) => { onChange({ ...query, orderBy: newValue }) }} styles={{ root: { width: '80%' } }} />
                            <SpinButton label="top" labelPosition={Position.top} value={top?.toString()} onChange={(_, newValue) => { onChange({ ...query, top: newValue ? parseInt(newValue) : 0 }) }} min={0} max={5000} step={1} styles={{ root: { width: '100px' } }} />
                            <SpinButton label="skip" labelPosition={Position.top} value={skip?.toString()} onChange={(_, newValue) => { onChange({ ...query, skip: newValue ? parseInt(newValue) : 0 }) }} min={0} max={5000} step={1} styles={{ root: { width: '100px' } }} />
                        </Stack>
                    </>
                }
            </Stack>
        </form>
    );
};

export default ApiQueryBar;