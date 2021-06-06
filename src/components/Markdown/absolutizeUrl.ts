// This is a simplification for the sake of links working in this particular set, not a bulletproof solution
export const absolutizeUrl = (markDownUrl: string, href: string | undefined): string => {
    console.log('absolutize called with', markDownUrl, href);
    if (!href) {
        return ""
    }

    if (href.indexOf("#") === 0 || (href.indexOf("/") === 0 && href.indexOf("//") === -1)) {
        const urlVersion = /v[\d.]*\/?$/;
        const urlReadme = /readme.md$/i;
        const url = new URL(markDownUrl);
        if (url.host === "raw.githubusercontent.com") {
            url.host = "github.com"
        }
        url.pathname = url.pathname.replace(urlReadme, "");
        url.pathname = url.pathname.replace(urlVersion, "");
        if (href.indexOf("/") === 0) {
            let pathElements = url.pathname.split("/");
            pathElements.splice(3,0,"blob/master");
            url.pathname = pathElements.join("/")
        }
        return `${url}${href}`
    }
    return href
}
