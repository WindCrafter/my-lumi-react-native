import React from 'react';
import {Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const converUtf8 = (str) => {
  const reg2 = /(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g;
  const reg3 = /(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g;
  const reg4 = /(ì|í|ị|ỉ|ĩ)/g;
  const reg5 = /(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g;
  const reg6 = /(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g;
  const reg7 = /(ỳ|ý|ỵ|ỷ|ỹ)/g;
  const reg8 = /(đ)/g;
  const reg9 = /(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/g;
  const reg10 = /(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/g;
  const reg11 = /(Ì|Í|Ị|Ỉ|Ĩ)/g;
  const reg12 = /(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/g;
  const reg13 = /(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/g;
  const reg14 = /(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/g;
  const reg15 = /(Đ|Ð)/g;

  let strResult = str;
  strResult = strResult.replace(reg2, 'a');
  strResult = strResult.replace(reg3, 'e');
  strResult = strResult.replace(reg4, 'i');
  strResult = strResult.replace(reg5, 'o');
  strResult = strResult.replace(reg6, 'u');
  strResult = strResult.replace(reg7, 'y');
  strResult = strResult.replace(reg8, 'd');
  strResult = strResult.replace(reg9, 'A');
  strResult = strResult.replace(reg10, 'E');
  strResult = strResult.replace(reg11, 'I');
  strResult = strResult.replace(reg12, 'O');
  strResult = strResult.replace(reg13, 'U');
  strResult = strResult.replace(reg14, 'Y');
  strResult = strResult.replace(reg15, 'D');

  return strResult;
};

export const getText = (string) => {
  const txt = converUtf8(string.trim().toLowerCase().replace(/\s/g, '_'));
  return txt;
};
