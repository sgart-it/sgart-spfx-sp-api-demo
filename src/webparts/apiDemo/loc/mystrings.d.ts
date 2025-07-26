declare interface IApiDemoWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;

  AppTitleFieldLabel: string;

  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
}

declare module 'ApiDemoWebPartStrings' {
  const strings: IApiDemoWebPartStrings;
  export = strings;
}
