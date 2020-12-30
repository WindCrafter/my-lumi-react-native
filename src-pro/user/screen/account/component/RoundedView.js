import {Card} from 'native-base';
import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native';
import {imgs} from '../../../../../utlis';

interface Props extends RoundedView {
  leftImage?: String | Number;
  rightImage?: String | Number;
  width?: String | Number;
  height?: Number;
  borderRadius?: Number;
  backgroundColor?: String;
  containerStyle?: ViewStyle;
  refInput?: React.Ref;
  title?: String;
  detail?: String;
  paddingHorizontal?: String;
  justifyContent?: String;
  alignSelf?: String;
  alignItems?: String;
  padding?: String;
  paddingVertical?: String;
  marginRight?: String;
  fontSize?: String;
  tintColor?: String;
  line?: Boolean;
  tintColorLeft?: String;
}

RoundedView.defaultProps = {
  width: '100%',
  leftImage: imgs.personal,
  rightImage: null,
  shadowColor: '#000000',
  shadowOpacity: 0.16,
  paddingHorizontal: 16,
  justifyContent: 'center',
  alignSelf: 'center',
  alignItems: 'center',
  fontSize: 0,
  tintColor: 'black',
  line: false,
  styleImg: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  // tintColorLeft :''
};

export default function RoundedView(props?: Props) {
  const {
    leftImage,
    rightImage,
    width,
    containerStyle,
    title,
    onPressButton,
    disabled,
    alignSelf,
    padding,
    styleImg,
    tintColor,
    team,
    tintColorLeft,
    styleName,
  } = props;

  return (
    <Card style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPressButton}
        disabled={disabled}>
        <View style={styles.middle}>
          <Image
            source={leftImage}
            style={[{tintColor: tintColorLeft}, styleImg]}
            resizeMode="cover"
          />
          <View style={styles.viewTitle}>
            <Text style={[styles.textTitle, styleName]}>{title}</Text>
            {/* {team && <Text style={[styles.textTeam]}>{team}</Text>} */}
          </View>
        </View>
        <Image
          source={rightImage ? rightImage : null}
          style={[{tintColor}, styles.image]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 8,
  },
  button: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
  },
  image: {
    width: 18,
    height: 18,
    alignSelf: 'center',
  },
  textTitle: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
  },

  textDetail: {
    color: 'black',
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 25, 0.22)',
    alignSelf: 'center',
  },
  viewTitle: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textTeam: {
    fontSize: 14,
  },
});
