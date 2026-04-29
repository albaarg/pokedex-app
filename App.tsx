import { FavoritesProvider } from "@/features/favorites/context/favorites-context";
import { asyncStoragePersister, queryClient } from "@/lib/query-client";
import { AppNavigator } from "@/navigation/AppNavigator";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider 
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <FavoritesProvider>
          <StatusBar style="auto" />
          <AppNavigator />
          <Toast />
        </FavoritesProvider>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}
