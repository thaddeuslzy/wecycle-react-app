import * as React from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default function(){
    return (
        <View>
            <Text style={styles.header}>
                Metal
            </Text>
            <View>
                <Text style={[styles.recyclables, styles.header, styles.underline]}>
                Recyclables
                </Text>
                <Text style={styles.largeFont}>
                Aluminum Cans{}
                </Text>
            </View>
            <View>
                <Text style={[styles.warning, styles.header, styles.underline]}>
                Warning!
                </Text>
                <Text style={[styles.largeFont, styles.underline]}>
                </Text>
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
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
