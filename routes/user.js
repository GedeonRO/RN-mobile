import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from "../screens/About";
import Home from "../screens/Home";
import Review from "../screens/Review";
import Post from "../screens/Query";
import EditPost from "../screens/EditPost";
import SignIn from "../screens/SignIn";
import CustomHeader from "../components/Header";


const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <CustomHeader />,
        animation: "none",
        animationDuration:0
      }}
      initialRouteName="Home"
      
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Array" component={Review} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="Edit" component={EditPost} />
    </Stack.Navigator>
  );
}
