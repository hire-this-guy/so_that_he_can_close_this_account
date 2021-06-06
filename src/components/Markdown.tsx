import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
import useSWR from "swr";
import { rawFetcher } from "../SWRConfig";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import Loading from "./Loading/Loading";

interface MarkdownViewProps {
    url: string;
    className?: string;
}

const MarkdownView: React.FC<MarkdownViewProps> = ({ url, className}) => {
    const {data, error} = useSWR<string>(url, rawFetcher);

    if (error) {
        return (<ErrorMessage
            action={() => window.location.reload()}
            actionLabel="Try again"
        >
            Error fetching readme
        </ErrorMessage>)
    }

    if (!data) {
        return <Loading/>
    }

    return (
        <div className={className}>
            <ReactMarkdown className="markdown-body" remarkPlugins={[gfm]} children={data}/>
        </div>
    )
}
export default MarkdownView
