'use client';

import { type ReactNode, useState } from 'react';
import {REACT_QUERY_CONSTANTS} from "@/constants/react-query-constants";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ApiError} from "@/lib/api-fetch";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: REACT_QUERY_CONSTANTS.STALE_TIME,
                        gcTime: REACT_QUERY_CONSTANTS.GARBAGE_COLLECTION_TIME,
                        retry: (failureCount, error) =>
                            !(error instanceof ApiError && error.status === 401) &&
                            failureCount < REACT_QUERY_CONSTANTS.RETRIES,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    );

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
