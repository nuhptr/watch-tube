import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query"
import superjson from "superjson"

export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30 * 1000,
            },
            dehydrate: {
                // TODO: Enable serialization of the query cache
                serializeData: superjson.serialize,
                shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
            },
            hydrate: {
                // TODO: Enable deserialization of the query cache
                deserializeData: superjson.deserialize,
            },
        },
    })
}
