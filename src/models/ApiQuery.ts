import { ConfigsQuery } from "./Configs";

export type ApiQuery = ConfigsQuery & {
    webUrl?: string,
    apiUrl?: string,
};
