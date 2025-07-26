import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './ApiDemo.module.scss';
import type { IApiDemoProps } from './IApiDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import GroupsCommandBar from './CommandBars/GroupsCommandBar';
import { SGART_NAME, SGART_URL, SOLUTION_NAME, VERSION } from '../../../Constants';
import { ConfigsAction, ConfigsGroup, ConfigsQuery } from '../../../models/Configs';
import ActionsCommandBar from './CommandBars/ActionsCommandBar';
import { ApiQuery } from '../../../models/ApiQuery';
import ApiQueryBar from './CommandBars/ApiQueryBar';
import { CommandBar, Dropdown, ICommandBarItemProps, IDropdownOption, Pivot, PivotItem, Stack, TextField } from '@fluentui/react';
import * as H from '../../../helpers/Helper';

const LOG_SOURCE: string = SOLUTION_NAME + ':ApiDemo:';

const outputOptions: IDropdownOption[] = [
  { key: '1', text: 'Normal' },
  { key: '0', text: 'Simple' }
];
const odataOptions: IDropdownOption[] = [
  { key: '1', text: 'Verbose' },
  { key: '0', text: 'NoMetadata' }
];

const stackTokens = { childrenGap: 10 };

const getTabId = (itemKey: string): string => {
  return `SgarResultTans_${itemKey}`;
};


