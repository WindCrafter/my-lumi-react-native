/**
 * Created by nghinv on Sat Nov 17 2018
 * Copyright (c) 2018 nghinv@luci.vn
 */

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import codePush from 'react-native-code-push';
import DeviceConfig from 'react-native-device-info';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';

class Version extends PureComponent {
  render() {
    const { codepush } = this.props;
    let titleVersion = `v${DeviceConfig.getVersion()} - 18/12/2020 8:00`;

    if (codepush) {
      switch (codepush.status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          titleVersion = `Đang cập nhật : ${parseInt(codepush.progress)}%`;
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          titleVersion = 'Đang cài đặt... ';
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          codePush.restartApp();
          titleVersion = 'Ứng dụng tự khởi động lại!';
          break;
        default:
          break;
      }
    }

    return (
      <Modal
        isVisible
        animationIn="slideInUp"
        animationOutTiming={500}
        animationOut="slideOutDown"
        style={styles.modal}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.modalView}>
          <Text style={styles.version}>{titleVersion}</Text>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  version: {
    alignSelf: 'center',
    marginBottom: 12,
    color: 'black',
    fontSize: 14,
  },
  centeredView: {
    position: 'absolute',
    top: 200,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    codepush: state.codepush,
  };
};

export default connect(mapStateToProps)(Version);
