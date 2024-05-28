import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ListarLote = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const navigation = useNavigation();

  const URL = 'http://10.0.2.2:3000/listarLote';

  const mostrarLotes = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo cargar los lotes');
    } finally {
      setLoading(false);
    }
  };


  const lote = (loteData) => {
    navigation.navigate('lote', { loteData });
  };

  useEffect(() => {
    mostrarLotes();
  }, []);

  return (
    <View style={estilos.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id_lote }) => id_lote.toString()}
          renderItem={({ item }) => (
            <View style={estilos.itemContainer}>
              <View style={estilos.infoContainer}>
                <Text style={estilos.label}>ID Lote:</Text>
                <Text style={estilos.value}>{item.id_lote}</Text>
              </View>
              <View style={estilos.infoContainer}>
                <Text style={estilos.label}>Nombre:</Text>
                <Text style={estilos.value}>{item.nombre}</Text>
              </View>
              <View style={estilos.infoContainer}>
                <Text style={estilos.label}>Longitud:</Text>
                <Text style={estilos.value}>{item.longitud}</Text>
              </View>
              <View style={estilos.infoContainer}>
                <Text style={estilos.label}>Latitud:</Text>
                <Text style={estilos.value}>{item.latitud}</Text>
              </View>
              <View style={estilos.infoContainer}>
                <Text style={estilos.label}>ID Finca:</Text>
                <Text style={estilos.value}>{item.fk_id_finca}</Text>
              </View>
              <View style={estilos.contenedorBoton}>
                <TouchableOpacity onPress={() => lote(item)} style={estilos.button}>
                  <Text style={estilos.buttonText}>Registrar un lote</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#282C34', 
    padding: 10,
  },
  itemContainer: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#3E4A61', 
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFD700', 
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  label: {
    color: '#FFD700', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    color: '#FFFFFF', 
    fontSize: 16,
  },
  contenedorBoton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#61DAFB',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonB: {
    backgroundColor: '#ED6158', 
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#282C34', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListarLote;
