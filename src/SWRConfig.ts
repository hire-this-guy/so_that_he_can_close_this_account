import { SWRConfiguration } from "swr";

// Use fetch but throw on 404s so that they can be handled as errors
export const fetcher = (url: string) => fetch(url).then((response) => {
    if (response.status >= 400) {
        const err = {
            status: response.status
        }
        return Promise.reject(err)
    }
    return response.json() }
);

// Do not retry on 4xx errors
export const onErrorRetry: SWRConfiguration["onErrorRetry"] = (error, _key, config, revalidate, { retryCount}) => {
    if (error.status < 500) return

    // Only retry up to 10 times.
    if (retryCount >= 10) return

    // Retry after 5 seconds.
    setTimeout(() => revalidate({ retryCount }), config.errorRetryInterval)
}
