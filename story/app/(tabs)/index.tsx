import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const mockData = [
  { id: '1', uri: 'https://static-00.iconduck.com/assets.00/person-circle-icon-512x512-zwz8ctki.png' },
  { id: '2', uri: 'https://static-00.iconduck.com/assets.00/person-circle-icon-512x512-zwz8ctki.png' },
  { id: '3', uri: 'https://static-00.iconduck.com/assets.00/person-circle-icon-512x512-zwz8ctki.png' },
  { id: '4', uri: 'https://static-00.iconduck.com/assets.00/person-circle-icon-512x512-zwz8ctki.png' },
  { id: '5', uri: 'https://static-00.iconduck.com/assets.00/person-circle-icon-512x512-zwz8ctki.png' },
  // Adicione mais dados conforme necessário
];

export default function HomeScreen() {
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

  const openImage = (uri: string) => {
    setSelectedImage(uri);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <ScrollView>
      <ThemedView style={styles.logoIFTM}>
        <Image source={logoMENU} style={styles.image1} />
        <ThemedText style={styles.text}>Observatório</ThemedText>
        <Image source={logoOBS} style={styles.image2} />
      </ThemedView>
      <FlatList
        data={mockData}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openImage(item.uri)}>
            <View style={styles.imageCircle}>
              <Image source={{ uri: item.uri }} style={styles.circleImage} />
            </View>
          </TouchableOpacity>
        )}
        style={styles.flatList}
      />
      <View style={styles.separator} />

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Avatar.Icon size={50} icon="image" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={takeImage}>
          <Avatar.Icon size={50} icon="camera" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}

      <Modal visible={selectedImage !== null} transparent={true}>
        <View style={styles.modalContainer}>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullImage} />
          )}
          <Button mode="contained" onPress={closeImage} style={styles.closeButton}>
            Fechar
          </Button>
        </View>
      </Modal>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  flatList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  imageCircle: {
    borderRadius: 50,
    overflow: 'hidden',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  circleImage: {
    width: 70,
    height: 70,
  },
  separator: {
    height: 1,
    backgroundColor: '#f2f0f0',
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  icon: {
    backgroundColor: '#333', // Fundo mais escuro para os ícones
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    height: 80,
    resizeMode: 'contain',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
  },
  text:{
    fontSize: 25,
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
    width: 40,
    height: 40,
  },
});
