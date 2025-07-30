import { Stack } from "expo-router";

export default function PrincipalLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{title:"Home",headerShown:false}} />
        </Stack>
    )
}