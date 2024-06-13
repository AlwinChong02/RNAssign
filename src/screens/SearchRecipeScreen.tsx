import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setCLicked, navigation }: any) => {


    return (
        <View style={styles.container}>
            <View
                style={
                    clicked
                        ? styles.searchBar__clicked
                        : styles.searchBar__unclicked
                }
            >
                {/* search Icon */}
                <MaterialIcons name="search" size={20} color="black" style={{ marginLeft: 1 }} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    onFocus={() => {
                        setCLicked(true);
                    }}
                />
                {/* cross Icon, depending on whether the search bar is clicked or not */}
                {clicked && (
                    <MaterialIcons name="close" size={20} color="black" style={{ padding: 1 }} onPress={() => { setSearchPhrase("") }} />
                )}
            </View>
            {/* cancel button, depending on whether the search bar is clicked or not */}
            {clicked && (
                <View>
                    <Button
                        title="Cancel"
                        onPress={() => {
                            Keyboard.dismiss();
                            setCLicked(false);
                            // navigate back to previous screen
                            navigation.goBack();

                        }}
                    ></Button>
                </View>
            )}
        </View>
    );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",

    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
});