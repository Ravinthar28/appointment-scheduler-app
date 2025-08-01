import { Stack } from "expo-router";

export default function PrincipalLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}} />
        </Stack>
    )
}