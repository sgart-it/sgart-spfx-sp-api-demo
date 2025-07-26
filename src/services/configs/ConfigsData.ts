import { Configs } from "../../models/Configs";

export const ConfigsData: Configs = {
    groups: [
        {
            id: "site",
            title: "Site",
            actions: [
                {
                    id: "getSite",
                    title: "Get site",
                    url: "/_api/site"
                },
                {
                    id: "getSiteId",
                    title: "Get site id",
                    url: "/_api/site/id"
                }
            ]
        },
        {
            id: "web",
            title: "Web",
            actions: [
                {
                    id: "getWeb",
                    title: "Get web",
                    url: "/_api/web"
                },
                {
                    id: "getWebById",
                    title: "Get sub webs",
                    url: "/_api/web/webs"
                }
            ]
        },
        {
            id: "user",
            title: "User",
            actions: [
                {
                    id: "getCurrentUser",
                    title: "Get current user",
                    url: "/_api/web/CurrentUser"
                },
                {
                    id: "getUsers",
                    title: "Get users",
                    url: "/_api/web/SiteUsers"
                },
                {
                    id: "getUserById",
                    title: "Get user by id",
                    url: "/_api/web/GetUserById(1)"
                },
                {
                    id: "getGroups",
                    title: "Get groups",
                    url: "/_api/web/sitegroups"
                },
                {
                    id: "getGroupsMembers",
                    title: "Get group members",
                    url: "/_api/web/sitegroups(1)/users"
                },
            ]
        },
        {
            id: "list",
            title: "List",
            actions: [
                {
                    id: "getLists",
                    title: "Get lists",
                    url: "/_api/web/lists"
                },
                {
                    id: "getListByGuid",
                    title: "Get list by guid",
                    url: "/_api/web/lists(guid'00000000-0000-0000-0000-000000000000')"
                },
                {
                    id: "getListByTitle",
                    title: "Get list by title",
                    url: "/_api/web/lists/getbytitle('Documents')"
                },
                {
                    id: "getFields",
                    title: "Get fields",
                    url: "/_api/web/lists/getbytitle('Documents')/fields"
                },
                {
                    id: "getViews",
                    title: "Get views",
                    url: "/_api/web/lists/getbytitle('Documents')/views",
                    "query": {
                        "top": 100
                    }
                },
            ]
        },
        {
            id: "item",
            title: "Item",
            actions: [
                {
                    id: "getItems",
                    title: "Get items",
                    url: "/_api/web/lists/getbytitle('Documents')/items"
                },
                {
                    id: "getItemById",
                    title: "Get item by id",
                    url: "/_api/web/lists/getbytitle('Documents')/items(1)"
                },
                {
                    id: "getItemByIdWithSelect",
                    title: "Get item by id with select",
                    url: "/_api/web/lists/getbytitle('Documents')/items(1)",
                    query: {
                        select: "Title,Id",
                        orderBy: "Title asc"
                    }
                }
            ]
        },
        {
            id: "file",
            title: "File",
            actions: [
                {
                    id: "getFileById",
                    title: "Get file by id",
                    url: "/_api/web/getfilebyid('00000000-0000-0000-0000-000000000000')"
                },
                {
                    id: "getFileByServerRelativeUrl",
                    title: "Get file by server relative url",
                    url: "/_api/web/getfilebyserverrelativeurl('/sites/someSite/Shared Documents/file.txt')"
                },
                {
                    id: "getFileContent",
                    title: "Get file content",
                    url: "/_api/web/getfilebyserverrelativeurl('/sites/someSite/Shared Documents/file.txt')/$value"
                }
            ]
        },
        {
            id: "folder",
            title: "Folder",
            actions: [
                {
                    id: "getFolderByServerRelativeUrl",
                    title: "Get folder by server relative url",
                    url: "/_api/web/getfolderbyserverrelativeurl('/sites/someSite/Shared Documents')"
                },
                {
                    id: "getFolderById",
                    title: "Get folder by id",
                    url: "/_api/web/getfolderbyid('00000000-0000-0000-0000-000000000000')"
                },
                {
                    id: "getFolderContent",
                    title: "Get folder content",
                    url: "/_api/web/getfolderbyserverrelativeurl('/sites/someSite/Shared Documents')/files"
                }
            ]
        },
        {
            id: "search",
            title: "Search",
            actions: [
                {
                    id: "searchSites",
                    title: "Search sites",
                    url: "/_api/search/query",
                    query: {
                        mode: "search",
                        filter: "sharepoint (contentclass:STS_Site) Path:\"https://sgart.sharepoint.com/*\"",
                        select: "Title,Path,Description,SiteLogo,WebTemplate,WebId,SiteId,Created,LastModifiedTime"
                    }
                }
            ]
        },
        {
            id: "userProfile",
            title: "User Profile",
            actions: [
                {
                    id: "getPMInstance",
                    title: "PeopleManager instance",
                    url: "/_api/SP.UserProfiles.PeopleManager"
                },
                {
                    id: "getPMFollowedByMe",
                    title: "Followed by ME",
                    url: "/_api/SP.UserProfiles.PeopleManager/getpeoplefollowedbyme",
                    query: {
                        select: "*"
                    }
                },
                                {
                    id: "getPMFollowedBy",
                    title: "Followed by ...",
                    url: "/_api/SP.UserProfiles.PeopleManager/getpeoplefollowedby(@v)?@v='i%3A0%23.f%7Cmembership%7Cuser%40domain.onme",
                    query: {
                        select: "*"
                    }
                }


            ]
        },
        {
            id: "taxonomy",
            title: "Taxonomy",
            actions: [
                {
                    id: "getTermSets",
                    title: "Get term sets",
                    url: "/_api/v2.1/termStore/sets"
                },
                {
                    id: "getTermSetById",
                    title: "Get terms by set id",
                    url: "/_api/v2.1/termStore/sets('00000000-0000-0000-0000-000000000000')/terms"
                },
                {
                    id: "getTermById",
                    title: "Get term by id",
                    url: "/_api/v2.1/termStore/terms('00000000-0000-0000-0000-000000000000')"
                }
            ]
        },
        {
            id: "webhooks",
            title: "Webhooks",
            actions: [
                {
                    id: "getWebhooks",
                    title: "Get webhooks",
                    url: "/_api/web/lists/getbytitle('Documents')/subscriptions"
                }
            ]
        }
    ]
};