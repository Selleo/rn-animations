import { PropsWithChildren, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

import { instance } from "@src/client";
import { Text } from "react-native";

type Response = {
  status: "ok" | "not_ok";
  message: string;
};

const fetchData = async () => {
  return await instance.post<Response>("maintenance-mode", {
    name: "Functions",
  });
};

const INTERVAL = 30000;

const MaintenanceProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const { data, isLoading, isError } = useQuery(
    ["maintenance-mode"],
    fetchData,
    {
      refetchInterval: INTERVAL,
    }
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError || !data || !children) {
    return <Text>Error...</Text>;
  }

  if (data.data.status === "not_ok") {
    return <Text>{data.data.message}</Text>;
  }

  return <>{children}</>;
};

export default MaintenanceProvider;
