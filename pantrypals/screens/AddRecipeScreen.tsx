import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary } from "react-native-image-picker"; // Import Image Picker
import axios from "axios";

const AddRecipeScreen: React.FC = () => {
    const [recipeTitle, setRecipeTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [servingSize, setServingSize] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [authorNotes, setAuthorNotes] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [coverImage, setCoverImage] = useState<string | null>(null);

    const handleImagePick = () => {
        launchImageLibrary(
            {
                mediaType: "photo",
                quality: 1,
            },
            (response) => {
                if (response.didCancel) {
                    Alert.alert("Image selection cancelled");
                } else if (response.errorCode) {
                    Alert.alert("Image Picker Error", response.errorMessage || "Unknown error");
                } else {
                    const uri = response.assets?.[0]?.uri;
                    if (uri) setCoverImage(uri);
                }
            }
        );
    };

    const saveRecipe = async () => {
        if (!recipeTitle || !description || !category || !servingSize || !ingredients.length || !instructions.length || !coverImage) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("title", recipeTitle);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("servingSize", servingSize);
        formData.append("ingredients", JSON.stringify(ingredients));
        formData.append("cookingInstructions", JSON.stringify(instructions));
        formData.append("authorNotes", authorNotes);
        formData.append("sharingOption", isPublic ? "public" : "private");

        // Append cover image
        if (coverImage) {
            formData.append("image", {
                uri: coverImage,
                name: "cover.jpg",
                type: "image/jpeg",
            });
        } else {
            console.error("No image selected for upload");
        }
        
        try {
            const response = await axios.post("http://192.168.1.118:5000/api/recipes", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            Alert.alert("Success", "Recipe saved successfully!");
        } catch (error) {
            Alert.alert("Error", "Failed to save recipe. Please try again.");
            console.error(error);
        }
    };

    const addIngredient = () => setIngredients([...ingredients, ""]);
    const updateIngredient = (text: string, index: number) =>
        setIngredients(ingredients.map((item, i) => (i === index ? text : item)));
    const deleteIngredient = (index: number) =>
        setIngredients(ingredients.filter((_, i) => i !== index));

    const addInstruction = () => setInstructions([...instructions, ""]);
    const updateInstruction = (text: string, index: number) =>
        setInstructions(instructions.map((item, i) => (i === index ? text : item)));
    const deleteInstruction = (index: number) =>
        setInstructions(instructions.filter((_, i) => i !== index));

    

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Recipe</Text>
            </View>

            <ScrollView style={styles.container}>
                <Text style={styles.label}>Recipe Title</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter a title for your recipe"
                    value={recipeTitle}
                    onChangeText={setRecipeTitle}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.textInput, styles.multilineInput]}
                    placeholder="Tell us about your recipe"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

                <Text style={styles.label}>Add Cover Image</Text>
                <TouchableOpacity style={styles.imageUploadButton} onPress={handleImagePick}>
                    <Text style={styles.imageUploadText}>
                        {coverImage ? "Change Image" : "Add Image"}
                    </Text>
                </TouchableOpacity>
                {coverImage && (
                    <Image source={{ uri: coverImage }} style={styles.coverImagePreview} />
                )}

                <View style={styles.row}>
                    <View style={styles.widerField}>
                        <Text style={styles.label}>Category</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={category}
                                onValueChange={setCategory}
                                style={styles.picker}
                            >
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="Breakfast" value="breakfast" />
                                <Picker.Item label="Lunch" value="lunch" />
                                <Picker.Item label="Dinner" value="dinner" />
                                <Picker.Item label="Desserts" value="desserts" />
                                <Picker.Item label="Snacks" value="snacks" />
                                <Picker.Item label="Beverages" value="beverages" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.narrowField}>
                        <Text style={styles.label}>Serving Size</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={servingSize}
                                onValueChange={setServingSize}
                                style={styles.picker}
                            >
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5+" value="5+" />
                            </Picker>
                        </View>
                    </View>
                </View>

                <Text style={styles.label}>Ingredients</Text>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.wideInputContainer}>
                        <TextInput
                            style={[styles.textInput, styles.fullWidthInput]}
                            placeholder="Enter ingredient"
                            value={ingredient}
                            onChangeText={(text) => updateIngredient(text, index)}
                        />
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteIngredient(index)}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
                    <Text style={styles.addButtonText}>+ Add Ingredient</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Cooking Instructions</Text>
                {instructions.map((instruction, index) => (
                    <View key={index} style={styles.wideInputContainer}>
                        <TextInput
                            style={[styles.textInput, styles.fullWidthInput]}
                            placeholder="Enter instruction"
                            value={instruction}
                            onChangeText={(text) => updateInstruction(text, index)}
                        />
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteInstruction(index)}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={addInstruction}>
                    <Text style={styles.addButtonText}>+ Add Instruction</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Author's Notes (Optional)</Text>
                <TextInput
                    style={[styles.textInput, styles.multilineInput]}
                    placeholder="Add tips or notes for this recipe"
                    value={authorNotes}
                    onChangeText={setAuthorNotes}
                    multiline
                />

                <Text style={styles.label}>Sharing Options</Text>
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            isPublic && styles.toggleButtonActive,
                        ]}
                        onPress={() => setIsPublic(true)}
                    >
                        <Text style={styles.toggleText}>Public</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            !isPublic && styles.toggleButtonActive,
                        ]}
                        onPress={() => setIsPublic(false)}
                    >
                        <Text style={styles.toggleText}>Private</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
                    <Text style={styles.saveButtonText}>Save Recipe</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f79c57",
        padding: 15,
        paddingTop: 35,
    },
    backButton: {
        marginRight: 15,
    },
    backButtonText: {
        fontSize: 18,
        color: "#fff",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        marginTop: 10,

    },
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#f79c57",
        marginBottom: 10,
    },
    textInput: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: "#f79c57",
        marginBottom: 20,
    },
    multilineInput: {
        minHeight: 80,
        textAlignVertical: "top",
    },
    imageUploadButton: {
        backgroundColor: "#f79c57",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    imageUploadText: {
        color: "#fff",
        fontWeight: "600",
    },
    coverImagePreview: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#f79c57",
        borderRadius: 10,
        backgroundColor: "#fff",
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: "100%",
        marginBottom: 3,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    widerField: {
        width: "65%",
    },
    narrowField: {
        width: "30%",
    },
    wideInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    fullWidthInput: {
        flex: 1,
    },
    deleteButton: {
        backgroundColor: "#FF6B6B",
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginBottom: 20,
    },
    deleteButtonText: {
        color: "#fff",
    },
    addButton: {
        backgroundColor: "#f79c57",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
    toggleContainer: {
        flexDirection: "row",
        marginBottom: 20,
        gap: 10,
    },
    toggleButton: {
        flex: 1,
        padding: 15,
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#f79c57",
        opacity: 0.7,
    },
    toggleButtonActive: {
        backgroundColor: "#f79c57",
        opacity: 1,
    },
    toggleText: {
        color: "#fff",
        fontWeight: "600",
    },
    saveButton: {
        backgroundColor: "#f79c57",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 50,
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
});

export default AddRecipeScreen;
