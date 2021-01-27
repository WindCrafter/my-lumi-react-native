import React, { useState } from 'react';
import { StyleSheet, View, Platform, UIManager, Text } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import langs from '../../../../common/language';

import {
  BarStatus,
  HeaderCustom,
  TabView,
  HeaderAccount,
} from '../../../component';
import HeaderNotify from '../notify/component/HeaderNotify';
import { Colors } from '../../../../utlis';
import { _global } from '../../../../utlis/global/global';
import AllBreak from './allBreak';
import AllLate from './allLate';
import { _GET, _POST } from '../../../../utlis/connection/api';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApplyBreak(props) {
  const {
    navigation,
    token,
  } = props;
  const [routes] = useState([
    { key: '1', title: 'Xin nghỉ' },
    { key: '2', title: 'Đi muộn/về sớm' },
  ]);
  const [index, setIndex] = useState(0);

  const goBack = () => {
    console.log('checkkkkkking');
    navigation.navigate(langs.navigator.home);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <AllBreak
            navigation={navigation}
            token={token}
          />
        );
      case '2':
        return <AllLate token={token} />;
      default:
        return null;
    }
  };
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <BarStatus backgroundColor={Colors.white} height={insets.top + 16} />
      <Text
        style={{
          marginLeft: 12,
          fontSize: 24,
          fontWeight: '600',
          fontFamily: 'Quicksand-Bold',
          color: 'black',
        }}
      >
        Tổng hợp
      </Text>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        swipeEnabled
        style={{ height: 24 }}
      />
    </View>
  );
}

export default ApplyBreak;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  detail: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginVertical: 32,
  },
  img: {
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 8,
  },
  imageStamp: {
    width: 20,
    height: 20,
  },
  txtStatus: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '300',
  },
  extend: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 27,
    marginTop: 16,
    marginBottom: 4,
  },
  end: {
    backgroundColor: 'red',
  },
  complete: {
    backgroundColor: Colors.background,
  },
  button: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    flexDirection: 'row',
  },
  card: {
    borderRadius: 16,
    marginTop: 8,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
  },
  txtTime: {
    fontSize: 14,
    color: Colors.black,
    marginLeft: 10,
  },
  rowBot: {
    flexDirection: 'row',
    marginHorizontal: 4,
    marginTop: 16,
    justifyContent: 'space-around',
    flex: 1,
  },
  columnShift: {
    alignItems: 'flex-start',
    // borderWidth: 1,
    justifyContent: 'space-around',
  },
  icon: {
    alignSelf: 'center',
  },

  btUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowUser: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  lineUser: {
    height: StyleSheet.hairlineWidth,
    width: widthPercentageToDP(70),
    alignSelf: 'center',
    backgroundColor: 'grey',
  },
  textUser: {
    marginLeft: 24,
    fontSize: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 32,
  },
  column: {
    flexDirection: 'column',
  },
  textPos: {
    marginLeft: 24,
    fontSize: 12,
  },
  viewInputSelect: {
    backgroundColor: Colors.white,
  },
});
