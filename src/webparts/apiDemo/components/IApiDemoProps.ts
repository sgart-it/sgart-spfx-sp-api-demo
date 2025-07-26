import DataService from "../../../services/DataService";

export interface IApiDemoProps {
  appTitle: string;

  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  dataService: DataService;
}
