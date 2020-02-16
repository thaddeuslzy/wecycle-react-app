import * as React from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default function(){
    return (
        <View>
            <Text style={styles.header}>
                Metal
            </Text>
            <View style={{alignItems:"center", justifyContent:"center"}}>
                <Text style={[styles.recyclables, styles.header, styles.underline]}>
                Recyclables
                </Text>
                <Text style={styles.largeFont}>
{`Aluminum Cans
Steel Cans
Aluminum Trays
Pie Plates
Roasting Pans
Cookie Tins
Aerosol Cans (Plastic caps must be removed)
Paint Cans (Must be empty with lids removed)`}
                </Text>
            </View>
            <View style={{alignItems:'center', justifyContent:'ce'}}>
                <Text style={[styles.warning, styles.header, styles.underline]}>
                Warning!
                </Text>
                <Text style={styles.largeFont}>
{`Remember to clean your items!`}
                </Text>
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    largeFont: {
        alignSelf: 'center',
        fontSize: 18
      },
      header: {
        alignSelf: 'center',
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
