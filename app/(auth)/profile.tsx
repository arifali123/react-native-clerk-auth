import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { useUser } from "@clerk/clerk-expo";

const Profile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");

  const onSaveUser = async () => {
    try {
      await user.update({
        firstName,
        lastName,
      });
    } catch (e: any) {
      alert(e.errors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>
        Good morning {user?.firstName} {user?.lastName}!
      </Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.inputField}
        autoCapitalize="words"
        autoComplete="name-given"
        autoCorrect={false}
        keyboardType="default"
        returnKeyType="next"
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.inputField}
        autoCapitalize="words"
        autoComplete="name-family"
        autoCorrect={false}
        keyboardType="default"
        returnKeyType="done"
      />
      <Button onPress={onSaveUser} title="Update account" color={"#6c47ff"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default Profile;
