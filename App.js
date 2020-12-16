import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Text, View, Modal } from 'react-native';

export default function App() {

  // array multidimensional de 3x3 tiles
  const arrayGrid = Array(3)
  for (let i = 0; i < 3; i++) {
    arrayGrid[i] = Array(3)
    for (let j = 0; j < 3; j++) {
      arrayGrid[i][j] = ''
    }
  }

  // array multidimensional de 3x3 background
  const arrayBackground = Array(3)
  for (let i = 0; i < 3; i++) {
    arrayBackground[i] = Array(3)
    for (let j = 0; j < 3; j++) {
      arrayBackground[i][j] = 'transparent'
    }
  }

  const [arrayPressed, setArrayPressed] = useState(arrayGrid);
  const [player, setPlayer] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [finalText, setFinalText] = useState(null);
  const [background, setBackground] = useState(arrayBackground)

  const buttonPress = (indexExt, indexInt) => {
    const playerSymbol = player ? 'X' : 'O';
    arrayPressed[indexExt][indexInt] = playerSymbol;
    setPlayer(!player)

    // jugadas ganadoras filas y columnas
    for (let i = 0; i < 3; i++) {
      let sumRow = '';
      let sumCol = '';
      for (let j = 0; j < 3; j++) {
        // suma de filas
        sumRow = sumRow.concat(arrayPressed[i][j])
        if (sumRow === 'XXX' || sumRow === 'OOO') {
          setModalVisible(!modalVisible)
          setFinalText('GANADOR: ' + (player ? 'X' : 'O') + '!!!')
          background[indexExt][0] = 'rgba(225,225,225,0.7)'
          background[indexExt][1] = 'rgba(225,225,225,0.7)'
          background[indexExt][2] = 'rgba(225,225,225,0.7)'
        }
        // suma de columnas
        sumCol = sumCol.concat(arrayPressed[j][i])
        if (sumCol === 'XXX' || sumCol === 'OOO') {
          setModalVisible(!modalVisible)
          setFinalText('GANADOR: ' + (player ? 'X' : 'O') + '!!!')
          background[0][indexInt] = 'rgba(225,225,225,0.7)'
          background[1][indexInt] = 'rgba(225,225,225,0.7)'
          background[2][indexInt] = 'rgba(225,225,225,0.7)'
        }
      }
    }

    // jugadas ganadoras diagonales
    let sumDiag1 = arrayPressed[0][0] + arrayPressed[1][1] + arrayPressed[2][2]
    let sumDiag2 = arrayPressed[0][2] + arrayPressed[1][1] + arrayPressed[2][0]

    if (sumDiag1 === 'XXX' || sumDiag1 === 'OOO') {
      setModalVisible(!modalVisible)
      setFinalText('GANADOR: ' + (player ? 'X' : 'O') + '!!!')
      background[0][0] = 'rgba(225,225,225,0.7)';
      background[1][1] = 'rgba(225,225,225,0.7)';
      background[2][2] = 'rgba(225,225,225,0.7)';

    }
    if (sumDiag2 === 'XXX' || sumDiag2 === 'OOO') {
      setModalVisible(!modalVisible)
      setFinalText('GANADOR: ' + (player ? 'X' : 'O') + '!!!')
      background[0][2] = 'rgba(225,225,225,0.7)';
      background[1][1] = 'rgba(225,225,225,0.7)';
      background[2][0] = 'rgba(225,225,225,0.7)';
    }

    // empate
    let sumAllArray = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        sumAllArray += arrayPressed[i][j]
        if (sumAllArray.length === 9) {
          setModalVisible(!modalVisible)
          setFinalText('EMPATE!!!')
        }
      }
    }
  }

  const print = arrayPressed.map((button, indexExt) => {
    return <View key={indexExt} style={{ flexDirection: "row" }}>
      {arrayPressed[indexExt].map((buttonPressed, indexInt) => {
        let titleEachStyle = 'tile' + indexExt + indexInt;
        return <TouchableOpacity key={indexInt} disabled={arrayPressed[indexExt][indexInt] ? true : false} onPress={() => buttonPress(indexExt, indexInt)} style={[styles.tile, styles[titleEachStyle], { backgroundColor: background[indexExt][indexInt] }]}>
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
        <Text style={styles.text}>{modalVisible ? ' ' : ('TURNO: ' + (player ? 'X' : 'O'))}</Text>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.text}> {finalText}</Text>
              <TouchableOpacity style={styles.buttonReset}
                onPress={() => { setModalVisible(!modalVisible); setArrayPressed(arrayGrid); setPlayer(true); setBackground(arrayBackground); }}>
                <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>JUGAR DE NUEVO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {print}
        <TouchableOpacity onPress={() => { setArrayPressed(arrayGrid); setPlayer(true); }} style={[styles.buttonReset, modalVisible ? styles.displaynone : styles.displayblock]} >
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
  displayblock: {
    display: 'flex'
  },
  displaynone: {
    display: 'none'
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
  },
  tile00: {
    borderLeftWidth: 0,
    borderTopWidth: 0,
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
  buttonReset: {
    width: '60%',
    height: 40, marginTop: 15,
    backgroundColor: "#8b0000",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 54
  },
  modalView: {
    backgroundColor: "rgba(0,151,94,0.8)",
    width: '100%',
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});