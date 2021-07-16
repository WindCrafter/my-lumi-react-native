import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Card } from 'native-base';
// import langs from '../../../../../common/language';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { imgs, Colors } from '../../../../../utlis';
import langs from '../../../../../common/language';

const { width } = Dimensions.get('window');

const CardWFH = (props) => {
  const { item, leader, onAccept, onDeny } = props;
  const renderStatus = () => {
    if (item.status === 1) {
      return (
        <View style={styles.img}>
          <Image
            source={imgs.roundedInfor}
            style={[styles.imageStamp, styles.imageExtend]}
          />
          <Text style={[styles.txtStatus, styles.waiting]}>Đang chờ</Text>
        </View>
      );
    }
    if (item.status === 2) {
      return (
        <View style={styles.img}>
          <Image
            source={imgs.tick}
            style={[styles.imageStamp, styles.marginRight]}
          />
          <Text style={[styles.txtStatus, styles.approve]}>Đã duyệt</Text>
        </View>
      );
    }
    if (item.status === 3) {
      return (
        <View style={styles.img}>
          <Image
            source={imgs.cancel}
            style={[styles.imageStamp, styles.imageCancel]}
          />
          <Text style={[styles.txtStatus, styles.colorCancel]}>Bị từ chối</Text>
        </View>
      );
    }
  };

  return (
    <Card style={styles.card}>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        {leader ? (
          <View style={styles.viewName}>
            <Text style={styles.name}>
              {item.user_name}
            </Text>
          </View>
        )
          : (<View>{renderStatus()}</View>)}
      </View>
      <View style={[styles.row, { marginTop: 8 }]} />
      <View style={[styles.row]}>
        <View style={[styles.img, { width: (width - 32) / 2 }]}>
          <Image
            source={imgs.DOB}
            style={[styles.imageStamp, styles.marginRight]}
          />
          <Text style={styles.txtStatus}>{moment.unix(item.start_date).format('DD/MM/YYYY')}</Text>
        </View>
        <View style={[styles.img, { width: (width - 32) / 2 }]}>
          <Image
            source={imgs.DOB}
            style={[styles.imageStamp, styles.marginRight]}
          />
          <Text style={styles.txtStatus}>{moment.unix(item.end_date).format('DD/MM/YYYY')}</Text>
        </View>
      </View>
      <View style={[styles.row, { paddingRight: 32 }]}>
        <View style={styles.img}>
          <Image
            source={imgs.note}
            style={[styles.imageStamp]}
          />

        </View>
        <Text style={styles.txtStatus}>{item.reason}</Text>
      </View>
      <View style={[styles.row, { paddingRight: 32 }]}>
        <View style={styles.img}>
          <Image
            source={imgs.healthCondition}
            style={[styles.imageHealth, styles.marginRight]}
          />
          <Text style={styles.txtStatus}>{item.health}</Text>
        </View>
      </View>
      {leader && (
        <>
          <View style={styles.line} />
          {item.status === 1 ? (
            <View>
              <View style={[styles.viewLeader, { paddingTop: 8 }]}>
                <View style={[styles.viewButton, { alignItems: 'flex-start', paddingLeft: 20 }]}>
                  <TouchableOpacity style={styles.buttonDeny} onPress={onDeny}>

                    <Text style={[styles.txtButton, {
                      fontFamily: 'Quicksand-Bold',
                      fontWeight: '600',
                    }]}
                    >

                      {langs.deny}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.viewButton, { alignItems: 'flex-end', paddingRight: 20 }]}>
                  <TouchableOpacity
                    style={styles.buttonAccept}
                    onPress={onAccept}
                  >
                    <Text
                      style={[
                        styles.txtButton,
                        {

                          fontFamily: 'Quicksand-Bold',
                          fontWeight: '600',

                        },
                      ]}
                    >
                      {langs.confirm}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          ) : (
            <View style={styles.viewApproved}>
              <Image
                source={item.status === 2 ? imgs.tick : imgs.cancel}
                style={[
                  styles.clock,
                  { tintColor: item.status === 2 ? Colors.background : Colors.danger },
                ]}
              />
              <Text
                style={[
                  styles.time,
                  { color: item.status === 2 ? Colors.background : Colors.danger },
                ]}
              >
                {item.status === 2 ? langs.approve : langs.deny}
              </Text>
            </View>
          )}
        </>
      )}

    </Card>
  );
};

const styles = StyleSheet.create({
  img: {
    padding: 5,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',

  },
  imageStamp: {
    width: 16,
    height: 16,
  },
  imageHealth: {
    width: 20,
    height: 20,
  },
  txtStatus: {
    alignSelf: 'center',
    fontSize: 16,

  },
  row: {
    flexDirection: 'row',
  },
  txtTime: {
    fontSize: 16,
    color: Colors.black,
    alignSelf: 'center',
    marginHorizontal: 12,
  },
  card: {
    borderRadius: 16,
    width: width - 32,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 16,
  },
  time: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageExtend: {
    marginRight: 8,
    tintColor: '#455997',
  },
  waiting: {
    color: '#455997',
  },
  imageCancel: {
    marginRight: 8,
    tintColor: '#ff3b30',
  },
  colorCancel: {
    color: '#ff3b30',
  },
  marginRight: {
    marginRight: 8,
  },
  approve: {
    color: Colors.background,
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
    marginTop: 8
  },
  viewLeader: {
    flexDirection: 'row',
  },
  viewButton: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonDeny: {
    borderRadius: 16,
    paddingVertical: 8,
    width: widthPercentageToDP(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.danger,
  },
  buttonAccept: {
    borderRadius: 16,
    paddingVertical: 8,
    width: widthPercentageToDP(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  txtButton: {
    color: Colors.white,
    fontSize: 14,
  },
  viewApproved: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    alignItems: 'center',
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
  },
  clock: {
    // tintColor: Colors.background,
    width: 16,
    height: 16,
    marginRight: 4,
  },
});

export default CardWFH;
