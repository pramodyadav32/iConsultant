import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
    splashImage: {
        height: constant.resH(100),
        width: constant.resW(100),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    splashImage2: {
        height: '100%',
        width: constant.resW(100),
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'space-between',
    },
    introText: {
        fontSize: 1.5 * constant.font24,
        color: constant.whiteColor,
        fontFamily: constant.typeExtraBold,
        marginTop: "27%",
        marginLeft: '6%'
    },
    introImagestyle: {
        height: constant.resH(16),
        width: constant.resW(65),
        marginLeft: '5%',
        marginBottom: '8%'
    },

    startImageStyle:{
        height: constant.resH(60.5),
        width: constant.resW(100),
    },
    startText1:{
        fontSize: constant.font19,
        color: constant.blackColor,
        fontFamily: constant.typeSemibold, 
        marginHorizontal:"5%" ,
        marginTop:'5%',
        // letterSpacing:0.5
    },
    startText2:{
        fontSize: constant.font15,
        color: constant.silver,
        fontFamily: constant.typeRegular, 
        marginHorizontal:"5%" ,
        // marginTop:'2%',
    },
    startButton1:{
        marginTop:'14%',
    },
    startButton:{
    marginTop:'4%',
    backgroundColor:constant.whiteColor,
    elevation:0,
    borderWidth:1,
    borderColor:constant.baseColor,
    },
    startButtonText:{
        color: constant.blackColor,
        fontFamily:constant.typeRegular
    }
})

export default styles