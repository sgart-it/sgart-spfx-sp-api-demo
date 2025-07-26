import { SOLUTION_NAME } from "../../Constants";
import { Configs } from "../../models/Configs";
import { ConfigsData } from "./ConfigsData";

const LOG_SOURCE: string = SOLUTION_NAME + ':ConfigService:';

export default class ConfigService {
    //Registro il servizio

    constructor() {
        console.log(LOG_SOURCE, `Initialized`);
    }

    public get(): Configs {
        // Simulate fetching configuration data
        return ConfigsData;
    }
}