import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../utlis/color/index';

const HeaderAccount = (props) => {
  const { title, sub, goBack, shadow } = props;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        {goBack ? (
          <TouchableOpacity onPress={goBack} style={styles.button}>
            {/* <Image source={leftImage} style={styles.image} resizeMode="contain" /> */}
            <Icon
              name="chevron-left"
              size={32}
              color={Colors.black}
              style={{ top: 0 }}
            />
          </TouchableOpacity>
        ) : null}
        <View style={[styles.info, { marginLeft: goBack ? 48 : 24 }]}>
          <Text style={styles.txtTitle}>{title}</Text>
          <Text style={styles.txtDetail}>{sub}</Text>
        </View>
      </View>
      {shadow ? (
        <LinearGradient
          style={[styles.gradient,]}
          colors={['#D5D5D5', '#F2F2F2']}
        />
      ) : null}
    </View>
  );
};

export default HeaderAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  txtTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
    color: 'black',
  },
  txtDetail: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    marginVertical: 4,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: Colors.gray,
  },

  button: {
    position: 'absolute',
    left: 8,
    width: 36,
    height: 48,
    top: 8,
  },
  gradient: {
    width: wp(100),
    height: 4,
  },
});
