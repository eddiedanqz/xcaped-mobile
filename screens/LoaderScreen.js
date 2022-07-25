import React from 'react'
import { View,Text } from 'react-native'
import appStyle from '../style/appStyle'


const LoaderScreen = () => {
    return (
        <View style={appStyle.container}>
            <Text>Loading...</Text>
        </View>
    )
}

export default LoaderScreen
