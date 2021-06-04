import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
import useSWR from "swr";
import { rawFetcher } from "../SWRConfig";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

interface MarkdownViewProps {
    url: string
}

const MarkdownView: React.FC<MarkdownViewProps> = ({ url}) => {
    const {data, error} = useSWR<string>(url, rawFetcher);

    // TODO check loading condition
    if (error) {
        return (<ErrorMessage
            action={() => window.location.reload()}
            actionLabel="Try again"
        >
            Error fetching readme
        </ErrorMessage>)
    }
    if (!data) {
        return (<div>Markdown loading...</div>)
    }
    return (<ReactMarkdown remarkPlugins={[gfm]} children={data}/>)
}
export default MarkdownView
