import { absolutizeUrl } from "./absolutizeUrl";

describe("absolutizeUrl", () => {
    const markdownUrl = "https://raw.githubusercontent.com/org/repo/v.0.1.234/Readme.MD"
    it("Should not change absolute url", () => {
        const inputUrl = "https://raw.githubusercontent.com";
        expect(absolutizeUrl(markdownUrl, inputUrl)).toEqual(inputUrl);
    });

    it("Should remove version from the url", () => {
        const output = absolutizeUrl(markdownUrl, "#gettingStarted");
        expect(output.indexOf("v.0.1.234")).toBe(-1);
    });

    it("Should remove readme from the url", () => {
        const output = absolutizeUrl(markdownUrl, "#gettingStarted");
        expect(output.indexOf("Readme.MD")).toBe(-1);
    });

    it("Should change githubusercontent urls to github", () => {
        const output = new URL(absolutizeUrl(markdownUrl, "#gettingStarted"));
        expect(output.hostname).toEqual("github.com");
    });

    it("Should link relative urls to master", () => {
        const href = "/src/someComponent.ts"
        const output = absolutizeUrl(markdownUrl, href);
        expect(output).toBe(`https://github.com/org/repo/blob/master/${href}`);
    });
})
