import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Button from "./Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { runOnJS, SharedValue, withTiming } from "react-native-reanimated";

type ActionsResult = Boolean;

const ButtonsView = () => {
  const onSubmitSuccess = (
    isActive: SharedValue<number>,
    isLoading: SharedValue<number>,
    isSuccess: SharedValue<number>,
    isError: SharedValue<number>
  ) => {
    const hasEnded = isSuccess.value || isError.value;

    if (!hasEnded) {
      isActive.value = withTiming(1);
      isLoading.value = withTiming(1);
      setTimeout(() => {
        isSuccess.value = withTiming(1);
        isLoading.value = 0
      }, 1000);
    } else {
      reset(isActive, isLoading, isSuccess, isError);
    }
  };

  const onSubmitFailure = (
    isActive: SharedValue<number>,
    isLoading: SharedValue<number>,
    isSuccess: SharedValue<number>,
    isError: SharedValue<number>
  ) => {
    const hasEnded = isSuccess.value || isError.value;

    if (!hasEnded) {
      isActive.value = withTiming(1);
      isLoading.value = withTiming(1);
      setTimeout(() => {
        isError.value = withTiming(1);
        isLoading.value = 0
      }, 1000);
    } else {
      reset(isActive, isLoading, isSuccess, isError);
    }
  };

  const reset = (
    isActive: SharedValue<number>,
    isLoading: SharedValue<number>,
    isSuccess: SharedValue<number>,
    isError: SharedValue<number>
  ) => {
    isActive.value = withTiming(0);
    isLoading.value = isLoading.value ? withTiming(0, { duration: 150 }) : 0;
    isSuccess.value = isSuccess.value ? withTiming(0, { duration: 150 }) : 0;
    isError.value = isError.value ? withTiming(0, { duration: 50 }) : 0;
  };

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingVertical: 20,
      }}
    >
      <Button onPress={onSubmitSuccess} />
      <Button onPress={onSubmitFailure} />
    </SafeAreaView>
  );
};

export default ButtonsView;

const styles = StyleSheet.create({});
