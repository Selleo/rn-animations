import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { MainStack } from "@components/MainStack";
import MaintenanceProvider from "@src/providers/Maintenance/MaintenanceProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MaintenanceProvider>
        <GestureHandlerRootView style={styles.main}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </GestureHandlerRootView>
      </MaintenanceProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
