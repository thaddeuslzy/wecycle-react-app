import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';


export default function ContributeScreen() {
  const [currentImgIdx, setCurrentImgIdx] = React.useState(0)
  const images = [
    {
      id: "1",
      actualimage: require("../assets/images/photo_202002160.jpg"),
    },
    {
      id: "2",
      actualimage: require("../assets/images/photo_202002161.jpg"),
    },
    {
      id: "3",
      actualimage: require("../assets/images/photo_202002162.jpg"),
    },
    {
      id: "4",
      actualimage: require("../assets/images/photo_202002163.jpg"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/turtle.png')}
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Teach me Senpai!</Text>
          <View>
            <View>
              {
                  images[currentImgIdx] &&
                    <Image
                      key={images[currentImgIdx].id}
                      style = {{
                        width: 300,
                        height: 300,
                      }}
                      source={images[currentImgIdx].actualimage} 
                    />
              }
            </View>
            <View>
            </View>
          </View>
          {/* <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View> */}
          <View>
            <Text style={styles.getStartedText}>
              Place me in:
            </Text>
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
          </View>
          <View>
            <Text style={styles.getStartedText}>
              I am a:
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
                style={styles.feedbackInput}
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
            
          </View>
          <Button 
                title= "Submit" 
                onPress={() => setCurrentImgIdx(currentImgIdx == images.length - 1 ? 
                    0 : 
                    currentImgIdx + 1
                )}
            />
        </View>

        {/* <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>
        </View>
      </View> */}
    </View>
  );
}

ContributeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  return (
    <Text style={styles.developmentModeText}>
      Help improve our predictions by helping the model learn from user-submitted images!
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  contributeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },  
  feedbackInputs: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
