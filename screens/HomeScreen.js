import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import * as Google from "expo-google-app-auth"; //dodan dependency potreban za google signup

export function HomeScreen({ route, navigation }) {

const handleGoogleSignIn = () => { //funkcija za google signin
  const config = {
    iosClientId: "43210928779-2cpp01ggda8uauqkkbuh6dvne9008veq.apps.googleusercontent.com",
    androidClientId: "43210928779-67ummr81diqbv4h722e4bkmniqu0qsmf.apps.googleusercontent.com",
    scope: ["profile" , "email"]
  };
  Google.logInAsync(config) //konfiguracija za uspjeh/neuspjeh logina
  .then((result) => {
    const {type,user} = result;
    if (type == "success") {
      const {email, name} = user;
      console.log("Sign in successful!");
      setTimeout(
        () => navigation.navigate("Settings" , {email, name}), 1000
      )
    } else{
      console.log("Sign in failed!");
    }
  }).catch((error) => {
    console.log(error);
  })
}

  function handleSettingsPress() {
    navigation.navigate("Settings");
  }

  return (
    <View style={styles.screen}>
      <Text>The Home Screen!</Text>
      <View style={styles.button}>
      <Button
        title="Sign in with Google"
        onPress={handleGoogleSignIn}
      /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button:{
    width: 200,
    height: 200
  }
});
