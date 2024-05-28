import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';

const RegistrarLotes = () => {
  const [lote, setLote] = useState({
    nombre: '',
    longitud: '',
    latitud: '',
    fk_id_finca: '',
  });

  const [dataFincas, setDataFincas] = useState([]);

  const urlFincas = 'http://10.0.2.2:3000/listarFinca';
  const urlRegistrarLote = 'http://10.0.2.2:3000/Registrarlote';

  useEffect(() => {
    async function fetchData() {
      try {
        const responseFincas = await axios.get(urlFincas);
        console.log('Fincas response:', responseFincas.data);
        const tempFincas = responseFincas.data.map((item) => {
          return { key: item.id_finca.toString(), value: item.id_finca.toString() };
        });
        setDataFincas(tempFincas);
      } catch (e) {
        console.log('Error fetching data:', e);
      }
    }
    fetchData();
  }, []);

  const handleSelectFinca = (val) => {
    console.log('Selected Finca Key:', val);
    if (val) {
      setLote({ ...lote, fk_id_finca: val });
    }
  };

  const enviarLote = () => {
    if (!lote.nombre || !lote.longitud || !lote.latitud || !lote.fk_id_finca) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (isNaN(lote.longitud) || isNaN(lote.latitud)) {
      Alert.alert('Error', 'Longitud y latitud deben ser números');
      return;
    }

    axios.post(urlRegistrarLote, lote)
      .then((response) => {
        console.log(response.data);
        Alert.alert('Registro exitoso', 'El lote ha sido registrado correctamente');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', 'Ha ocurrido un error al registrar el lote');
      });

    setLote({
      nombre: '',
      longitud: '',
      latitud: '',
      fk_id_finca: '',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRAR LOTE</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={lote.nombre}
          onChangeText={(nombre) => setLote({ ...lote, nombre })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Longitud:</Text>
        <TextInput
          style={styles.input}
          value={lote.longitud}
          onChangeText={(longitud) => setLote({ ...lote, longitud })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Latitud:</Text>
        <TextInput
          style={styles.input}
          value={lote.latitud}
          onChangeText={(latitud) => setLote({ ...lote, latitud })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Finca:</Text>
        {dataFincas.length > 0 ? (
          <SelectList 
            setSelected={handleSelectFinca} 
            data={dataFincas}
            selected={lote.fk_id_finca} 
            boxStyles={styles.selectBox} // New styles for select box
            inputStyles={styles.selectInput} // New styles for select input
          />
        ) : (
          <Text style={styles.loadingText}>Cargando fincas...</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={enviarLote}
      >
        <Text style={styles.buttonText}>Enviar datos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282C34',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#61DAFB',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#61DAFB',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#FFFFFF',
  },
  selectBox: {
    borderColor: '#61DAFB',
  },
  selectInput: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#61DAFB',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#282C34',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#FFFFFF',
  },
});

export default RegistrarLotes;
