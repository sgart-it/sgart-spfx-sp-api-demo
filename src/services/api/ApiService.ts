import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { SOLUTION_NAME } from "../../Constants";
import { ServiceScope } from '@microsoft/sp-core-library';

const LOG_SOURCE: string = SOLUTION_NAME + ':ApiService:';

const httpOptionsGetNometadata: ISPHttpClientOptions = {
    headers: {
        'odata-version': '3.0',
        'accept': 'application/json;odata=nometadata',
    }
};
const httpOptionsGetVerbose: ISPHttpClientOptions = {
    headers: {
        'odata-version': '3.0',
        'accept': 'application/json;odata=verbose',
    }
};

export default class ApiService {
    //Registro il servizio
    private _spHttpClient: SPHttpClient;

    constructor(private serviceScope: ServiceScope) {
        console.log(LOG_SOURCE, `Initialized`);
    }

    private getSPHttpClient(): SPHttpClient {
        if (this._spHttpClient === undefined) {
            this._spHttpClient = this.serviceScope.consume(SPHttpClient.serviceKey);
            console.debug(LOG_SOURCE, `_spHttpClient() ${this._spHttpClient}`);
        }
        return this._spHttpClient;
    }

    public executeQueryGet = async (url: string, removeValue: boolean = false, odataVerbose: boolean = true): Promise<unknown> => {
        try {
            const response: SPHttpClientResponse = await this.getSPHttpClient().get(
                url, 
                SPHttpClient.configurations.v1, 
                odataVerbose?  httpOptionsGetVerbose : httpOptionsGetNometadata
            );
            if (!response.ok) {
                console.error(LOG_SOURCE, "executeQueryGet: response error", response);
                const err = await response.json();
                console.error(LOG_SOURCE, "Error " + url, err);
                throw {
                    name: 'ApiError',
                    status: response.status,
                    statusText: response.statusText,
                    url: response.url,
                    message: err
                };
            }
            console.debug(LOG_SOURCE, "fetchGetJson: OK " + url);
            const data = await response.json();
            if (removeValue === false) {
                if (data.value) {
                    console.debug(LOG_SOURCE, "value:[] removed");
                    return data.value;
                }
                if (data.PrimaryQueryResult?.RelevantResults?.Table?.Rows) {
                    console.debug(LOG_SOURCE, "PrimaryQueryResult.RelevantResults.Table.Rows[] removed");
                    return data.PrimaryQueryResult.RelevantResults.Table.Rows;

                }
            }
            return data;
        } catch (err) {
            console.error(LOG_SOURCE, `executeQueryGet ${url}`, err);
            throw err
        }
    };
}