import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ParallaxScrollView from '@/components/ParallaxScrollView';

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

  const logoIFTM = require("../../assets/images/OBSIFTM.png");

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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fafafa', dark: '#111212' }}
      headerImage={<Image source={logoIFTM} style={styles.reactLogo} />}
    >
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
    </ParallaxScrollView>
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
    backgroundColor: 'gray',
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
  reactLogo: {
    height: 1000,
    width: 1000,
    bottom: 60,
    left: 100,
    position: 'absolute',
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
});
