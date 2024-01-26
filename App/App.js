import React from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './components/navbar';
import { AppProvider } from './components/AppProvider';
import { colors } from './styles/colors';

function App() {
  const mode = useColorScheme()

  // Determine the mode based on the color scheme
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors[mode].bgColor }}>
      <AppProvider>
        <NavigationContainer>
          <BottomTabNavigator colors={colors} mode={mode} />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaView>
  );
}

export default App;
