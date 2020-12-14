import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Text, View, Modal } from 'react-native';

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
  const [modalVisible, setModalVisible] = useState(false)

  const buttonPress = (indexExt, indexInt) => {
    const playerSymbol = player ? 'X' : 'O';
    arrayPressed[indexExt][indexInt] = playerSymbol;
    setPlayer(!player)

    let winner = ''

    
    for (let i = 0; i < 3; i++) {
      let sumRow = '';
      let sumCol = '';
      for (let j = 0; j < 3; j++) {
        // suma de filas
        sumRow = sumRow.concat(arrayPressed[i][j])
        if (sumRow === 'XXX' || sumRow === 'OOO') {
          winner = arrayPressed[indexExt][indexInt];
          setModalVisible(!modalVisible)
        }
         // suma de columnas
        sumCol = sumCol.concat(arrayPressed[j][i])
        if (sumCol === 'XXX' || sumCol === 'OOO') {
          winner = arrayPressed[indexExt][indexInt];
          setModalVisible(!modalVisible)
        }
      }
    }


    let sumDiag1 = arrayPressed[0][0]+arrayPressed[1][1]+arrayPressed[2][2]
    let sumDiag2 = arrayPressed[0][2]+arrayPressed[1][1]+arrayPressed[2][0]

    if (sumDiag1 === 'XXX' || sumDiag1  === 'OOO') {
      winner = arrayPressed[indexExt][indexInt];
      setArrayPressed(arrayGrid);
      setPlayer(true);
      setModalVisible(!modalVisible)
    }
    if (sumDiag2 === 'XXX' || sumDiag2 === 'OOO') {
      winner = arrayPressed[indexExt][indexInt];
      setArrayPressed(arrayGrid);
      setPlayer(true);
      setModalVisible(!modalVisible)
    }

  }

  const print = arrayPressed.map((button, indexExt) => {
    return <View key={indexExt} style={{ flexDirection: "row" }}>
      {arrayPressed[indexExt].map((buttonPressed, indexInt) => {
        let titleEachStyle = 'tile' + indexExt + indexInt;
        return <TouchableOpacity key={indexInt} disabled={arrayPressed[indexExt][indexInt] ? true : false} onPress={() => buttonPress(indexExt, indexInt)} style={[styles.tile, styles[titleEachStyle]]}>
          <Text style={styles.symbol}>
            {buttonPressed}
          </Text>
        </TouchableOpacity>
      })}
    </View>
  })


  return (
    <ImageBackground source={require('./assets/backgroundChristmasDog.jpg')} style={styles.background}>
      <View style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 40 }}>
        <Text style={styles.text}>TURNO: {player ? 'X' : 'O'}</Text>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}> GANADOR: {player ? 'X' : 'O'}!!!!!</Text>
            <TouchableOpacity style={styles.buttonReset}
              onPress={() => {setModalVisible(!modalVisible); setArrayPressed(arrayGrid); setPlayer(true); }}>
              <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold"}}>JUGAR DE NUEVO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        {print}
        <TouchableOpacity onPress={() => { setArrayPressed(arrayGrid); setPlayer(true);}} style={styles.buttonReset} >
          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
            REINICIAR PARTIDA
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 30,
    paddingBottom: 15,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  },
  tile: {
    borderWidth: 5,
    borderColor: 'white',
    width: '26.5%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 100,
  },
  tile00: {
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tile01: {
    borderTopWidth: 0
  },
  tile02: {
    borderRightWidth: 0,
    borderTopWidth: 0
  },
  tile10: {
    borderLeftWidth: 0,
  },
  tile12: {
    borderRightWidth: 0,
  },
  tile20: {
    borderLeftWidth: 0,
    borderBottomWidth: 0
  },
  tile21: {
    borderBottomWidth: 0
  },
  tile22: {
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  symbol: {
    color: 'white',
    fontSize: 40
  },
  buttonReset:{
    width: '60%', 
    height: 40, marginTop: 15, 
    backgroundColor: "#8b0000", 
    alignItems: 'center',
    justifyContent: 'center', 
    borderRadius: 15,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 54
  },
  modalView: {
    backgroundColor: "rgba(255,255,255,0.8)",
    width:'100%',
    aspectRatio: 1,
    alignItems: "center",
    justifyContent:"center",
  },
});
