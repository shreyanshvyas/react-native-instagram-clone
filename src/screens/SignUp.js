import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { instaMainLogo } from "../assets/assets";
import { Button } from "react-native-elements";
import * as Yup from "yup";
import { Formik } from "formik";
import Validator from "email-validator";
import { useNavigation } from "@react-navigation/native";
import { db, firebase } from "../config/firebase";

const SignUp = () => {
  const navigation = useNavigation();

  const SignUpFormSchema = Yup.object().shape({
    username: Yup.string().required().min(2, "A username is required"),
    email: Yup.string().email().required("An email is required."),
    password: Yup.string()
      .required()
      .min(6, "Your Password have at least 6 characters"),
  });

  const getRandomPic = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignUp = async (username, email, password) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      db.collection("users")
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          username: username,
          email: authUser.user.email,
          profile_picture: await getRandomPic(),
        });
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Something went wrong!", error.message, [
        { text: "OK", onPress: () => console.log("OK"), style: "cancel" },
      ]);
      console.log("Something went wrong...");
    }
  };

  return (
    <React.Fragment>
      <SafeAreaView
        style={styles.container}
        edges={["right", "bottom", "left", "top"]}
      >
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={SignUpFormSchema}
          validateOnMount={true}
          onSubmit={(values) => {
            onSignUp(values.username, values.email, values.password);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <SvgXml xml={instaMainLogo} />
              </View>

              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      1 > values.username.length || values.username.length >= 2
                        ? "#FAFAFA"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#444"
                  autoCapitalize="none"
                  textContentType="username"
                  autoFocus={true}
                  style={styles.inputText}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
              </View>
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      values.email.length < 1 ||
                      Validator.validate(values.email)
                        ? "#FAFAFA"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#444"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  style={styles.inputText}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      1 > values.password.length || values.password.length >= 6
                        ? "#FAFAFA"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#444"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType="password"
                  style={styles.inputText}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>

              <View style={styles.buttonView}>
                <Button
                  title="Sign Up"
                  buttonStyle={styles.button(isValid)}
                  titleStyle={styles.titleTxt}
                  onPress={handleSubmit}
                />
              </View>
              <View style={styles.loginTagLine}>
                <Text style={{ fontWeight: "500" }}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={{ color: "#6BB0F5", fontWeight: "bold" }}>
                    {" "}
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  titleTxt: {
    fontSize: 15,
  },
  inputText: {
    marginLeft: 8,
  },
  buttonView: { marginHorizontal: 22, marginTop: 10 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginTagLine: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40%",
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#318bfb" : "#9ACAF7",
    height: 47,
    width: "100%",
    justifyContent: "center",
    borderRadius: 1,
    alignSelf: "center",
  }),
  inputField: {
    borderRadius: 4,
    padding: 12,
    marginHorizontal: 22,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 0.5,
  },
});

export default SignUp;
