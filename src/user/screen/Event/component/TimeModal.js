import React, {useState, useEffect, useRef} from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TextSelect, Button} from '../../../../component';
import {Calendar} from 'react-native-calendars';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../../../../utlis';
import moment from 'moment';
const _format = 'YYYY-MM-DD';
const _today = moment().format(_format);
const _maxDate = moment().add(90, 'days').format(_format);
const DATA_MORNING = [
  {
    timeStart: '8:00 AM',
    timeEnd: '8:30 AM',
    id: '1',
    active: true,
    selected: true,
  },
  {
    timeStart: '8:30 AM',
    timeEnd: '9:00 AM',
    id: '2',
    active: false,
    selected: true,
  },
  {
    timeStart: '9:00 AM',
    timeEnd: '9:30 AM',
    id: '3',
    active: false,
    selected: true,
  },
  {
    timeStart: '9:30 AM',
    timeEnd: '10:00 AM',
    id: '4',
    active: false,
    selected: true,
  },
  {
    timeStart: '10:00 AM',
    timeEnd: '10:30 AM',
    id: '5',
    active: false,
    selected: true,
  },
  {
    timeStart: '10:30 AM',
    timeEnd: '11:00 AM',
    id: '6',
    active: true,
    selected: true,
  },
  {
    timeStart: '11:00 AM',
    timeEnd: '11:30 AM',
    id: '7',
    active: true,
    selected: true,
  },
  {
    timeStart: '11:30 AM',
    timeEnd: '12:00 AM',
    id: '8',
    active: false,
    selected: true,
  },
];
const DATA_AFTERNOON = [
  {
    timeStart: '13:30 PM',
    timeEnd: '14:00 PM',
    id: '1',
    active: true,
    selected: true,
  },
  {
    timeStart: '14:00 PM',
    timeEnd: '14:30 PM',
    id: '2',
    active: false,
    selected: true,
  },
  {
    timeStart: '14:30 PM',
    timeEnd: '15:00 PM',
    id: '3',
    active: false,
    selected: true,
  },
  {
    timeStart: '15:00 PM',
    timeEnd: '15:30 PM',
    id: '4',
    active: false,
    selected: true,
  },
  {
    timeStart: '15:30 PM',
    timeEnd: '16:00 PM',
    id: '5',
    active: false,
    selected: true,
  },
  {
    timeStart: '16:00 PM',
    timeEnd: '16:30 PM',
    id: '6',
    active: true,
    selected: true,
  },
  {
    timeStart: '16:30 PM',
    timeEnd: '17:00 PM',
    id: '7',
    active: true,
    selected: true,
  },
  {
    timeStart: '17:00 PM',
    timeEnd: '17:30 PM',
    id: '8',
    active: false,
    selected: true,
  },
];
const LocationModal = (props) => {
  const scrollRef = useRef();
  const [enableScroll, setEnabelScroll] = useState(false);
  const {detail, setModal, showModal, onPress} = props;
  const [active, setActive] = useState(['1', '2']);

  const checkActive = (item) => {
    const exists = active.find((i) => i.id === item.id);
    if (!exists) {
      return false;
    }
    return true;
  };
  const handleScroll = (e) => {
    const pos = e.nativeEvent.contentOffset.x;
    console.log(pos);
    if (pos < wp(100)) {
      setEnabelScroll(false);
    }
  };
  const onSelected = (item) => {
    if (checkActive(item)) {
      setActive();
    }
  };
  const PageTime = () => {
    scrollRef.current.scrollTo({x: 2 * wp(100), y: 0, animated: true});
    setEnabelScroll(true);
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => onSelected(item)}>
        <View
          style={[
            styles.viewBox,
            {
              backgroundColor: item.active ? 'white' : '#c6c6cb',
              borderWidth: item.active ? 1 : 0,
            },
          ]}>
          <Text>{item.timeStart}</Text>
          <Text>-</Text>
          <Text>{item.timeEnd}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Modal
        isVisible={showModal}
        animationIn={'slideInUp'}
        animationOutTiming={500}
        animationOut={'slideOutDown'}
        onBackdropPress={setModal}
        style={styles.modal}
        backdropTransitionOutTiming={0}>
        <View style={{height: hp(50)}}>
          <ScrollView
            horizontal={true}
            ref={scrollRef}
            pagingEnabled
            scrollEventThrottle={16}
            onMomentumScrollEnd={handleScroll}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={enableScroll}>
            <View style={styles.scrollView}>
              <View style={styles.container}>
                <View style={styles.modalCalendar}>
                  <View style={styles.viewTitle}>
                    <View style={styles.viewTop} />
                    <View style={styles.viewTop}>
                      <Text style={styles.titleCalendar}>Chọn ngày</Text>
                    </View>

                    <TouchableOpacity onPress={PageTime} style={styles.viewTop}>
                      <Text style={styles.titleNext}>Tiếp theo</Text>
                    </TouchableOpacity>
                  </View>
                  <Calendar
                    style={styles.viewCalendar}
                    minDate={_today}
                    maxDate={_maxDate}
                  />
                </View>
                <View style={styles.modalview}>
                  <Text style={styles.titlemodal}>Vị trí</Text>
                  <Text style={styles.titlemodal}>Buổi sáng</Text>

                  <FlatList
                    data={DATA_MORNING}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                  />
                  <Text style={styles.titlemodal}>Buổi chiều</Text>

                  <FlatList
                    data={DATA_AFTERNOON}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                  />
                  <Button
                    title={'Xong'}
                    containerStyle={styles.complete}
                    onPress={setModal}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  scrollView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  modalview: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: wp(100),
    height: hp(50),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCalendar: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: wp(100),
    height: hp(50),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titlemodal: {
    fontWeight: '500',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  titleCalendar: {
    fontWeight: '500',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  titleNext: {
    marginTop: 20,
    marginBottom: 10,
    color: 'blue',
    fontSize: 16,
  },
  complete: {
    backgroundColor: Colors.background,
  },
  viewBox: {
    height: 88,
    width: 88,
    flexDirection: 'column',

    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  modalScroll: {
    height: 500,
    width: wp(200),
    marginLeft: 500,
  },
  viewCalendar: {
    borderColor: 'gray',
    height: hp(40),
    width: wp(90),
  },
  container: {width: wp(200), flexDirection: 'row'},
  viewTop: {width: wp(30), alignItems: 'center'},
  viewTitle: {
    flexDirection: 'row',
    width: wp(100),
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
});
