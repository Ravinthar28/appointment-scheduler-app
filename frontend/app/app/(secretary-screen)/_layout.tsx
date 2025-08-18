import { Stack } from "expo-router";

export default function SecretaryLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}} />
        </Stack>
    )
}