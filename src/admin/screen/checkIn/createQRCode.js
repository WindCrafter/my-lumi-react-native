import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';

const CreateQRCode = (props) => {
  const { createQR, token, source } = props;
  const onCreateQR = () => {
    const data = {
      // day: moment().format('DD/MM/YYYY'),
      day: '21/08/2021',
      token: token,
    };
    createQR(data);
    console.log('SOurce=>>>>', source);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bton} onPress={onCreateQR}>
        <Text style={styles.txt}>Tạo QR code</Text>
      </TouchableOpacity>
      <Image
        source={{ uri: "data:image/gif;base64,R0lGODdhhACEAIAAAAAAAP///ywAAAAAhACEAAAC/4yPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCodEGuCITCqXTBITgHhKp9AR9ap0Ng/YblXkxWqX0TB1bH6ik+W02orEsLlbw1sxx8cv+VCf0ncXINj2lfA3geihGBFYN/hYyMAIQblh6eBIRrepdzS5Z4GZoSklyWlI+FBaKDgqFwo5dWoXq5ppmzuLitb6yIr6yjtcu1tsCFLqqpsaucrs2ymL/KH8GxtNfXxFO738CQe+fS1+6DxuPJ0NDMb8re2NHXxGHC8tLOpODn9rb1rPrV4yffcIwsvWzVrBcgPLBTyG8NnCZg7pQQxH8d9FdP8H51X8mPFdL49ZAJ4zNzGhRXUYYYF8pzCjy44a8KEMuS9mN0DyFvVsZFAnyZ2JfnKwqTIdTGh8jF5yI9IkyKRQS7arapXlRq1cY0Jdg1WmVLFbw2ZtaJZsV6Zl0zL80c+r0yKkTsp9S/eo3aBz8+aTRrUfj6iesn4tqvQkWnY372oEmhgwRsYROT6E/FhwtX2gJobhGfnsCsJc162sHIQ0o8OFkc5Q/ZN14744YOP1dxk1EceM48Zm6w8Gb+C+b/dWfGL41KELVhNHbkK52uL8nkv2ef1m58xetnt/oXmr6ZenBZpXEb40SenfCwuHrt4y3+zOb6OwmZ7yWKEcR0r/yA9cYAbptpl9zcGnX1ueDdgSYqK5d95aC5JnIHaG7RUaarlFeF9Ov2XInHzG0TYZg61xFiJuH9JUwlIjgtjfeiuyUB9OL9r4oIRmEGVhe8EdSGGO0iXYQY0EKviYgF3wWOSMKSop5HzcVdgklT6Owl98ObiGZCUmalkbiRCKBySOTIZpZZln7hfgDQAumWKNn6mZHILdxbninGO2aCecMZIpYpIcFpjjeBemVKae2uXF3pN0AlpEo382QORuUmZ5pZg9SPojLsuh55ZaPmYa5JFVprUmpFRpCN9MZqUK5lisZqeXW7Biad2hhT6V5p5MHkclpg3+Vd2Nq0pkZp292i7qq6yDIsllBdEa+aiOXpaqLI5E2qbtShv2KOOns4k7pJT+qSjurNO5Yei5l8mZq6Eu7lqTuc4Gmt6ojoIb6LH4tlqtqbV2S+6lADc7KVrt3ouuoP/lqSloBIsa4asBX8xvw79CnIa+CJ+6MKTwdowxs37YKzLHO5YM60wu41lwujtM+yWwFOtAM7ZdMjxYxGzGvO6y79n6c9BTRkkrr6gWDaWwCRNqMbS5zrtdtNcuLTXQVCfqs19efw122GKPTXbZZp+Ndtpqr812226/DXfccs9Nd912V1AAADs=" }}
        style={styles.img}
      />
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
