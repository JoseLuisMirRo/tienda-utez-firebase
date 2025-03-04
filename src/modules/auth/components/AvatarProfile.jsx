import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import React from 'react'

export default function AvatarProfile({ user, styles }) {
    return (
        <View style={[defaultStyles.container, styles]}>
            <Avatar.Image size={100} source={{ uri: user.photoURL || 'https://avatar.iran.liara.run/public/40' }} />
        </View>
    )
}

const defaultStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})