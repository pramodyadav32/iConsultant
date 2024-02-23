import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
    splashImage: {
        height: constant.resH(100),
        width: constant.resW(100),
        // justifyContent: 'center',
        // alignItems: 'flex-end'
    },

    mainView: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        height: constant.moderateScale(35),
        width: constant.moderateScale(180),
        alignSelf: 'center',
    },
    text1: {
        fontFamily: constant.typeLight,
        fontSize: constant.moderateScale(20),
        color: constant.whiteColor,
        marginBottom: constant.moderateScale(40)
    },
   
})

export default styles
