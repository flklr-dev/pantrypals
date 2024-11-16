import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface Props {
    navigation: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const login = async () => {
        try {
            const response = await axios.post("http://192.168.1.118:5000/api/auth/login", { email, password });
            await AsyncStorage.setItem("token", response.data.token);
            Alert.alert("Login successful");
            navigation.replace("Home"); // Navigate to HomeScreen after successful login
        } catch (error: any) {
            Alert.alert("Login failed", error.response?.data?.message || error.message);
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.subtitle}>Log in to unlock a world of shared recipes and pantry creativity!</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Enter your email"
                    placeholderTextColor="#d3d3d3"
                />
                
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.inputWithIcon}
                        secureTextEntry={!showPassword}
                        placeholder="Enter your password"
                        placeholderTextColor="#d3d3d3"
                    />
                    <TouchableOpacity style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
                        <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => Alert.alert("Forgot Password?")} style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={login}>
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>

                <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.socialIconsContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Icon name="google" size={24} color="#DB4437" />
                        <Text style={styles.socialButtonText}>Continue with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Icon name="facebook" size={24} color="#3b5998" />
                        <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Icon name="instagram" size={24} color="#C13584" />
                        <Text style={styles.socialButtonText}>Continue with Instagram</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.signupText}>
                    Don’t have an account?{" "}
                    <Text style={styles.signupLink} onPress={() => navigation.navigate("Register")}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f79c57",
        padding: 16,
        paddingTop: 70,
        alignItems: "center",
    },
    headerContainer: {
        width: "100%",
        paddingHorizontal: 10,
        marginBottom: 20,
        alignItems: "flex-start",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#fff",
        opacity: 0.8,
    },
    form: {
        width: "105%",
        maxWidth: 400,
        padding: 15,
        alignItems: "center",
    },
    label: {
        alignSelf: "flex-start",
        color: "#fff",
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        width: "100%",
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
        fontSize: 16,
        color: "#333",
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: "#fff",
        fontSize: 14,
        textDecorationLine: "underline",
    },
    passwordContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 25,
        marginBottom: 15,
        paddingHorizontal: 20,
        position: "relative", // Added to position icon correctly
        justifyContent: "center",
    },
    inputWithIcon: {
        fontSize: 16,
        color: "#333",
        height: 40,
        paddingRight: 40, // Added padding for the icon
    },
    iconContainer: {
        position: "absolute",
        right: 15,
        top: "50%",
        transform: [{ translateY: -10 }],
    },

    loginButton: {
        width: "100%",
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    loginButtonText: {
        color: "#f79c57",
        fontWeight: "bold",
        fontSize: 16,
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        marginBottom: 25,      
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#fff",
        opacity: 0.5,
        marginHorizontal: 10,
    },
    orText: {
        color: "#fff",
        fontSize: 14,
        opacity: 0.5,
    },
    socialIconsContainer: {
        width: "100%",
        marginBottom: 20,
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 25,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    socialButtonText: {
        marginLeft: 10,
        fontSize: 15,
        color: "#333",
        opacity: 0.8,
    },
    signupText: {
        color: "#fff",
        marginTop: 20,
    },
    signupLink: {
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});

export default LoginScreen;
