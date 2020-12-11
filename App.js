import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Text, View, Button } from 'react-native';

export default function App() {
  const [arrayPressed, setArrayPressed] = useState([, , , , , , , , ])
  const [player, setPlayer] = useState(true)

  const buttonPress = (index) => {
    const playerSymbol = player ? 'X' : 'O';
    arrayPressed[index] = playerSymbol;
    setPlayer(!player)

    if (arrayPressed[0]===arrayPressed[4]&&arrayPressed[8]||
      arrayPressed[2]===arrayPressed[4]&&arrayPressed[6]||
      arrayPressed[0]===arrayPressed[3]&&arrayPressed[6]||
      arrayPressed[1]===arrayPressed[4]&&arrayPressed[7]||
      arrayPressed[2]===arrayPressed[5]&&arrayPressed[8]||
      arrayPressed[0]===arrayPressed[1]&&arrayPressed[2]||
      arrayPressed[3]===arrayPressed[4]&&arrayPressed[5]||
      arrayPressed[6]===arrayPressed[7]&&arrayPressed[8]){
      setArrayPressed([, , , , , , , , ])
      setPlayer(true)
    }
  }


  return (
    <ImageBackground source={require('./assets/backgroundChristmasDog.jpg')} style={styles.background}>
      <View style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 80 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => buttonPress(0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            <Text style={styles.symbol}>{arrayPressed[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => buttonPress(1)} style={[styles.tile, { borderTopWidth: 0 }]} >
            <Text style={styles.symbol}>{arrayPressed[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => buttonPress(2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
            <Text style={styles.symbol}>{arrayPressed[2]}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => buttonPress(3)} style={[styles.tile, { borderLeftWidth: 0 }]}>
            <Text style={styles.symbol}>{arrayPressed[3]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => buttonPress(4)} style={[styles.tile]} >
            <Text style={styles.symbol}>{arrayPressed[4]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => buttonPress(5)} style={[styles.tile, { borderRightWidth: 0 }]}>
            <Text style={styles.symbol}>{arrayPressed[5]}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => buttonPress(6)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            <Text style={styles.symbol}>{arrayPressed[6]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => buttonPress(7)} style={[styles.tile, { borderBottomWidth: 0 }]}>
            <Text style={styles.symbol}>{arrayPressed[7]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => buttonPress(8)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
            <Text style={styles.symbol}>{arrayPressed[8]}</Text>
          </TouchableOpacity>
        </View>
        <Button onPress={()=>setArrayPressed([, , , , , , , , ])} title="Reset" color="#8b0000" style={{ width:20, marginTop: 20 }}/>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  tile: {
    borderWidth: 5,
    borderColor: 'white',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 100
  },
  symbol: {
    color: 'white',
    fontSize:40
  },
});
