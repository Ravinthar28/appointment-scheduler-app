import { Stack } from "expo-router";

export default function PrincipalLayout(){
    return(
        <Stack>
            <Stack.Screen name="home" options={{title:"Home"}} />
        </Stack>
    )
}