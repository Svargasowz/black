import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Lote from './src/views/RegistrarProdiccion.jsx'
import listarLote from './src/views/ListarLotes.jsx'
const Stack = createNativeStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='listarLote'
        screenOptions={{
          headerStyle: {backgroundColor: '#648DFF',},
          headerTintColor: '#FFFFFF',fontWeight: 'bold',headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name='lote' component={Lote} />
        <Stack.Screen name='listarLote' component={listarLote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;