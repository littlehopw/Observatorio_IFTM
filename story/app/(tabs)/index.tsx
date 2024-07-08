import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Modal, ScrollView, Dimensions } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get('window');

const mockData = [
  { id: '1', uri: 'https://ernanimelo.pro.br/images/ernani/ernani_1_e.png' },
  { id: '2', uri: 'https://images.pexels.com/photos/6142753/pexels-photo-6142753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '3', uri: 'https://images.pexels.com/photos/2080383/pexels-photo-2080383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '4', uri: 'https://images.pexels.com/photos/2870510/pexels-photo-2870510.jpeg' },
  { id: '5', uri: 'https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg' },
  { id: '6', uri: 'https://images.pexels.com/photos/803105/pexels-photo-803105.jpeg' },
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

  const openImage = (uri: string, id: string) => {
    switch (id) {
      case '1':
        setSelectedImage('myStories');
        break;
      case '2':
        setSelectedImage('https://images.pexels.com/photos/373467/pexels-photo-373467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
        break;
      case '3':
        setSelectedImage('https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
        break;
      case '4':
        setSelectedImage('https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
        break;
      case '5':
        setSelectedImage('https://images.pexels.com/photos/2728252/pexels-photo-2728252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
        break;
      case '6':
        setSelectedImage('https://images.pexels.com/photos/269809/pexels-photo-269809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
        break;
      // Adicione casos adicionais aqui para outros IDs
      default:
        setSelectedImage(uri); // Usa a URI original se nenhum ID correspondente for encontrado
    }
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const images = useSelector(state => state.images);
  const myStories = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <FlatList
            data={images}
            pagingEnabled
            horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Image source={{uri: item.uri}} style={styles.fullImage} />
              )}
            />
        </View>
        <Button mode="contained" onPress={closeImage} style={styles.closeButton}>
          Fechar
        </Button>
      </>
    );
  }

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
          <TouchableOpacity onPress={() => openImage(item.uri, item.id)}>
            <View style={[
                styles.imageCircle,
                { borderColor: item.id == '1' && images.length > 1 ? "#00ff22" : '#FE3D8A' }
            ]}>
              <Image source={{ uri: item.uri }} style={styles.circleImage} />
            </View>
          </TouchableOpacity>
        )}
        style={styles.flatList}
      />
      <View style={styles.separator} />

      <Modal visible={selectedImage !== null} transparent={true}>
        {
          selectedImage === 'myStories'
            ? myStories()
            : (
              <View style={styles.modalContainer}>
                {selectedImage && (
                  <Image source={{ uri: selectedImage }} style={styles.fullImage} />
                )}
                <Button mode="contained" onPress={closeImage} style={styles.closeButton}>
                  Fechar
                </Button>
              </View>
            )
        }
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  plusSignContainer: {
    position: 'absolute',
    top: -15, // Posição o sinal "+" acima do ícone
    left: 10, // Posição o sinal "+" à esquerda do ícone
    backgroundColor: 'transparent',
  },
  plusSign: {
    fontSize: 24, // Tamanho do sinal "+"
    color: '#fff', // Cor do sinal "+"
  },
  flatList: {
    marginTop: 25,
    paddingHorizontal: 10,
  },
  imageCircle: {
    borderRadius: 50,
    overflow: 'hidden',
    marginHorizontal: 5,
    borderWidth: 2,
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
    backgroundColor: '#071D41', // Fundo mais escuro para os ícones
  },
  selectedImage: {
    width: '100%',
    height: 400,
    marginTop: 16,
  },
  modalContainer: {
    height: height,
    width: width,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    aspectRatio: 9 / 16,
    width: width,
    height: 'auto',
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
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
  text: {
    fontSize: 23,
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