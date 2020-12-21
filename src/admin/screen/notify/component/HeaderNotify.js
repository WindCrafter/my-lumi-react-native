import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface Props extends HeaderNotify {
  title?: String;
  detail?: String;
}
HeaderNotify.defaultProps = {
  title: 'Thông báo',
  detail: 'Nhắc việc và bản tin',
};

export default function HeaderNotify (props?: Props) {
  const {title, detail} = props;
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.txtTitle}>{title}</Text>
        <Text style={styles.txtDetail}>{detail}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.bot} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },

  info: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 24,
  },

  txtTitle: {
    fontSize: 24,
    fontWeight: '700',
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
    backgroundColor: 'black',
  },
  bot: {
    flex: 1,
    paddingBottom: 16,
  },
});
