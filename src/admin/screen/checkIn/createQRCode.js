import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import Connection from '../../../../utlis/connection/index';

const CreateQRCode = (props) => {
  const { createQR, token, source, navigation } = props;
  const [newdate, setDate] = useState(new Date)
  const [sourceImg, setSourceImg] = useState(source);
  const onCreateQR = () => {
    const data = {
      day: moment().format('DD/MM/YYYY'),
      // day: '21/08/2021',
      token: token,
    };
    createQR(data);
  };

  const onGetQR = async () => {
    const date = moment(newdate).format('DD/MM/YYYY');
    await Connection.getQR(date, token).then((res) =>
      setSourceImg(res.data.qrDataUrl),
    );
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bton} onPress={goBack}>
        <Text style={styles.txt}>Quay lại</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bton} onPress={onGetQR}>
        <Text style={styles.txt}>Lấy QR code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bton} onPress={onCreateQR}>
        <Text style={styles.txt}>Tạo QR code</Text>
      </TouchableOpacity>
      <Image source={{ uri: sourceImg ? sourceImg : null }} style={styles.img} />
    </View>
  );
};

export default CreateQRCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bton: {
    backgroundColor: 'rgb(37, 201, 230)',
    width: 300,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  txt: {
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
  },
  img: {
    width: 300,
    height: 300,
  },
});
