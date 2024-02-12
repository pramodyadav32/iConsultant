import React from "react"
import { View, Modal, StyleSheet,ActivityIndicator } from "react-native"
import * as constant from '../utilities/constants'
import { useSelector } from "react-redux"

const EmptyLoader = (props) => {
    const {emptyLoader} = useSelector(state=>state.AuthReducer)
    return (
        <Modal
            transparent={true}
            visible={emptyLoader}
            supportedOrientations={['portrait', 'landscape']}
        >
            <View style={styles.modalMainView}>
              <ActivityIndicator color={constant.baseColor} size={'large'} />  
            </View>
        </Modal>
    )
}

EmptyLoader.defaultProps = {
    onRequestClose: function () { },
    isVisible: false,
}

export default EmptyLoader;

const styles = StyleSheet.create({
    modalMainView: {
        flex: 1,
        backgroundColor: "#00000090",
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        backgroundColor: constant.whiteColor,
        width: constant.screenWidth * 8.8 / 10,
        height: constant.screenWidth * 8 / 10,
    },
})