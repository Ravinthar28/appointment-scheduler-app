import { Stack } from "expo-router";

export default function FlashLayout(){

    return(
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="flash_screen" options={{headerShown:false}} />
        </Stack>
    )
}