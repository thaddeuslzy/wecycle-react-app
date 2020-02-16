import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, TouchableHighlight, Dimensions} from 'react-native';
import { Camera } from 'expo-camera';
import TabBarIcon from '../components/TabBarIcon';
import Icons from '../components/Icons';
import { Icon } from 'react-native-elements';
import PickerSelect from 'react-native-picker-select';
import Overlay from 'react-native-modal-overlay';
import MetalOverlay from '../components/OverlayMetal';
import Loader from '../components/Loader';

export default function MainScreen() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [latestImage, setLatestImg] = React.useState(null)
  const [isCameraVisible, setIsCameraVisible] = React.useState(false);
  const [hasResults, setHasResults] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [showInformation, setShowInformation] = React.useState(false);
  const [showThankyou, setShowThankyou] = React.useState(false);
  const [showAwesome, setShowAwesome] = React.useState(false);
  const [materialType, setMaterialType] = React.useState('metal');
  const [loading, setLoading] = React.useState(false);

  const openCamera = () => {
    if (hasPermission === null || hasPermission === false) {
      Alert.alert("Error", "No access to camera");
    } else {
      setIsCameraVisible(true);
      setHasResults(false);
      setShowAwesome(false);
      setShowThankyou(false);
    }
  }
  const closeOverlay = () => {
    setShowInformation(false);
  }
  const showOverlay = () => {
    setShowInformation(true);
  }

  const toggleAwesome = () => {
    setShowAwesome(true);
    setLatestImg(null);
    setHasResults(false);
  }
  const reset = () => {
    setShowAwesome(false);
    setShowThankyou(false);
    setHasResults(false);
    setShowFeedback(false);
    setIsCameraVisible(false);
    setLatestImg(null);
    setShowInformation(false);
  }
  const toggleFeedback = () => {
    setHasResults(false);
    setShowFeedback(true);
  }
  const toggleThanks = () => {
    console.log("toggle thanks");
    setShowFeedback(false);
    setLatestImg(null);
    setShowThankyou(true);
  }
  const showLoading = () => {
    setLoading(true);
  }
  const hideLoading = () => {
    setLoading(false);
  }

  const takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({ base64: true }); // take a snap, and return base64 representation
      let formData = new FormData();
      formData.append("image", photo.base64); 
      formData.append("type", "base64");
      console.log(photo.uri);
      showLoading;
      let result = await getResults(formData);
      console.log(result);
      hideLoading;
      setLatestImg(photo.uri);  // preview the photo
      setIsCameraVisible(false); // close the camera UI
      setHasResults(true);
      setShowInformation(true);
    }
  };

  async function getResults(query) {
    try {
      let response = await fetch("https://72a0a035.ngrok.io/materials" , {
      method: "GET",
      // body: query
      });
      if(response.status > 400){
        console.log("400 Code");
        return {};
      } else {
        console.log("awaiting response");
        return await response.json();
      }
    } catch(e) {
        console.log(e);
   }
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
    <View style={{ flex: 1, flexDirection: 'column'}}>
      <Overlay
        visible={showInformation}
        onClose={closeOverlay}
        closeOnTouchOutside
      >
        {(materialType === 'metal') && <MetalOverlay/>}
        {(materialType !== 'metal') && 
          <View>
            <Text style={styles.header}>
              Material
            </Text>
            <View>
              <Text style={[styles.recyclables, styles.header, styles.underline]}>
                Recyclables
              </Text>
              <Text style={styles.largeFont}>
              </Text>
            </View>
          <View>
            <Text style={[styles.warning, styles.header, styles.underline]}>
              Warning!
            </Text>
            <Text style={[styles.largeFont, styles.underline]}>
            </Text>
          </View>
        </View>}
      </Overlay>
      {!isCameraVisible &&
        <View>
          {latestImage &&
            <View>
              <View>
                <Image
                  style= {{alignSelf: "center", width:415, height: 415}}
                  resizeMode={"cover"}
                  source={{ uri: latestImage }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableHighlight style={{position:'absolute'}} onPress={showOverlay}>
                  <Image
                    source={require('../assets/images/turtle.png')}
                    style={{width:50, height:50, margin: 10}}
                  />
                </TouchableHighlight>
                <TouchableHighlight style={{marginLeft: 180}} onPress={openCamera}>
                  <Icons style={{alignSelf: "center"}} name="camera" size={40} color="#1083bb" />
                </TouchableHighlight>
              </View>
            </View>}
          {!latestImage && 
          <View style={styles.startCamera}> 
            <TouchableOpacity onPress={openCamera}>
              <Icons style={{alignSelf: "center"}} name="camera" size={40} color="#1083bb" />
            </TouchableOpacity>
          </View>
          }
        </View>
    }
    {isCameraVisible && 
      <Camera ref={(ref) => {this.camera = ref}} style={{ flex: 1, justifyContent: 'flex-end'}} type={type} autoFocus={"on"}>
        <View
          style={{
            flex: 0,
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
    {latestImage && hasResults &&
      <View style={styles.contentContainer}>
        <View style={styles.container}>
          <Text style={styles.bottomText}>Reyclable:</Text>
          <Text style={styles.recycleYes}>YES</Text>
        </View>
        <View style={styles.container}>
          <Text>Material:</Text>
          <Text style={styles.material}>Metal</Text>
        </View>
        <View style={styles.container} >
          <Text>Did we get it right?</Text>
          <View style={styles.checks}>
            <TouchableHighlight onPress={toggleAwesome}>
              <Icon
                reverse
                name='md-checkmark'
                type='ionicon'
                color='green'
              />
            </TouchableHighlight>
            <TouchableHighlight onPress={toggleFeedback}>
              <Icon
                reverse
                name='md-close'
                type='ionicon'
                color='red'
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>}
      {showAwesome && 
        <View style={styles.awesome}>
          <Text style={styles.awesometext}>Awesome!</Text>
        </View>
      }
      {showFeedback && 
      <View style={styles.feedback}>
        <Text style={styles.feedbacktext}>
          Help Us Improve!
        </Text>
        <Text style={styles.feedbacktext}>
          What did you think it was?
        </Text>
        <View style={styles.feedbackInputs}>
          <PickerSelect 
            style={styles.feedbackInput}
            onValueChange={(value) => console.log(value)}
            items={[
              { label: 'Plastic', value: 'plastic' },
              { label: 'Paper', value: 'paper' },
              { label: 'Cardboard', value: 'cardboard' },
              { label: 'Metal', value: 'metal' },
              { label: 'Glass', value: 'glass' },
              { label: 'Rubbish/Landfill', value: 'rubbish' },
            ]}
            />
          <Text style={styles.getStartedText}>
            {`  `}
          </Text>
          <PickerSelect 
            onValueChange={(value) => console.log(value)}
            items={[
              { label: 'Others', value: 'others' },
              { label: 'Bottle', value: 'bottle' },
              { label: 'Can', value: 'can' },
              { label: 'Container', value: 'container' },
              { label: 'Sheet', value: 'sheet' },
              { label: 'Bag', value: 'bag' },
              { label: 'Case', value: 'case' },
              { label: 'Plate/Utensil', value: 'plates' },
              { label: 'Bundle', value: 'bundle' },
              { label: 'Roll', value: 'roll' },
            ]}
          />
        </View>
        <Button 
          onPress={toggleThanks}
          style={styles.button}
          title="Submit">
        </Button>
      </View>}

      {showThankyou && 
        <View style={styles.awesome}>
          <Text style={styles.awesometext}>
            Thank You!
          </Text>
          <Text style={styles.thankYouText}>
            ReRite is now smarter because of you!
          </Text>
        </View>
      }
    </View>);
}

const styles = StyleSheet.create({
  startCamera: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  container: {
    marginBottom: 20,
    alignSelf: "center"
  },
  checks: {
    flexDirection: 'row',
  },
  bottomText: {
    alignContent: "center",
    justifyContent:"center"
  },
  recycleYes: {
    color: 'green',
    fontSize: 24,
  },
  recycleNo: {
    color: 'red',
    fontSize: 24,
  },
  material: {
    color: 'grey',
    fontSize: 24,
  },
  awesome: {
    flex: 1,
    justifyContent: 'center',
  },
  awesometext: {
    fontSize: 30,
    alignSelf: 'center'
  },
  feedback: {
    flex: 1,
  },
  feedbacktext: {
    fontSize: 20,
    alignSelf: 'center'
  },
  feedbackInputs: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  thankYouText: {
    alignSelf: 'center',
  },
  feedbackInput: {
    alignSelf: 'center',
    borderStyle: 'solid',
    marginLeft: 5,
    marginRight: 5
  },
  largeFont: {
    fontSize: 18
  },
  header: {
    fontSize: 24
  },
  recyclables: {
    color: 'green'
  },
  warning: {
    color: 'red'
  },
  underline: {
    textDecorationLine: 'underline'
  }
});