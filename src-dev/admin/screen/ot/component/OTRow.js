import React, {useState} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {imgs, Colors} from '../../../../../utlis';
import langs from '../../../../../common/language';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function OTRow(props?: Props) {
  const [readMore, setReadMore] = useState(false);
  const [accept, setAccept] = useState(false);
  const {leftImage, name, day, team, role, type, content, check} = props;

  const onReadMore = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setReadMore(!readMore);
  };

  const onAccept = () => {
    setAccept(!accept);
    check();
  };

  return (
    <>
      <View style={{flexDirection: 'row', paddingRight: 8}}>
        <TouchableOpacity style={styles.check} onPress={onAccept}>
          <Image
            source={accept ? imgs.checked : imgs.unchecked}
            style={styles.imgCheck}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <Image source={leftImage} style={styles.image} resizeMode="contain" />
          <View style={styles.detail}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.dob}> {day}</Text>
            <Text style={styles.team}>
              Team: {team} -{' '}
              <Text
                style={[
                  styles.role,
                  {color: role === 'Leader' ? 'red' : 'black'},
                ]}>
                {role}
              </Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.type} onPress={onReadMore}>
            <Text style={styles.txtType}>
              {type === 'break'
                ? langs.applyBreak
                : type === 'late'
                ? langs.applyLate
                : langs.applyOT}
            </Text>
            <View style={styles.button}>
              <Text>Xem thêm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {readMore ? (
        <View style={{flexDirection: 'row', paddingRight: 8}}>
          <View style={styles.check} />
          <View style={[styles.container, {backgroundColor: '#ffffff'}]}>
            <Text style={styles.txtContent} numberOfLines={10}>
              {langs.reason} <Text style={styles.content}> {content}</Text>
            </Text>
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgb(241,251,245)',
    flex: 90,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 32,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.background,
  },
  detail: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: 12,
  },
  name: {
    fontWeight: '500',
    marginVertical: 4,
  },
  dob: {
    fontWeight: '300',
    marginVertical: 4,
  },
  team: {
    fontWeight: '300',
    marginVertical: 4,
  },
  role: {
    fontWeight: '600',
  },
  type: {
    flex: 2,
  },
  txtType: {
    color: 'rgb(0,130,28)',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  check: {
    flex: 10,
    justifyContent: 'center',
  },
  imgCheck: {
    alignSelf: 'center',
    width: 30,
    height: 30,
  },
  txtContent: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    fontWeight: '300',
  },
});
