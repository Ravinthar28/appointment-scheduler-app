import { Stack } from "expo-router";

export default function AuthLayout(){
    return(
        <Stack>
            <Stack.Screen name="login_new" options={{headerShown:false}} />
            <Stack.Screen name="register_new" options={{title:"Login",headerShown:false}} />
        </Stack>
    )
}