import React from "react";
import { StyleSheet, View } from "react-native";
const ScreenView = ({children}) => {
    return (
        <View style={styles.main}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ScreenView;