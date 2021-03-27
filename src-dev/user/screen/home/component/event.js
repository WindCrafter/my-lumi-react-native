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
import moment from 'moment';
import langs from '../../../../../common/language';
import { Colors, imgs } from '../../../../../utlis';

const Event = (props) => {
  const [number, setNumber] = useState(0);
  const { data, onPress, role, onPressHR, AddEvent, onLongPress } = props;
  const [opacity, setOpacity] = useState(0.1);
  const ref = useRef(null);
  const onScroll = (e) => {
    const upper = e.nativeEvent.contentOffset.x;
    const below = widthPercentageToDP(100) - 57;
    setNumber(Math.round(upper / below));
  };
  const scrollFlat = () => {
    ref.current.scrollToIndex({ animated: true, index: 2 });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      opacity === 1 ? setOpacity(0.3) : setOpacity(1);
    }, 600);
    return () => clearInterval(interval);
  }, [opacity]);
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.viewItem} onPress={() => onPress(item)} onLongPress={() => onLongPress(item)}>
        <ImageBackground
          source={item.avatar ? {
            uri: item.avatar,
          } : imgs.event}
          style={styles.image}
          imageStyle={styles.backGround}
        >
          {/* {item.urgent === 1 && <View style={styles.urgent}><Text style={styles.txtUrgent}>Urgent</Text></View>} */}
          <View style={styles.row}>
            <View style={styles.viewDetail}>
              <Text style={[styles.txtDetail, { color: item.urgent == 1 ? 'orange' : 'white', opacity: item.urgent == 1 ? opacity : 1 }]}>{item.subject}</Text>
              <Text style={styles.txtTime}>{moment(item.start_datetime, 'HH:mm:ss DD/MM/YYYY').format('HH:mm DD/MM/YYYY')}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const renderEmpty = ({ item, index }) => {
    return (
      <View style={[styles.viewItem, { width: widthPercentageToDP(100) - 48 }]}>
        <Text> Hiện tại không có sự kiện để hiển thị !!!</Text>
      </View>
    );
  };
  const renderPage = (m) => {
    return (
      <View
        style={[
          styles.sttPage,
          { backgroundColor: number === data.indexOf(m) ? Colors.background : null },
        ]}
      />
    );
  };
  return (
    <>
      <TouchableOpacity style={styles.manager} onPress={scrollFlat}>
        <TouchableOpacity style={styles.row} onPress={onPressHR}>
          <Image source={imgs.calendarWeek} style={styles.imgs} />
          <Text style={styles.txtManager}>{langs.event}</Text>
        </TouchableOpacity>
        { role === 'HR' && (
        <TouchableOpacity onPress={AddEvent} style={styles.btnAdd}>
          <Image source={imgs.add} style={styles.imgsEnd} />
        </TouchableOpacity>
        )}
      </TouchableOpacity>
      <View style={styles.line} />
      <FlatList
        style={styles.flatList}
        ref={ref}
        data={data && data.length !== 0 ? data : [1]}
        keyExtractor={(item) => item._id}
        renderItem={data && data.length !== 0 ? renderItem : renderEmpty}
        scrollEnabled
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
      <View style={styles.paging}>{data.map((m) => renderPage(m))}</View>
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
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgb(112, 112, 112)',
    marginBottom: 8,
  },
  column: {
    width: 6,
    flex: 1,
  },
  viewItem: {
    flexDirection: 'row',
    overflow: 'hidden',
    marginRight: 5,
    justifyContent: 'center'
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
    borderColor: Colors.background,
  },
  imgsEnd: {
    tintColor: Colors.white,
    width: 16,
    height: 16
  },
  btnAdd: {
    width: 36,
    height: 24,
    backgroundColor: Colors.background,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  urgent: {
    position: 'absolute',
    top: 10,
    right: 0,
    // right: -50,
    backgroundColor: 'rgba(251, 28, 28, 0.7)',
    width: 100,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    // transform: [{ rotate: '45deg' }],
  },
  txtUrgent: {
    // color: 'rgb(252, 252, 3)',
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  }
});