const ApiDemo: React.FC<IApiDemoProps> = (props) => {
  const {
    //configService
    appTitle,
    //isDarkTheme,
    //environmentMessage,
    hasTeamsContext,
    //userDisplayName,
    dataService
  } = props;

  //const [configs, setConfigs] = useState<Configs>({ groups: [] });
  const [groups, setGroups] = useState<ConfigsGroup[]>([]);
  const [groupId, setGroupId] = useState("");
  const [actions, setActions] = useState<ConfigsAction[]>([]);
  const [actionId, setActionId] = useState("");
  const [apiQuery, setApiQuery] = useState<ApiQuery | undefined>(undefined);
  const [queryResult, setQueryResult] = useState("");
  const [outputNormal, setOutputNormal] = useState(true);
  const [odataVerbose, setOdataVerbose] = useState(false);
  const [resultTabSelected, setResultTabSelected] = useState('response');

  const responseCommandBarItems: ICommandBarItemProps[] = [
    {
      key: 'cmdCopy',
      text: 'Copy',
      iconProps: { iconName: 'Copy' },
      onClick: () => {
        const txt = resultTabSelected ==='response'
        ? queryResult
        : H.buildJavaScript(apiQuery, odataVerbose, outputNormal);
        navigator.clipboard.writeText(txt)
          .then(() => {
            // Optionally, provide feedback to the user, e.g., display a tooltip or alert
            console.log(LOG_SOURCE, 'Text copied to clipboard', txt);
          })
          .catch(err => {
            console.error(LOG_SOURCE, 'Failed to copy text: ', err);
          });
      }
    }
  ];

  const changeApiQuery = (actionId: string): void => {
    console.debug(LOG_SOURCE, `changeApiQuery: Group: ${groupId}, Action: ${actionId}`);

    setQueryResult("");

    const action = actions.filter(a => a.id === actionId)[0];

    const q = {
      webUrl: apiQuery?.webUrl ?? '',
      apiUrl: '',
      mode: apiQuery?.mode,
      select: '',
      filter: '',
      expand: '',
      orderBy: '',
      top: apiQuery?.top || 500
    } as ApiQuery;

    if (action) {
      console.debug(LOG_SOURCE, `changeApiQuery: action: '${action.title}'`);
      q.apiUrl = action.url || '';
      const query = action.query as ConfigsQuery;
      if (query) {
        if (query.mode) q.mode = query.mode === "search" ? "search" : undefined;
        if (query.select) q.select = query.select || '';
        if (query.filter) q.filter = query.filter || '';
        if (query.expand) q.expand = query.expand || '';
        if (query.orderBy) q.orderBy = query.orderBy || '';
        if (query.top) q.top = query.top || 500;
        if (query.skip) q.skip = query.skip;
      }
    }
    console.debug(LOG_SOURCE, `changeApiQuery: query:`, q);
    setApiQuery(q);
  };

  const onChangeGroup = (group: ConfigsGroup): void => {
    if (!group) {
      return;
    }
    const { id } = group;
    console.debug(LOG_SOURCE, `onCommandBar`, `Change group to ${id}`);
    const filteredGroups = groups.filter(g => g.id === id);
    if (filteredGroups.length > 0) {
      const firstGroup = filteredGroups[0];
      setGroupId(firstGroup.id);
      const selectedActions = firstGroup.actions;
      setActions([...selectedActions]);
    }
  };

  const onChangeAction = (action: ConfigsAction): void => {
    if (!action) {
      return;
    }
    const { id } = action;
    console.debug(LOG_SOURCE, `onCommandBar`, `Change action to ${id}`);
    const filteredActions = actions.filter(a => a.id === id);
    if (filteredActions.length > 0) {
      const action = filteredActions[0];
      setActionId(action.id);
      changeApiQuery(action.id);
    }
  };

  const loadGroups = async (): Promise<void> => {
    // debounce: https://www.freecodecamp.org/news/deboucing-in-react-autocomplete-example/
    try {
      const configs = await dataService.configs.get();

      setGroups([...(configs.groups)]);

    } catch (e) {
      console.error(LOG_SOURCE, `loadItems`, e);
    }
  };

  useEffect(() => {
    console.debug(LOG_SOURCE, `useEffect`, `Groups: ${groups.length}`);
    onChangeGroup(groups[0]);
  }, [groups]);

  useEffect(() => {
    console.debug(LOG_SOURCE, `useEffect`, `Actions: ${actions.length}`);
    onChangeAction(actions[0]);
  }, [actions]);

  //componentDidMount
  useEffect(() => {
    console.debug(LOG_SOURCE, `componentDidMount called.`);
    void loadGroups();
  }, []);

  const executeQuery = async (): Promise<void> => {
    if (!apiQuery) {
      console.warn(LOG_SOURCE, `executeQuery`, `No API query defined.`);
      return;
    }

    try {
      const url = H.buildQuery(apiQuery);
      console.debug(LOG_SOURCE, `executeQuery`, `Executing query: ${url}`);

      setQueryResult('Loading ...');
      setResultTabSelected('response');

      const result = await dataService.api.executeQueryGet(url, outputNormal, odataVerbose);
      console.log(LOG_SOURCE, "API result", result);
      setQueryResult(JSON.stringify(result, null, 4));
    } catch (error) {
      setQueryResult(JSON.stringify(error, null, 4));
    }
  };

  return (
    <section className={`${styles.apiDemo} ${hasTeamsContext ? styles.teams : ''}`} >
      {appTitle?.length > 0 &&
        <div className={styles.welcome}>
          <h2>{escape(appTitle)}</h2>
        </div>
      }
      <div className={styles.commandBarGroups}>
        <GroupsCommandBar groups={groups} selectedGroupId={groupId} onChange={onChangeGroup} />
      </div>
      <div className={styles.commandBarActions}>
        <ActionsCommandBar actions={actions} selectedActionId={actionId} onChange={onChangeAction} />
      </div>
      {apiQuery &&
        <>
          <div className={styles.query}>
            <ApiQueryBar query={apiQuery} onChange={(value) => setApiQuery(value)} onExecute={executeQuery} />
          </div>
          <div className={styles.queryUrl}>
            <Stack horizontal tokens={stackTokens} styles={{ root: { width: '100%' } }}>
              <TextField label="Query" readOnly value={H.buildQuery(apiQuery)} styles={{ root: { width: '100%' } }} />
              <Dropdown label="odata" options={odataOptions} defaultSelectedKey={odataVerbose ? '1' : '0'} onChange={(_, newValue) => { setOdataVerbose(newValue?.key.toString() === "1") }} styles={{ root: { width: '120px' } }} />
              <Dropdown label="Output" options={outputOptions} defaultSelectedKey={outputNormal ? '1' : '0'} onChange={(_, newValue) => { setOutputNormal(newValue?.key.toString() === "1") }} styles={{ root: { width: '90px' } }} />
            </Stack>
          </div>

          <Pivot linkFormat="tabs"
            selectedKey={resultTabSelected}
            onLinkClick={(item?: PivotItem) => { if (item) setResultTabSelected(item?.props?.itemKey || '') }}
            getTabId={getTabId}>
            <PivotItem headerText="JSON Response" itemKey='response'>
              <div className={styles.responseJson}>
                <CommandBar items={responseCommandBarItems} className={styles.jsCommandBar} />
                <pre className={styles.responseJsonOutput}>{queryResult}</pre>
              </div>
            </PivotItem>
            <PivotItem headerText="JavaScript" itemKey='javascript'>
              <div className={styles.responseJson}>
                <CommandBar items={responseCommandBarItems} className={styles.jsCommandBar} />
                <pre className={styles.responseJsonOutput}>{H.buildJavaScript(apiQuery, odataVerbose, outputNormal)}</pre>
              </div>
            </PivotItem>
          </Pivot>
        </>
      }
      <div>v. {VERSION} by <a href={SGART_URL} target="_blank" rel="noreferrer">{SGART_NAME}</a> - API reference <a href="https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?tabs=csom" target="_blank" rel="noreferrer">Get to know the SharePoint REST service</a></div>
    </section>
  );
};

export default ApiDemo;