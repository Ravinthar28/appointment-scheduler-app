import { Stack } from "expo-router";

export default function PrincipalLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{title:"Home",headerShown:false}} />
            <Stack.Screen name="pending_appointments" options={{title:"history",headerShown:false}}/>
            <Stack.Screen name="confirm_appointments" options={{title:"Confirm Appointments",headerShown:false}}/>
        </Stack>
    )
}