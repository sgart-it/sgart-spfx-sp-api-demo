import { IColumn } from "@fluentui/react";
import { SOLUTION_NAME, VERSION } from "../Constants";
import { ApiQuery } from "../models/ApiQuery";
import { Table } from "../models/TableItem";

const LOG_SOURCE: string = SOLUTION_NAME + ':Helper:';

export const buildQuery = (apiQuery: ApiQuery | undefined): string => {
  if (!apiQuery) {
    return '';
  }
  const webUrl = apiQuery.webUrl || '';

  if (apiQuery.mode === "search") {
    return (webUrl === '/' ? '' : webUrl)
      + apiQuery.apiUrl
      + '?'
      + (apiQuery.filter ? `querytext='${apiQuery.filter}'&` : '')
      + (apiQuery.select ? `selectproperties='${apiQuery.select}'&` : '')
      + (apiQuery.top ? `rowlimit=${apiQuery.top}&` : '');
  }
  return (webUrl === '/' ? '' : webUrl)
    + apiQuery.apiUrl
    + '?'
    + (apiQuery.select ? `$select=${apiQuery.select}&` : '')
    + (apiQuery.filter ? `$filter=${apiQuery.filter}&` : '')
    + (apiQuery.orderBy ? `$orderBy=${apiQuery.orderBy}&` : '')
    + (apiQuery.expand ? `$expand=${apiQuery.expand}&` : '')
    + (apiQuery.top ? `$top=${apiQuery.top}&` : '')
    + (apiQuery?.skip ? `$skip=${apiQuery?.skip}&` : '');
};

export const buildJavaScript = (apiQuery: ApiQuery | undefined, odataVerbose: boolean, outputNormal: boolean): string => {
  const queryUrl = buildQuery(apiQuery);

  return `var fetchGetJson = async (url, odataVerbose, outputNormal) => {
    /* to paste into the 'Browser Developer Console' in another Tenant */
    var ct = "application/json; odata=" + (odataVerbose ? "verbose" : "nometadata");
    var response = await fetch(url, { method: "GET", headers: { "Accept": ct, "Content-Type": ct }});
    if (!response.ok) {
        var txt = await response.json();
        throw new Error(\`Response status: \${response.status}, \${response.statusText}, \${txt}\`);
    }
    console.debug("fetchGetJson: OK " + url);
    var data = await response.json();
    if(outputNormal) return data;
    if(odataVerbose) {
      if(data.d && data.d.results) return data.d.results;
      else if(data.d) return data.d;
      return data;
    } 
    return data.value ?? data;
};
/* sample by Sgart.it v. ${VERSION}*/

var relativeUrl = \`${queryUrl}\`;
var data = await fetchGetJson(relativeUrl, ${odataVerbose.toString().toLocaleLowerCase()}, ${outputNormal.toString().toLocaleLowerCase()});
console.log("API result", data);
`;
};

export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Text copied to clipboard:', text);
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
};

const buildTableItem = (item: any): Table => {
  const table: Table = {
    columns: [
      {
        key: 'internalName',
        name: 'InternalName',
        fieldName: 'internalName',
        minWidth: 250,
        isRowHeader: true,
        isResizable: true
      },
      {
        key: 'value',
        name: 'Value',
        fieldName: 'value',
        minWidth: 450,
        isResizable: true
      }
    ],
    items: []
  };

  if (item) {
    table.items = Object.keys(item).map(key => {
      const value = item[key];
      if (typeof value === 'object') {
        return { internalName: key, value: JSON.stringify(value, null, 2) };
      }
      return { internalName: key, value };
    });
  }
  return table;
};

const buildTableItems = (items: any[]): Table => {
  const table: Table = {
    columns: [],
    items: []
  };

  if (!items || items.length === 0) {
    return table;
  }

  const item: any = items[0];
  if (item) {
    table.columns = Object.keys(item).map<IColumn>(key => ({
      key,
      name: key,
      fieldName: key,
      minWidth: 50,
      isResizable: true
    }));

    const newItems: any[] = [];
    items.forEach(item => {
      const ni: any = {};
      Object.keys(item).forEach(key => {
        const value = item[key];
        ni[key] = typeof value === 'object'
          ? JSON.stringify(value, null, 2)
          : value;
      });
      newItems.push(ni);
    });
    table.items = newItems;

  }
  return table;


};

export const buildTable = (items: any): Table => {
  if (!items) {
    console.debug(LOG_SOURCE, 'buildTable: items is undefined or null');
    return { columns: [], items: [] };
  }

  if (items.value && Array.isArray(items.value)) {
    const table = buildTableItems(items.value);
    console.debug(LOG_SOURCE, 'buildTable: items.value is an array', table);
    return table;
  }

  if (items.d) {
    if (items.d.results && Array.isArray(items.d.results)) {
      const table = buildTableItems(items.d.results);
      console.debug(LOG_SOURCE, 'buildTable: items.d.results is an array', table);
      return table;
    } else {
      const table = buildTableItem(items.d);
      console.debug(LOG_SOURCE, 'buildTable: items.d is a single object', table);
      return table;
    }
  }

  return buildTableItem(items);
}