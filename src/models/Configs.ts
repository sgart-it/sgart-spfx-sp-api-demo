export type Configs = {
    groups: ConfigsGroup[];
};
export type ConfigsGroup = {
    id: string;
    title: string;
    actions: ConfigsAction[];
};
export type ConfigsAction = {
    id: string;
    title: string;
    url: string;
    query?: ConfigsQuery | ConfigsSearchQuery;
};
export type ConfigsQuery = {
    mode?: "search" | undefined;
    select?: string,
    filter?: string,
    expand?: string,
    orderBy?: string,
    top?: number,
    skip?: number
};
export type ConfigsSearchQuery = {
    querytext?: string,
    selectproperties?: string,
    rowlimit?: number
};
