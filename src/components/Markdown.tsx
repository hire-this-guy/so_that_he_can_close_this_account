import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
import useSWR from "swr";
import { rawFetcher } from "../SWRConfig";

interface MarkdownViewProps {
    url: string
}

const MarkdownView: React.FC<MarkdownViewProps> = ({ url}) => {
    const {data, error} = useSWR<string>(url, rawFetcher);

    // TODO check loading condition
    if (error) {
        return (<div>Error getting markdown</div>)
    }
    if (!data) {
        return (<div>Markdown loading...</div>)
    }
    return (<ReactMarkdown remarkPlugins={[gfm]} children={data}/>)
}
export default MarkdownView
