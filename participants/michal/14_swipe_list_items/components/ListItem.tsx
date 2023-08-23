import { Dimensions, StyleSheet } from 'react-native'
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PanGestureHandlerProps
} from 'react-native-gesture-handler'
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ListItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    item: string
    onDelete?: (item: string) => void
}

const ITEM_HEIGHT = 70
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_LIMIT = -SCREEN_WIDTH * 0.3;

export const ListItem = ({ item, onDelete, simultaneousHandlers }: ListItemProps) => {
    const itemHeight = useSharedValue(ITEM_HEIGHT);
    const marginVertical = useSharedValue(10);
    const opacity = useSharedValue(1);
    const translateX = useSharedValue(0);

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX
        },
        onEnd: () => {
            const deleteItem = translateX.value < TRANSLATE_X_LIMIT

            if (deleteItem) {
                itemHeight.value = withTiming(0)
                marginVertical.value = withTiming(0)
                translateX.value = withTiming(-SCREEN_WIDTH)

                opacity.value = withTiming(0, undefined, (finished) => {
                    if (finished && onDelete) {
                        runOnJS(onDelete)(item)
                    }
                })
            } else {
                translateX.value = 0
            }
        },
    })

    const containerStyle = useAnimatedStyle(() => ({
        height: itemHeight.value,
        marginVertical: marginVertical.value,
        opacity: opacity.value
    }))

    const iconStyle = useAnimatedStyle(() => {
        const opacity = withTiming(translateX.value < TRANSLATE_X_LIMIT ? 1 : 0)

        return { opacity }
    })

    const textStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value }
        ]
    }))

    return (
        <Animated.View style={[styles.container, containerStyle]}>
            <Animated.View style={[styles.icon, iconStyle]}>
                <MaterialCommunityIcons
                    name="trash-can"
                    size={ITEM_HEIGHT * 0.3}
                    color="red"
                />
            </Animated.View>
            <PanGestureHandler
                simultaneousHandlers={simultaneousHandlers}
                onGestureEvent={panGesture}
            >
                <Animated.View style={[styles.item, textStyle]}>
                    <Animated.Text>{item}</Animated.Text>
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%'
    },
    item: {
        backgroundColor: 'white',
        borderRadius: 8,
        height: ITEM_HEIGHT,
        width: '90%'
    },
    icon: {
        alignItems: 'center',
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        position: 'absolute',
        right: '10%',
        width: ITEM_HEIGHT,
    },
})
