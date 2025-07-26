import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { SOLUTION_NAME } from "../Constants";
import ConfigService from "./configs/ConfigService";
import ApiService from "./api/ApiService";

const LOG_SOURCE: string = SOLUTION_NAME + ':DataService:';

export default class DataService {
    //Registro il servizio
    public static readonly serviceKey: ServiceKey<DataService> = ServiceKey.create<DataService>('SPFx:DataService', DataService);

    private _configs: ConfigService | undefined = undefined;
    private _api: ApiService | undefined = undefined;

    constructor(private serviceScope: ServiceScope) {
        console.log(LOG_SOURCE, `${serviceScope} Initialized`);
    }

    public get configs(): ConfigService {
        if (this._configs === undefined) {
            this._configs = new ConfigService();
        }
        return this._configs;
    }

    public get api(): ApiService {
        if (this._api === undefined) {
            this._api = new ApiService(this.serviceScope);
        }
        return this._api;
    }


}