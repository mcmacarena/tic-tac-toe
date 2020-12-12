import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Text, View, Button } from 'react-native';

export default function App() {

  // array multidimensional de 3x3
  let arrayGrid = Array(3)
  for (let i = 0; i < 3; i++) {
    arrayGrid[i] = Array(3)
    for (let j = 0; j < 3; j++) {
      arrayGrid[i][j] = ''
    }
  }

  const [arrayPressed, setArrayPressed] = useState(arrayGrid)
  const [player, setPlayer] = useState(true)

  const buttonPress = (indexExt, indexInt) => {
    const playerSymbol = player ? 'X' : 'O';
    arrayPressed[indexExt][indexInt] = playerSymbol;
    setPlayer(!player)

    if (arrayPressed[0][0]===arrayPressed[0][1]&&arrayPressed[0][2]||
      arrayPressed[1][0]===arrayPressed[1][1]&&arrayPressed[1][2]||
      arrayPressed[2][0]===arrayPressed[2][1]&&arrayPressed[2][2]||
      arrayPressed[0][0]===arrayPressed[1][0]&&arrayPressed[2][0]||
      arrayPressed[0][1]===arrayPressed[1][1]&&arrayPressed[2][1]||
      arrayPressed[0][2]===arrayPressed[1][2]&&arrayPressed[2][2]||
      arrayPressed[0][0]===arrayPressed[1][1]&&arrayPressed[2][2]||
      arrayPressed[0][2]===arrayPressed[1][1]&&arrayPressed[2][0]){
      setArrayPressed(arrayGrid)
      setPlayer(true)
    }
  }

  const print = arrayPressed.map((button, indexExt) => {
    return <View key={indexExt} style={{ flexDirection: "row" }}>
      {arrayPressed[indexExt].map((buttonPressed, indexInt) => {
        return <TouchableOpacity key={indexInt} onPress={() => buttonPress(indexExt, indexInt)} style={[styles.tile]}>
          {console.log('tile'+indexExt+indexInt)}
          <Text style={styles.symbol}>
            {buttonPressed}
          </Text>
        </TouchableOpacity>
      })}
    </View>
  })


  return (
    <ImageBackground source={require('./assets/backgroundChristmasDog.jpg')} style={styles.background}>
      <View style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 80 }}>
        {print}
        {/* <View style={{ flexDirection: "row" }}>
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
        </View> */}
        <Button onPress={() => setArrayPressed(arrayGrid)} title="Reset" color="#8b0000" style={{ width: 20, marginTop: 20 }} />
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
  tile01: {
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  symbol: {
    color: 'white',
    fontSize: 40
  },
});
