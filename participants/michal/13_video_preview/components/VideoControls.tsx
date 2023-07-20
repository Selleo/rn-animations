import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type VideoControlsProps = {
  playing: boolean;
  isMinimalized: boolean;
  disabled: boolean;
  togglePlaying: () => void;
  onFullScreen: () => void;
  onClose: () => void;
}

export const VideoControls = ({
  playing,
  isMinimalized,
  disabled,
  togglePlaying,
  onFullScreen,
  onClose
}: VideoControlsProps): JSX.Element => (
  <View style={[styles.container, { width: isMinimalized ? 200 : SCREEN_WIDTH }]}
    >
    <TouchableOpacity
      onPress={togglePlaying}
      disabled={disabled}
    >
      <MaterialCommunityIcons
        name={playing ? 'pause' : 'play'}
        size={40}
        style={{ color: 'white' }}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onClose}
      disabled={disabled}
    >
      <MaterialCommunityIcons
        name="close"
        size={40}
        style={{ color: 'white' }}
      />
    </TouchableOpacity>
    {!isMinimalized && (
      <TouchableOpacity
        onPress={onFullScreen}
        disabled={disabled}
      >
        <MaterialCommunityIcons
          name="fullscreen"
          size={40}
          style={{ color: 'white' }}
        />
      </TouchableOpacity>
    )}
  </View>
)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-evenly",
    paddingVertical: 16,
  }
})
