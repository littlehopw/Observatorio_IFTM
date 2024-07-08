import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { Avatar, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const mockData = [
  { id: '1', uri: 'https://ernanimelo.pro.br/images/ernani/ernani_1_e.png' },
  { id: '2', uri: 'https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg' },
  { id: '3', uri: 'https://images.pexels.com/photos/2080383/pexels-photo-2080383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '4', uri: 'https://images.pexels.com/photos/2870510/pexels-photo-2870510.jpeg' },
  { id: '5', uri: 'https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg' },
  { id: '6', uri: 'https://images.pexels.com/photos/803105/pexels-photo-803105.jpeg' },
  // Adicione mais dados conforme necessário
];

export default function HomeScreen() {
  const dispatch = useDispatch();

  const [image, setImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const logoOBS = require("../../assets/images/obs.png");
  const logoMENU = require("../../assets/images/menu.png");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
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
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const generateRandomId = () => {
    return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  const saveImage = () => {
    const id = generateRandomId();
    dispatch({ type: 'ADD_IMAGE', payload: {uri: image, id} });
    setImage(null);
  }

  const openImage = (uri: string) => {
    setSelectedImage(uri);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <ScrollView>
      <ThemedView style={styles.logoIFTM}>
        <Image source={logoOBS} style={styles.image2} />
        <ThemedText style={styles.text}>Adicionar ao story</ThemedText>
      </ThemedView>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Avatar.Icon size={50} icon="image" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={takeImage}>
          <Avatar.Icon size={50} icon="camera" style={styles.icon} />
        </TouchableOpacity>
      </View>

    {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
    {image &&
      (
        <TouchableOpacity onPress={saveImage} style={styles.iconContainer}>
          <Avatar.Icon size={50} icon="send" style={styles.icon} />
        </TouchableOpacity>
      )
    }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  icon: {
    marginTop: 20,
    backgroundColor: '#071D41', // Fundo mais escuro para os ícones
  },
  selectedImage: {
    width: '100%',
    height: 400,
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '70%',
  },
  closeButton: {
    marginTop: 20,
  },
  logoIFTM: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 30,
    height: 100,
    resizeMode: 'contain',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    paddingBottom: 10,
  },
  text:{
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: '#6990CF',
  },
  image1: {
    marginHorizontal: 20,
    width: 45,
    height: 45,
  },
  image2: {
    marginTop: 5,
    marginHorizontal: 20,
    width: 35,
    height: 35,
  },
});
