import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import langs from '../../../../../common/language';
import { Colors, imgs } from '../../../../../utlis';

const Event = (props) => {
  const [number, setNumber] = useState(0);
  const { data, onPress, role, onPressHR } = props;
  const ref = useRef(null);
  const onScroll = (e) => {
    const upper = e.nativeEvent.contentOffset.x;
    const below = widthPercentageToDP(100) - 57;
    setNumber(Math.floor(upper / below));
  };
  const scrollFlat = () => {
    ref.current.scrollToIndex({ animated: true, index: 2 });
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.viewItem} onPress={() => onPress(item)}>
        <ImageBackground
          source={item.source}
          style={styles.image}
          imageStyle={styles.backGround}
        >
          <View style={styles.row}>
            {/* <View
              style={[
                styles.column,
                {
                  backgroundColor:
                    index % 2 === 0
                      ? 'rgb(252, 163, 125)'
                      : 'rgb(46, 114, 249)',
                },
              ]}
            /> */}
            <View style={styles.viewDetail}>
              <Text style={styles.txtDetail}>{item.detail}</Text>
              <Text style={styles.txtTime}>{item.time}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const renderPage = (m) => {
    return (
      <View
        style={[
          styles.sttPage,
          { backgroundColor: number === data.indexOf(m) ? 'gray' : null },
        ]}
      />
    );
  };
  return (
    <>
      <TouchableOpacity style={styles.manager} onPress={scrollFlat}>
        <View style={styles.row}>
          <Image source={imgs.calendarWeek} style={styles.imgs} />
          <Text style={styles.txtManager}>{langs.event}</Text>
        </View>
        { role === 'HR' && (
        <TouchableOpacity onPress={onPressHR}>
          <Image source={imgs.manageIcon} style={styles.imgsEnd} />
        </TouchableOpacity>
        )}
      </TouchableOpacity>
      <View style={styles.line} />
      <FlatList
        style={styles.flatList}
        ref={ref}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
      {/* <View style={styles.paging}>{data.map((m) => renderPage(m))}</View> */}
    </>
  );
};

export default Event;

const styles = StyleSheet.create({
  manager: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtManager: {
    fontSize: 16,
    height: 30,
    paddingHorizontal: 8,
  },
  flatList: {
    flex: 1,
  },
  txtDetail: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgb(112, 112, 112)',
  },
  column: {
    width: 6,
    flex: 1,
  },
  viewItem: {
    paddingVertical: 2,
    marginTop: 8,
    flexDirection: 'row',
    marginRight: 4,
  },
  viewDetail: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: widthPercentageToDP(100) - 61,
    paddingLeft: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 4,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  txtTime: {
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.white,
    // fontFamily: 'Quicksand-Italic',
  },
  imgs: {
    width: 24,
    height: 24,
  },
  image: {
    flexDirection: 'row',
    width: widthPercentageToDP(100) - 61,
    height: 200,
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    borderBottomLeftRadius: 12,
  },
  backGround: {
    borderRadius: 12,
  },
  paging: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  sttPage: {
    width: 8,
    height: 8,
    marginHorizontal: 8,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
  },
  imgsEnd: {
    tintColor: Colors.background,
  }
});
