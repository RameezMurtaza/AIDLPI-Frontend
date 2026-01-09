import RootNavigator from './src/navigation/RootNavigator'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  )
}

export default App

