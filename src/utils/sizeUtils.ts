import {Dimensions} from 'react-native';

const guidelineWindowWidth = 370;
const {width} = Dimensions.get('window');
const scale = width / guidelineWindowWidth;

export const dw = (size: number): number => scale * size;
