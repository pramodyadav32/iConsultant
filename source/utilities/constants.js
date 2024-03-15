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

  const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size) => (screenWidth / guidelineBaseWidth) * size;
const verticalScale = (size) => (screenHeight / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };

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

export const typeBold = 'Roboto-Bold'
export const typeBlack = 'Roboto-Black'
export const typeItalic = 'Roboto-Italic'
export const typeLight = 'Roboto-Light'
export const typeMedium = 'Roboto-Medium'
export const typeThin= 'Roboto-Thin'
export const typeRegular= 'Roboto-Regular'



// Color

export const baseColor = '#FE0F17';
export const baseLight = '#F0FDFA'
export const whiteColor = '#ffffff';
export const blackColor = '#000000';
export const blackTrans = '#00000050'
export const grayishBlue = '#3D3D3F'
export const gainsboro = '#DFDFDF'
export const gray = '#F1F1F1'
export const whiteSmoke = '#F2F2F2'
export const whiteGhost = '#F9F9F9'
export const aliceBlue ='#F7FAFC'
export const dimGray = '#707070'
export const green = '#609749'
export const red = '#FE0F17'
export const blue = '#4E74F9'
export const silver = '#BBBBBB'
export const textColor = '#606060'



export const showMsg =(msg)=>{
  Snackbar.show({
    text: msg,
    backgroundColor: baseColor,
    fontFamily:typeRegular,
    duration: Snackbar.LENGTH_LONG,
  })
}


export const NCB_VALUES = [
  {
    code:"0",
    description:"0"
  },
  {
    code:"5",
    description:"5"
  },
  {
    code:"10",
    description:"10"
  },
  {
    code:"15",
    description:"15"
  },
  {
    code:"20",
    description:"20"
  },
  {
    code:"25",
    description:"25"
  },
  {
    code:"30",
    description:"30"
  },
  {
    code:"35",
    description:"35"
  },
  {
    code:"40",
    description:"40"
  },
  {
    code:"45",
    description:"45"
  },
  {
    code:"50",
    description:"50"
  },
  {
    code:"55",
    description:"55"
  },
  {
    code:"60",
    description:"60"
  },
  {
    code:"65",
    description:"65"
  },
  {
    code:"70",
    description:"70"
  },
  {
    code:"75",
    description:"75"
  },
  {
    code:"80",
    description:"80"
  },
  {
    code:"85",
    description:"85"
  },
  {
    code:"90",
    description:"90"
  },
  {
    code:"95",
    description:"95"
  },
  {
    code:"100",
    description:"100"
  },
]

export const RATE_VALUES = [
  {
    code:"0",
    description:"0"
  },
  {
    code:"1",
    description:"1"
  },
  {
    code:"2",
    description:"2"
  },
  {
    code:"3",
    description:"3"
  },
  {
    code:"4",
    description:"4"
  },
  {
    code:"5",
    description:"5"
  },
  {
    code:"6",
    description:"6"
  },
  {
    code:"7",
    description:"7"
  },
  {
    code:"8",
    description:"8"
  },
  {
    code:"9",
    description:"9"
  },
  {
    code:"10",
    description:"10"
  },
  {
    code:"11",
    description:"11"
  },
  {
    code:"12",
    description:"12"
  },
  {
    code:"13",
    description:"13"
  },
  {
    code:"14",
    description:"14"
  },
  {
    code:"15",
    description:"15"
  },
  {
    code:"16",
    description:"16"
  },
  {
    code:"17",
    description:"17"
  },
  {
    code:"18",
    description:"18"
  },
  {
    code:"19",
    description:"19"
  },
  {
    code:"20",
    description:"20"
  },
]


