import React, { ReactNode } from "react";
import { ScrollView, View } from "react-native";

type VideoContentContainerProps = {
  isMinimalized: boolean;
  children: ReactNode;
}


export const VideoContentContainer = ({ isMinimalized, children }: VideoContentContainerProps) => {
  if (isMinimalized) {
    return <View>{children}</View>
  }

  return <ScrollView>{children}</ScrollView>
}
