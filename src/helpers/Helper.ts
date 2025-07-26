import { VERSION } from "../Constants";
import { ApiQuery } from "../models/ApiQuery";

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
