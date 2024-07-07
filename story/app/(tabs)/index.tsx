import React, { useState } from 'react';
import { View, Alert, Image, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

//Imports para utilizar o componente Avatar.Image da biblioteca React Native Paper......................
import * as react from 'react';
import { Avatar } from 'react-native-paper';

import { TouchableOpacity } from 'react-native';

//......................................................................................................

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);

  //Função para inserir a imagem desejada como avatar na aplicação......................................
  const avatarImage = () => (
   <Avatar.Image size={24} source={require('../../assets/images/avatar.jpg')} />
  );
  const imageUrl = require("../../assets/images/obs.png");
  const menuImage = require("../../assets/images/menu.png");
  //....................................................................................................
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

  /*const AvatarImageWithOnPress = ({ takeImage }) => (
      <TouchableOpacity onPress={takeImage}>
        <Avatar.Image size={24} source={require('')} />
      </TouchableOpacity>
  );*/
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '##fafafa', dark: '#111212' }}
      headerImage={  <Image/>} >

        <ThemedView style={styles.navbarContainer}>
          <Image source={menuImage} style={styles.image} />
          <ThemedText style={styles.navbar}>Observatório IFTM</ThemedText>
          <Image source={imageUrl} style={styles.image} />
        </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <Button icon="camera" mode="contained" onPress={takeImage}>
          Câmera
        </Button>
        <Button icon="image" mode="contained" onPress={pickImage}>
          Galeria
        </Button>
      </ThemedView>
      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
    </ParallaxScrollView>
  );
  
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    display:'flex',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 16,
  },

//......................
image: {
  marginHorizontal: 20,
  width: 30,
  height: 30,
  resizeMode: "contain",
},

navbarContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: 100,
  paddingTop: 50,
  shadowColor: "gray",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4.84,
  elevation: 20,
  paddingVertical: 10,
},

navbar: {
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  alignSelf: "center",
},
});
