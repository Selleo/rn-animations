import React, { FC } from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  FlatList,
  View,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const { width, height } = Dimensions.get("screen");

const FLATLIST_HEIGHT = (height * 3) / 5;

type Home = {
  photoUrls: string[];
  id: number;
};

interface IProps {
  navigation: any;
}

const homes: Home[] = [
  {
    id: 1,
    photoUrls: [
      "https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFtaWx5JTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg?crop=1xw:0.8074561403508772xh;center,top&resize=480:*",
    ],
  },
  {
    id: 2,
    photoUrls: [
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg?crop=1xw:0.8074561403508772xh;center,top&resize=480:*",
      "https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFtaWx5JTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
    ],
  },
  {
    id: 3,
    photoUrls: [
      "https://st.depositphotos.com/2763588/4023/i/600/depositphotos_40236851-stock-photo-expensive-home-against-a-blue.jpg",
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg?crop=1xw:0.8074561403508772xh;center,top&resize=480:*",
    ],
  },
];

const ListScreen: FC<IProps> = ({ navigation }: IProps) => {
  const scrollX = useSharedValue(0);
  const favs = useSharedValue(-500);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.favsPrevVal = favs.value;
    },
    onActive: (event, context) => {
      const pullDistance = event.translationY;

      favs.value = Math.min(context.favsPrevVal - pullDistance, -50);

      if (pullDistance < -50) {
        context.shoudJump = true;
      } else {
        context.shoudJump = false;
      }
    },
    onEnd: (event, context) => {
      if (context.shoudJump) {
        favs.value = withSpring(-100);
      } else {
        favs.value = withSpring(-500);
      }
    },
  });

  const favStyles = useAnimatedStyle(() => {
    return {
      bottom: favs.value,
    };
  });

  return (
    <>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <AnimatedFlatlist
          alwaysBounceVertical={false}
          horizontal
          onScroll={scrollHandler}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "flex-start",
            height: FLATLIST_HEIGHT,
          }}
          pagingEnabled
          snapToInterval={width}
          data={homes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => (
            <Item wholeItem={item} scrollX={scrollX} navigation={navigation} />
          )}
        />
      </View>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[
            {
              position: "absolute",
              backgroundColor: "pink",
              width: width,
              height: 600,
            },
            favStyles,
          ]}
        >
          <Text style={{ padding: 20, color: "red", fontSize: 20 }}>Favs</Text>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const Item = ({
  wholeItem,
  scrollX,
  navigation,
}: {
  wholeItem: { item: any; index: number };
  scrollX: SharedValue<number>;
  navigation: any;
}) => {
  const { index, item } = wholeItem;
  const CARD_WIDTH = width;
  const CARD_HEIGHT = FLATLIST_HEIGHT;
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollX.value, inputRange, [0.7, 0.85, 0.7]),
        },
        {
          translateX: interpolate(scrollX.value, inputRange, [-100, 0, 100]),
        },
      ],
    };
  });

  return (
    <TouchableOpacity onPress={() => navigation.push("Detail", { item })}>
      <SharedElement id={`item.${item.id}.photo`}>
        <Animated.Image
          style={[
            animatedContainerStyle,
            { width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 20 },
          ]}
          source={{ uri: item.photoUrls[0] }}
        />
      </SharedElement>
    </TouchableOpacity>
  );
};

export default ListScreen;
