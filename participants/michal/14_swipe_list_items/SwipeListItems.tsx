import { useCallback, useRef, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { ListItem } from './components/ListItem';

const defaultItems = [...Array(10).keys()].map((item) => `Item ${item}`)

const SwipeListItems = () => {
    const scrollViewRef = useRef<ScrollView>(null)
    const [items, setItems] = useState<string[]>(defaultItems)

    const handleDeleteItem = useCallback((item: string) => {
        setItems((prevState) => prevState.filter((currentItem) => currentItem !== item))
    }, [])

    return (
        <GestureHandlerRootView style={styles.flex}>
            <SafeAreaView style={styles.container}>
                <ScrollView ref={scrollViewRef}>
                    {items.map((item) => (
                        <ListItem
                            key={item}
                            item={item}
                            onDelete={handleDeleteItem}
                            simultaneousHandlers={scrollViewRef}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        backgroundColor: '#e2e2e2',
        flex: 1
    }
})

export default SwipeListItems
