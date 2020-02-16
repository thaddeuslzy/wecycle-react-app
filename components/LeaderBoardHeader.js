import * as React from 'react';
import { Text, View, Image } from 'react-native';

export default () => {
    return(
        <View colors={[, '#1da2c6', '#1695b7']}
            style={{ backgroundColor: '#119abf', padding: 15, paddingTop: 35, alignItems: 'center' }}>
            <Text style={{ fontSize: 25, color: 'white', }}>Gavin</Text>
            <View style={{
                flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                marginBottom: 15, marginTop: 20
            }}>
                <Text style={{ color: 'white', fontSize: 25, flex: 1, textAlign: 'right', marginRight: 40 }}>
                    4th
                </Text>
                <Image style={{ flex: .66, height: 60, width: 60, borderRadius: 60 / 2 }}
                    source={{ uri: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' }} />
                <Text style={{ color: 'white', fontSize: 25, flex: 1, marginLeft: 40 }}>
                    96pts
                </Text>
            </View>
        </View>
    );

}
