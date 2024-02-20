import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import Position from './components/Position'

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Current Weather</Text>
            <StatusBar style="auto"/>
            <Position/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
