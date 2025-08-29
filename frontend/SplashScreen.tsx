import { ActivityIndicator, Text, View } from "react-native";

function SplashScreen(){
    return(
        <View className="flex-1 items-center justify-center bg-white">
            <ActivityIndicator />
            <Text className="mt-4 text-lg font-semibold">Loading...</Text>
            <Text className="mt-4 text-lg font-semibold">Loading...</Text>
            <Text className="mt-4 text-lg font-semibold">Loading...</Text>
            <Text className="mt-4 text-lg font-semibold">Loading...</Text>
            <Text className="mt-4 text-lg font-semibold">Loading...</Text>
            <Text className="mt-4 text-lg font-semibold">Loading...</Text>
        </View>
    )
}

export default SplashScreen;