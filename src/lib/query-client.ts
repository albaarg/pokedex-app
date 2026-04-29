import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { isRetryableError } from "./errors";
import { showErrorToast } from "./toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours cache time for offline persistence
      networkMode: "offlineFirst",
      retry: (failureCount, error) => {
        if (!isRetryableError(error)) {
          return false;
        }
        return failureCount < 2;
      },
    },
    mutations: {
      networkMode: "offlineFirst",
      onError: (error) => {
        showErrorToast(error);
      },
    },
  },
});

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});
