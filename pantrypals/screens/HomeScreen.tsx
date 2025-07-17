// HomeScreen.tsx
import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
    const [heartStates, setHeartStates] = useState<{ [key: number]: boolean }>({});

    const toggleHeart = (index: number) => {
        setHeartStates((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const categories = [
        { id: 1, name: "Egg", image: require("../assets/images/egg.png") },
        { id: 2, name: "Chicken", image: require("../assets/images/chicken.png") },
        { id: 3, name: "Pasta", image: require("../assets/images/pasta.png") },
        { id: 4, name: "Chicken", image: require("../assets/images/chicken.png") },
        { id: 5, name: "Rice", image: require("../assets/images/rice.png") },
        { id: 6, name: "Beef", image: require("../assets/images/beef.png") },
        { id: 7, name: "Pork", image: require("../assets/images/pork.png") },
        { id: 8, name: "Tuna", image: require("../assets/images/salmon.png") },
        { id: 9, name: "Shrimp", image: require("../assets/images/shrimp.png") },
        { id: 10, name: "Cheese", image: require("../assets/images/cheese.png") },
        { id: 11, name: "Chocolate", image: require("../assets/images/chocolate.png") },
        { id: 12, name: "Bread", image: require("../assets/images/bread.png") },
        { id: 13, name: "Milk", image: require("../assets/images/milk.png") },
        { id: 14, name: "Banana", image: require("../assets/images/banana.png") },
        { id: 15, name: "Strawberries", image: require("../assets/images/strawberries.png") },
        { id: 16, name: "Grapes", image: require("../assets/images/grapes.png") },
        { id: 17, name: "Broccoli", image: require("../assets/images/broccoli.png") },
        { id: 18, name: "Carrot", image: require("../assets/images/carrot.png") },
        { id: 19, name: "Peanut Butter", image: require("../assets/images/peanut-butter.png") },
        { id: 20, name: "Tomato", image: require("../assets/images/tomato.png") },
        { id: 21, name: "Peanut Butter", image: require("../assets/images/peanut-butter.png") },
        { id: 22, name: "Tomato", image: require("../assets/images/tomato.png") },
        
    ];

    const users = [
        { id: 1, name: "John Doe", image: require("../assets/25.png") },
        { id: 2, name: "Jane Smith", image: require("../assets/26.png") },
        { id: 3, name: "Alice Johnson", image: require("../assets/27.png") },
        { id: 4, name: "Michael Brown", image: require("../assets/28.png") },
        { id: 5, name: "Emma Davis", image: require("../assets/29.png") },
        { id: 6, name: "Taylor Swift", image: require("../assets/30.png") },
        { id: 7, name: "Messi", image: require("../assets/31.png") },
        { id: 8, name: "Eminem", image: require("../assets/32.png") },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Icon name="user-circle" size={30} color="#fff" marginLeft={10} marginTop={5} />
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                    <View style={styles.heartContainer}>
                        <Icon name="heart-o" size={20} color="#f79c57" />
                        <Text style={styles.iconNumber}>0</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationIcon}>
                        <Icon name="bell-o" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                <Text style={styles.sectionTitleTop}>Trending Recipes</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipeContainer}>
                    {[ 
                        { id: 1, title: "Lasagna", image: require("../assets/lasagna.png"), time: "45min", likes: "6.12k" },
                        { id: 2, title: "Korean Spicy Noodles", image: require("../assets/spicy-noodles.png"), time: "25min", likes: "5.34k" },
                        { id: 3, title: "Pancakes", image: require("../assets/pancakes.png"), time: "30min", likes: "2.99k" },
                        { id: 4, title: "Lasagna", image: require("../assets/lasagna.png"), time: "45min", likes: "6.12k" },
                        { id: 5, title: "Korean Spicy Noodles", image: require("../assets/spicy-noodles.png"), time: "25min", likes: "5.34k" },
                        { id: 6, title: "Pancakes", image: require("../assets/pancakes.png"), time: "30min", likes: "2.99k" }
                    ].map((recipe, index) => (
                        <View key={recipe.id} style={styles.recipeCard}>
                            <View>
                                <Image
                                    source={recipe.image}
                                    style={styles.recipeImage}
                                />
                                <Text style={styles.recipeTime}>{recipe.time}</Text>
                                <TouchableOpacity style={styles.heartIcon} onPress={() => toggleHeart(index)}>
                                    <Icon
                                        name={heartStates[index] ? "heart" : "heart-o"}
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.recipeInfo}>
                                <View style={styles.recipeMeta}>
                                    <Icon name="heart" size={15} color="#fff" style={styles.filledHeart} />
                                    <Text style={styles.likes}>{recipe.likes}</Text>
                                    <Icon name="user" size={15} color="#fff" style={styles.userIcon} />
                                </View>
                                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>Add to Meal Plan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Categories</Text>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {Array.from({ length: Math.ceil(categories.length / 8) }, (_, pageIndex) => (
                        <View key={pageIndex} style={[styles.categoryPage, { width }]}>
                            {categories.slice(pageIndex * 8, pageIndex * 8 + 8).map((category) => (
                                <View key={category.id} style={styles.categoryItem}>
                                    <Image source={category.image} style={styles.categoryImage} />
                                    <Text style={styles.categoryText}>{category.name}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Breakfast</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipeContainer}>
                    {[ 
                        { id: 1, title: "Tapsilog", image: require("../assets/tapsilog.png"), time: "25min", likes: "4.2kk" },
                        { id: 2, title: "Pancakes", image: require("../assets/pancakes.png"), time: "45min", likes: "2.99k" },
                        { id: 3, title: "Caesar Salad", image: require("../assets/caesar-salad.png"), time: "15min", likes: "2.34k" },
                        { id: 4, title: "Tapsilog", image: require("../assets/tapsilog.png"), time: "25min", likes: "4.2kk" },
                        { id: 5, title: "Pancakes", image: require("../assets/pancakes.png"), time: "45min", likes: "2.99k" },
                        { id: 6, title: "Caesar Salad", image: require("../assets/caesar-salad.png"), time: "15min", likes: "2.34k" }
                    ].map((recipe, index) => (
                        <View key={recipe.id} style={styles.recipeCard}>
                            <View>
                                <Image
                                    source={recipe.image}
                                    style={styles.recipeImage}
                                />
                                <Text style={styles.recipeTime}>{recipe.time}</Text>
                                <TouchableOpacity style={styles.heartIcon} onPress={() => toggleHeart(index)}>
                                    <Icon
                                        name={heartStates[index] ? "heart" : "heart-o"}
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.recipeInfo}>
                                <View style={styles.recipeMeta}>
                                    <Icon name="heart" size={15} color="#fff" style={styles.filledHeart} />
                                    <Text style={styles.likes}>{recipe.likes}</Text>
                                    <Icon name="user" size={15} color="#fff" style={styles.userIcon} />
                                </View>
                                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>Add to Meal Plan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Lunch</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipeContainer}>
                    {[ 
                        { id: 1, title: "Korean Fried Chicken", image: require("../assets/korean-fried-chicken.png"), time: "1hr 30min", likes: "10.77k" },
                        { id: 2, title: "Chicken Adobo", image: require("../assets/adobo.png"), time: "1hr 30min", likes: "9.42" },
                        { id: 3, title: "Lumpia", image: require("../assets/lumpia.png"), time: "30min", likes: "9.01k" },
                        { id: 4, title: "Korean Fried Chicken", image: require("../assets/korean-fried-chicken.png"), time: "1hr 30min", likes: "10.77k" },
                        { id: 5, title: "Chicken Adobo", image: require("../assets/adobo.png"), time: "1hr 30min", likes: "9.42" },
                        { id: 6, title: "Lumpia", image: require("../assets/lumpia.png"), time: "30min", likes: "9.01k" }
                    ].map((recipe, index) => (
                        <View key={recipe.id} style={styles.recipeCard}>
                            <View>
                                <Image
                                    source={recipe.image}
                                    style={styles.recipeImage}
                                />
                                <Text style={styles.recipeTime}>{recipe.time}</Text>
                                <TouchableOpacity style={styles.heartIcon} onPress={() => toggleHeart(index)}>
                                    <Icon
                                        name={heartStates[index] ? "heart" : "heart-o"}
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.recipeInfo}>
                                <View style={styles.recipeMeta}>
                                    <Icon name="heart" size={15} color="#fff" style={styles.filledHeart} />
                                    <Text style={styles.likes}>{recipe.likes}</Text>
                                    <Icon name="user" size={15} color="#fff" style={styles.userIcon} />
                                </View>
                                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>Add to Meal Plan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Dinner</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipeContainer}>
                    {[ 
                        { id: 1, title: "Honey Grilled Chicken", image: require("../assets/honey-grill.png"), time: "1hr 45min", likes: "8.81k" },
                        { id: 2, title: "Balsamic Chicken Salad", image: require("../assets/balsamic.png"), time: "40min", likes: "7.97k" },
                        { id: 3, title: "Mexican Fish Tacos", image: require("../assets/fish-tacos.png"), time: "45min", likes: "7.22k" },
                        { id: 4, title: "Honey Grilled Chicken", image: require("../assets/honey-grill.png"), time: "1hr 45min", likes: "8.81k" },
                        { id: 5, title: "Balsamic Chicken Salad", image: require("../assets/balsamic.png"), time: "40min", likes: "7.97k" },
                        { id: 6, title: "Mexican Fish Tacos", image: require("../assets/fish-tacos.png"), time: "45min", likes: "7.22k" }
                    ].map((recipe, index) => (
                        <View key={recipe.id} style={styles.recipeCard}>
                            <View>
                                <Image
                                    source={recipe.image}
                                    style={styles.recipeImage}
                                />
                                <Text style={styles.recipeTime}>{recipe.time}</Text>
                                <TouchableOpacity style={styles.heartIcon} onPress={() => toggleHeart(index)}>
                                    <Icon
                                        name={heartStates[index] ? "heart" : "heart-o"}
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.recipeInfo}>
                                <View style={styles.recipeMeta}>
                                    <Icon name="heart" size={15} color="#fff" style={styles.filledHeart} />
                                    <Text style={styles.likes}>{recipe.likes}</Text>
                                    <Icon name="user" size={15} color="#fff" style={styles.userIcon} />
                                </View>
                                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>Add to Meal Plan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Best recipes from</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.userContainer}
                >
                    {users.map((user) => (
                        <View key={user.id} style={styles.userCard}>
                            <Image source={user.image} style={styles.userImage} />
                            <Text style={styles.userName}>{user.name}</Text>
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Snacks</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipeContainer}>
                    {[ 
                        { id: 1, title: "Honey Grilled Chicken", image: require("../assets/honey-grill.png"), time: "1hr 45min", likes: "8.81k" },
                        { id: 2, title: "Balsamic Chicken Salad", image: require("../assets/balsamic.png"), time: "40min", likes: "7.97k" },
                        { id: 3, title: "Mexican Fish Tacos", image: require("../assets/fish-tacos.png"), time: "45min", likes: "7.22k" },
                        { id: 4, title: "Honey Grilled Chicken", image: require("../assets/honey-grill.png"), time: "1hr 45min", likes: "8.81k" },
                        { id: 5, title: "Balsamic Chicken Salad", image: require("../assets/balsamic.png"), time: "40min", likes: "7.97k" },
                        { id: 6, title: "Mexican Fish Tacos", image: require("../assets/fish-tacos.png"), time: "45min", likes: "7.22k" }
                    ].map((recipe, index) => (
                        <View key={recipe.id} style={styles.recipeCard}>
                            <View>
                                <Image
                                    source={recipe.image}
                                    style={styles.recipeImage}
                                />
                                <Text style={styles.recipeTime}>{recipe.time}</Text>
                                <TouchableOpacity style={styles.heartIcon} onPress={() => toggleHeart(index)}>
                                    <Icon
                                        name={heartStates[index] ? "heart" : "heart-o"}
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.recipeInfo}>
                                <View style={styles.recipeMeta}>
                                    <Icon name="heart" size={15} color="#fff" style={styles.filledHeart} />
                                    <Text style={styles.likes}>{recipe.likes}</Text>
                                    <Icon name="user" size={15} color="#fff" style={styles.userIcon} />
                                </View>
                                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>Add to Meal Plan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Desserts</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipeContainer}>
                    {[ 
                        { id: 1, title: "Honey Grilled Chicken", image: require("../assets/honey-grill.png"), time: "1hr 45min", likes: "8.81k" },
                        { id: 2, title: "Balsamic Chicken Salad", image: require("../assets/balsamic.png"), time: "40min", likes: "7.97k" },
                        { id: 3, title: "Mexican Fish Tacos", image: require("../assets/fish-tacos.png"), time: "45min", likes: "7.22k" },
                        { id: 4, title: "Honey Grilled Chicken", image: require("../assets/honey-grill.png"), time: "1hr 45min", likes: "8.81k" },
                        { id: 5, title: "Balsamic Chicken Salad", image: require("../assets/balsamic.png"), time: "40min", likes: "7.97k" },
                        { id: 6, title: "Mexican Fish Tacos", image: require("../assets/fish-tacos.png"), time: "45min", likes: "7.22k" }
                    ].map((recipe, index) => (
                        <View key={recipe.id} style={styles.recipeCard}>
                            <View>
                                <Image
                                    source={recipe.image}
                                    style={styles.recipeImage}
                                />
                                <Text style={styles.recipeTime}>{recipe.time}</Text>
                                <TouchableOpacity style={styles.heartIcon} onPress={() => toggleHeart(index)}>
                                    <Icon
                                        name={heartStates[index] ? "heart" : "heart-o"}
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.recipeInfo}>
                                <View style={styles.recipeMeta}>
                                    <Icon name="heart" size={15} color="#fff" style={styles.filledHeart} />
                                    <Text style={styles.likes}>{recipe.likes}</Text>
                                    <Icon name="user" size={15} color="#fff" style={styles.userIcon} />
                                </View>
                                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>Add to Meal Plan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingBottom: 70, 
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        paddingTop: 35,
        backgroundColor: "#f79c57",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 5,
    },
    heartContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginRight: 15,
    },
    iconNumber: {
        color: "#f79c57",
        marginLeft: 5,
    },
    notificationIcon: {
        padding: 7,
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: "#f79c57",
        paddingHorizontal: 20,
        marginTop: 40,
        marginBottom: 10,
    },

    sectionTitleTop: {
        fontSize: 24,
        fontWeight: '900',
        color: "#f79c57",
        paddingHorizontal: 20,
        marginTop: 25,
        marginBottom: 10,
    },
    recipeContainer: {
        paddingHorizontal: 5,
        paddingRight: 40,
        marginLeft: 20,
        marginTop: 10,
        
    },
    recipeCard: {
        backgroundColor: "#5b4637",
        borderRadius: 10,
        marginRight: 20,
        width: 230,
        overflow: "hidden",
        elevation: 5,

    },
    recipeImage: {
        width: "100%",
        height: 230,
    },
    recipeTime: {
        position: "absolute",
        bottom: 10,
        left: 10,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        color: "#fff",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 5,
        fontSize: 14,
    },
    heartIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 5,
        borderRadius: 20,
    },
    recipeInfo: {
        padding: 10,
    },
    recipeMeta: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    filledHeart: {
        marginRight: 5,
    },
    likes: {
        color: "#fff",
        marginRight: 15,
    },
    userIcon: {
        marginLeft: "auto",
        marginRight: 10,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 40,
    },
    addButton: {
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingVertical: 5,
        alignItems: "center",
    },
    addButtonText: {
        color: "#5b4637",
        fontWeight: "bold",
    },

    categoriesContainer: {

    },

    categoryPage: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: width, // Width matches screen to prevent extra items
        justifyContent: "space-between",
        paddingHorizontal: 15, // Added padding for spacing
    },

    categoryItem: {
        width: (width - 60) / 4, // Four items per row
        height: 80,
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "#f2f2f2", // matches container background to reduce visible border
    },

    categoryImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: "#f79c57",
        backgroundColor: "#f2f2f2",
    },

    categoryText: {
        fontSize: 12,
        color: "#5b4637",
        textAlign: "center",
        fontWeight: "600",
    },
    userContainer: {
        paddingHorizontal: 20,
        marginVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 8, // Add spacing between user cards
    },
    
    userCard: {
        alignItems: "center",
        marginRight: 15,
    },
    
    userImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: "#f79c57",
        backgroundColor: "#f2f2f2",
    },
    
    userName: {
        marginTop: 5,
        fontSize: 14,
        color: "#5b4637",
        fontWeight: "bold",
        textAlign: "center",
    },
    
});

export default HomeScreen;
