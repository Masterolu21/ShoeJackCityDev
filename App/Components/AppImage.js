
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Image, Animated, View } from 'react-native';

function AppImage({
    source,
    imageStyle,
    resizeMode = 'contain'
}) {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const [loading, setLoading] = useState(true);
    React.useEffect(() => {
        if (!loading) {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 2000,
                }
            ).start();
        }
    }, [fadeAnim, loading])

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: imageStyle?.height}}>
            <Animated.Image
                source={source}
                resizeMode={resizeMode}
                style={[imageStyle, { opacity: fadeAnim, }]}
                onLoadStart={() => {
                    setLoading(true);
                }}
                onLoadEnd={() => {
                    setLoading(false);
                }}
                onError={() => {
                    setLoading(false);
                }}
            />
            {loading && (
                <ActivityIndicator color={'grey'} style={{ position: 'absolute' }} />
            )}
        </View>
    )
}

export default AppImage