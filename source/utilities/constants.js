import {Dimensions} from 'react-native';
import Snackbar from 'react-native-snackbar';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const resH = (h) => {
    return (screenHeight * h) / 100;
  };
  export const resW = (w) => {
    return (screenWidth * w) / 100;
  };

  //fontSize
  export const font2 = (screenWidth * 0.9) / 100;
  export const font3 = (screenWidth * 1) / 100;
  export const font4 = (screenWidth * 1.2) / 100;
  export const font5 = (screenWidth * 1.5) / 100;
  export const font5_5 = (screenWidth * 1.7) / 100;
  export const font6 = (screenWidth * 2) / 100;
  export const font8 = (screenWidth * 2.3) / 100;
export const font10 = (screenWidth * 2.5) / 100;
export const font12 = (screenWidth * 2.9) / 100;
export const font13 = (screenWidth * 3.2) / 100;
export const font14 = (screenWidth * 3.4) / 100;
export const font15 = (screenWidth * 3.7) / 100;
export const font15_5 = (screenWidth * 3.8) / 100;
export const font16 = (screenWidth * 3.9) / 100;
export const font17 = (screenWidth * 4.1) / 100;
export const font18 = (screenWidth * 4.3) / 100;
export const font19 = (screenWidth * 4.5) / 100;
export const font19_5 = (screenWidth * 4.7) / 100;
export const font20 = (screenWidth * 4.6) / 100;
export const font21 = (screenWidth * 5.1) / 100;
export const font22 = (screenWidth * 5.3) / 100;
export const font24 = (screenWidth * 5.8) / 100;
export const font26 = (screenWidth * 6.3) / 100;
export const font28 = (screenWidth * 6.8) / 100;
export const font30 = (screenWidth * 7.3) / 100;
export const font32 = (screenWidth * 7.8) / 100;
export const font34 = (screenWidth * 8.3) / 100;
export const font36 = (screenWidth * 8.7) / 100;

//fontFamily

export const typeBold = 'Poppins-Bold'
export const typeBlack = 'Poppins-Black'
export const typeExtraBold = 'Poppins-ExtraBold'
export const typeExtraLight = 'Poppins-ExtraBold'
export const typeItalic = 'Poppins-Italic'
export const typeLight = 'Poppins-Light'
export const typeMedium = 'Poppins-Medium'
export const typeSemibold = 'Poppins-SemiBold'
export const typeThin= 'Poppins-Thin'
export const typeRegular= 'Poppins-Regular'



// Color

export const baseColor = '#12A89D';
export const baseLight = '#F0FDFA'
export const whiteColor = '#ffffff';
export const blackColor = '#000000';
export const blackTrans = '#00000050'
export const grayishBlue = '#3D3D3F'
export const gainsboro = '#DFDFDF'
export const gray = '#F1F1F1'
export const whiteSmoke = '#F2F2F2'
export const whiteGhost = '#F1F3F9'
export const aliceBlue ='#F7FAFC'
export const dimGray = '#707070'
export const green = '#609749'
export const red = '#ED1C24'
export const blue = '#4E74F9'
export const silver = '#BBBBBB'
export const textColor = '#676767'



export const showMsg =(msg)=>{
  Snackbar.show({
    text: msg,
    backgroundColor: baseColor,
    fontFamily:typeRegular,
    duration: Snackbar.LENGTH_LONG,
  })
}


