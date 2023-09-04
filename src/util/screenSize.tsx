import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size:any) => width / guidelineBaseWidth * size;
const verticalScale = (size:any) => height / guidelineBaseHeight * size;
const moderateScale = (size:any, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale};