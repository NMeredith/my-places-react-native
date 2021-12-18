import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { COLORS } from "../assets/Constants";
import FontText from './FontText';

const BG_COLORS = [COLORS.color1, COLORS.color3, COLORS.accent, COLORS.color2]
const DisplayPlace = ({ item, index, separators }) => {
    console.log(item)
    const colorIndex = index % BG_COLORS.length;
    return( 
        <View style={{...styles.container, backgroundColor: BG_COLORS?.[colorIndex] ?? BG_COLORS[0]}}>
            <Image source={{uri: item.imageUri}} style={styles.image}/>
            <View style={styles.textContainer}>
                <FontText style={styles.textStyle}>{item.title}</FontText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "flex-start",
        flex: 1,
        marginHorizontal: 0,
        marginVertical: 5,
        padding: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: COLORS.main,
        // opac
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textColorDark,
    },
    image: {
        margin: 5,
        height: 70,
        flex: 0.5,
        // width: 50,
        // width: '100%'
        // width: '30%',
        // height: 'auto'
    }
});

export default DisplayPlace;