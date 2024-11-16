import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

interface Props {
    navigation: any;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const register = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }

        try {
            await axios.post("http://192.168.1.118:5000/api/auth/register", { name, email, password });
            Alert.alert("Registration successful");
            navigation.navigate("Login");
        } catch (error: any) {
            Alert.alert("Registration failed", error.response?.data?.message || error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Create an Account</Text>
                <Text style={styles.subtitle}>Get started with PantryPals – your cooking community.</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholder="e.g. Juan A. Dela Cruz"
                    placeholderTextColor="#d3d3d3"
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Email"
                    placeholderTextColor="#d3d3d3"
                />

                <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            style={styles.inputWithIcon}
                            secureTextEntry={!showPassword}
                            placeholder="Create a strong password"
                            placeholderTextColor="#d3d3d3"
                        />
                        <TouchableOpacity style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
                            <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Confirm Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={styles.inputWithIcon}
                            secureTextEntry={!showConfirmPassword}
                            placeholder="Re-enter your password"
                            placeholderTextColor="#d3d3d3"
                        />
                        <TouchableOpacity style={styles.iconContainer} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Icon name={showConfirmPassword ? "eye-slash" : "eye"} size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
                        onPress={() => setIsChecked(!isChecked)}
                    >
                        {isChecked && <Icon name="check" size={16} color="#f79c57" />}
                    </TouchableOpacity>
                    <Text style={styles.termsText}>
                        Agree with <Text style={styles.link}>Terms & Conditions</Text>
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.registerButton, !isChecked && styles.disabledButton]}
                    onPress={register}
                    disabled={!isChecked}
                >
                    <Text style={styles.registerButtonText}>Sign Up</Text>
                </TouchableOpacity>
                
                <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.line} />
                </View>
                
                <View style={styles.socialIconsContainer}>
                    <TouchableOpacity style={styles.socialIcon}>
                        <Icon name="facebook" size={24} color="#3b5998" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialIcon}>
                        <Icon name="google" size={24} color="#DB4437" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialIcon}>
                        <Icon name="instagram" size={24} color="#C13584" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.loginText}>
                    Already have an account?{" "}
                    <Text style={styles.linkBold} onPress={() => navigation.navigate("Login")}>
                        Log In
                    </Text>
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f79c57",
        padding: 16,
        paddingTop: 90,
        justifyContent: "center",
        alignItems: "center",
    },
    headerContainer: {
        width: "100%",
        paddingHorizontal: 10,
        marginBottom: 10,
        alignItems: "flex-start",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 8,
        textAlign: "left",
    },
    subtitle: {
        fontSize: 16,
        color: "#fff",
        textAlign: "left",
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
    
    checkboxContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#fff",
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    checkedCheckbox: {
        backgroundColor: "#fff",
    },
    termsText: {
        color: "#fff",
        textAlign: "left",
    },
    link: {
        textDecorationLine: "underline",
    },
    linkBold: {
        textDecorationLine: "underline",
        fontWeight: "bold",
    },
    registerButton: {
        width: "100%",
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    disabledButton: {
        opacity: 0.5,
    },
    registerButtonText: {
        color: "#f79c57",
        fontWeight: "bold",
        fontSize: 16,
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
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
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
        marginTop: 10,
        marginBottom: 30,
    },
    socialIcon: {
        width: 50,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    loginText: {
        color: "#fff",
        marginBottom: 20,
    },
});

export default RegisterScreen;
