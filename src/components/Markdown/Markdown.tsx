import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
import useSWR from "swr";
import { rawFetcher } from "../../SWRConfig";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import { absolutizeUrl } from "./absolutizeUrl";

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

    const MarkdownLink = (elem: React.ComponentPropsWithoutRef<'a'>) => (
        <a href={absolutizeUrl(url, elem.href)}>
            {elem.children}
        </a>
    )

    return (
        <div className={className}>
            <ReactMarkdown className="markdown-body" remarkPlugins={[gfm]} children={data} components={{a: MarkdownLink}}/>
        </div>
    )
}

export default MarkdownView
