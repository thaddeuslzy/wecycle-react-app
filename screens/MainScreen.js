import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import TabBarIcon from '../components/TabBarIcon';
import Icons from '../components/Icons';

export default function MainScreen() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [latestImage, setLatestImg] = React.useState(null)
  const [isCameraVisible, setIsCameraVisible] = React.useState(false);

  const openCamera = () => {
    if (hasPermission === null || hasPermission === false) {
      Alert.alert("Error", "No access to camera");
    } else {
      setIsCameraVisible(true);
    }
  }
  
  const closeCamera = () => {
    setIsCameraVisible(false);
  };


  const takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({ base64: true }); // take a snap, and return base64 representation

      // construct
      let formData = new FormData();
      formData.append("image", photo.base64); 
      formData.append("type", "base64");
      console.log(photo.uri);
      setLatestImg(photo.uri);  // preview the photo that was taken
      setIsCameraVisible(false); // close the camera UI after taking the photo

      // const response = await fetch("https://api.imgur.com/3/image", {
      //   method: "POST",
      //   headers: {
      //     Authorization: "Client-ID YOUR_IMGUR_APP_ID" // add your Imgur App ID here
      //   },
      //   body: formData
      // });

      // let response_body = await response.json(); // get the response body
    }
  };

const onPictureSaved = photo => {
  console.log(photo);
}

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      {!isCameraVisible &&
      <ScrollView contentContainerStyle={styles.scroll}>
        <View>
          <TouchableOpacity>
            <View>
              <Text>Placeholdertext</Text>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={openCamera}>
              <Icons name="camera" size={40} color="#1083bb" />
            </TouchableOpacity>
          </View>

          {latestImage &&
            <View style={{flex:1}}>
              <Image
                style= {{width:300, height: 300}}
                resizeMode={"cover"}
                source={{ uri: latestImage }}
              />
              <Text>Image Here</Text>
            </View>
          }
        </View>
      </ScrollView>
    }
    {isCameraVisible && 
      <Camera ref={(ref) => {this.camera = ref}} style={{ flex: 1 }} type={type} autoFocus={"on"}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              position: "absolute",
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <TabBarIcon style={{marginBottom:0, marginLeft:10}} size={50} name="ios-reverse-camera" />
            
          </TouchableOpacity>
          <TouchableOpacity
            style={{
                flex: 1,
                flexDirection: 'column-reverse',
                justifySelf: 'center',
                alignItems: 'center',
              }}
              onPress={takePicture}>
            <Icons style={{marginBottom:0}} size={60} name="circle" />
          </TouchableOpacity>
        </View>
      </Camera>}
    

    </View>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
