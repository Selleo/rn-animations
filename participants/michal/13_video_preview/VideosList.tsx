import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';

import { VideoPreview, VideoPreviewRefProps } from './components/VideoPreview';
import { VideoControls } from './components/VideoControls';
import { VideoContentContainer } from './components/VideoContentContainer';

type Video = {
  videoId: string;
  title: string;
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const videos: Video[] = []

const VideosList = (): JSX.Element => {
  const ref = useRef<VideoPreviewRefProps>(null);
  const insets = useSafeAreaInsets();
  const [playing, setPlaying] = useState<boolean>(true);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const [isMinimalized, setIsMinimalized] = useState<boolean>(false)

  const [isLandscape, setIsLandscape] = useState<boolean>(false)
  const [isControlsDisabled, setIsControlsDisabled] = useState<boolean>(false)

  const videoHeight = useMemo(() => {
    if (isLandscape) {
      return 300
    }

    return isMinimalized ? 80 : 220
  }, [isLandscape, isMinimalized])

  const videoWidth = useMemo(() => {
    if (isLandscape) {
      return SCREEN_HEIGHT
    }

    return isMinimalized ? 140 : SCREEN_WIDTH
  }, [isLandscape, isMinimalized])

  const onPress = useCallback((videoId: string) => {
    setSelectedVideoId(videoId)
    setIsMinimalized(false)
    ref?.current?.scrollTo(-(SCREEN_HEIGHT - insets.top));
  }, []);

  const changeScreenOrientation = useCallback(async (landscape: boolean) => {
    const { LANDSCAPE, PORTRAIT_UP } = ScreenOrientation.OrientationLock
    setIsControlsDisabled(true)

    await ScreenOrientation.lockAsync(landscape ? LANDSCAPE : PORTRAIT_UP)
    setIsControlsDisabled(false)
  }, [])

  const toggleOrientation = useCallback(() => {
    const openLandscape = !isLandscape

    ref?.current?.scrollTo(-(SCREEN_HEIGHT - (openLandscape ? 0 : insets.top) ));

    setIsLandscape(openLandscape)
    changeScreenOrientation(openLandscape)
  }, [isLandscape, changeScreenOrientation])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={videos}
        keyExtractor={(item) => item.videoId}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPress(item.videoId)}
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 8, paddingHorizontal: 8, width: SCREEN_WIDTH }}
          >
            <Image
              style={styles.image}
              source={{ uri: `https://img.youtube.com/vi/${item.videoId}/0.jpg` }}
            />
            <Text style={{ color: '#ffffff', paddingHorizontal: 16 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <VideoPreview
        ref={ref}
        onFullScreen={() => { setIsMinimalized(false) }}
        onMinimize={() => { setIsMinimalized(true) }}
      >
        {!!selectedVideoId ? (
          <View style={[
              { flex: 1 }, 
              isMinimalized && { flexDirection: 'row', justifyContent: 'space-between' }
            ]}
          >
            <View>
              <YoutubePlayer
                height={videoHeight}
                width={videoWidth}
                play={playing}
                videoId={selectedVideoId}
                allowWebViewZoom={false}
                initialPlayerParams={{
                  controls: false,
                  showClosedCaptions: false
                }}
              />
              <View style={{ position: 'absolute', height: videoHeight, width: videoWidth }} />
            </View>
            <VideoContentContainer isMinimalized={isMinimalized}>
              <VideoControls
                playing={playing}
                isMinimalized={isMinimalized}
                disabled={isControlsDisabled}
                togglePlaying={() => {
                  setPlaying((prev) => !prev);
                }}
                onFullScreen={toggleOrientation}
                onClose={() => {
                  ref?.current?.scrollTo(0);
                  setSelectedVideoId(null)
                  setPlaying(true)
                }}
              />
            </VideoContentContainer>
          </View>
        ) : (
          <View style={{ height: 300, width: SCREEN_WIDTH, backgroundColor: '#000000' }} />
        )}
      </VideoPreview>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 140,
    height: 80,
    zIndex: 1,
    borderRadius: 8,
  },
});

export default VideosList
