import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./screens/SignIn";
import { StatusBar } from "expo-status-bar";
import "./global.css";
const queryClient = new QueryClient();
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#000"
          translucent={false}
        />
       
        <RootStack />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
