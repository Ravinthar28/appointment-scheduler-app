import { Stack } from "expo-router";

export default function StaffScreenLayout(){
    return(
        <Stack>
            <Stack.Screen name="new_index" options={{title:"Home",headerShown:false}}/>
            <Stack.Screen name="new_requestpage" options={{title:"Request a appointment",headerShown:false}}/>
            <Stack.Screen name="empty_appointments" options={{title:"empty",headerShown:false}}/>
        </Stack>
    )
}