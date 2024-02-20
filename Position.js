import * as Location from 'expo-location';
import Weather from './Weather';
import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default Position;

export function Position() {
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [locationName, setLocationName] = useState('')
    const [msg, setMsg] = useState('Retrieving location...')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync()
            console.log(status)
            try {
                if (status !== 'granted') {
                    setMsg('Location not permitted')
                } else {
                    const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
                    const {latitude, longitude} = position.coords
                    setLat(latitude)
                    setLong(longitude)
                    const place = await Location.reverseGeocodeAsync({latitude, longitude})
                    const {city, region} = place[0]
                    setLocationName(`${city}, ${region}`)
                    setMsg('')
                }
            } catch (error) {
                setMsg('Error retrieving location')
                console.log(error)
            }
            setIsLoading(false)
        })()
    }, [])

    return (
        <View>
            <Text>{msg}</Text>
            <Text style={styles.location}>{locationName || `${lat.toFixed(3)}, ${long.toFixed(3)}`}</Text>
            {isLoading === false &&
                <Weather latitude={lat} longitude={long}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    location: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
})
