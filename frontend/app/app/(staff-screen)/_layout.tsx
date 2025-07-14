import { Stack } from "expo-router";

export default function StaffScreenLayout(){
    return(
        <Stack>
            <Stack.Screen name="home" options={{title:"Home"}}/>
            <Stack.Screen name="requestPage" options={{title:"Request a appointment"}}/>
        </Stack>
    )
}