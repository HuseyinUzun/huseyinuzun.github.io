import React from 'react';
import {SafeAreaView, View, Text,StyleSheet, Button} from 'react-native';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box_1}>
        <Text>Merhaba Hüseyin,Mobil Programlamaya Hoşgeldin!</Text>
      </View>
      <View style={styles.box_2}></View>
      <View style={styles.box_3}></View>
      <View style={styles.box_4}></View>
      <Button
        title="Ayarlar"
        onpress={() => {
          console.log('eeewedeas');
        }}
        color="lightcoral"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'yellow',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    box_1: {
        width:150,
        height:150,
        backgroundColor:'red',
        alignItems:'center',
    },
    box_2: {
        width:150,
        height:150,
        backgroundColor:'blue',
    },
    box_3:{
        width:150,
        height:150,
        backgroundColor:'green',
    },
    box_4:{
        width:150,
        height:150,
        backgroundColor:'orange',
    },
});

export default App;
