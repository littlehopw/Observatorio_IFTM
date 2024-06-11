import React from 'react';
import { View, Alert } from 'react-native'; 
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const MainScreen = () => {
  const handleCancel = () => {
    Alert.alert('Cancelado!');
  };

  const handleOk = () => {
    Alert.alert('Confirmado!'); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card>
        <Card.Content>
          <Title>Protótipo de aplicativo concluído</Title>
          <Paragraph>Clique para cancelar ou confirmar.</Paragraph>
        </Card.Content>
        <Card.Actions>
          {/* Adicionando manipuladores de eventos para os botões */}
          <Button onPress={handleCancel}>Cancelar</Button>
          <Button onPress={handleOk}>Confirmar</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default MainScreen;
