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
import { firebase } from "../config/firebase";

const Login = () => {
  const navigation = useNavigation();
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required."),
    password: Yup.string()
      .required()
      .min(6, "Your Password have at least 6 characters"),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Firebase logged in successfully", email, password);
    } catch (error) {
      Alert.alert("Something went wrong!", error.message, [
        { text: "OK", onPress: () => console.log("OK"), style: "cancel" },
        { text: "Sign Up", onPress: () => navigation.navigate("SignUp") },
      ]);
      console.log("Something went wrong...");
    }
  };

  return (
    <React.Fragment>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#fff" }}
        edges={["right", "bottom", "top", "left"]}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginFormSchema}
          validateOnMount={true}
          onSubmit={(values) => {
            onLogin(values.email, values.password);
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
                      values.email.length < 1 ||
                      Validator.validate(values.email)
                        ? "#FAFAFA"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholder="Phone number, username or email"
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
              <View
                style={{
                  alignItems: "flex-end",
                  marginHorizontal: 22,
                }}
              >
                <TouchableOpacity>
                  <Text style={{ color: "#6BB0F5", fontWeight: "bold" }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginHorizontal: 22, marginTop: 10 }}>
                <Button
                  title="Log In"
                  buttonStyle={styles.button(isValid)}
                  titleStyle={styles.titleTxt}
                  onPress={handleSubmit}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              >
                <Text style={{ fontWeight: "500" }}>
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={{ color: "#6BB0F5", fontWeight: "bold" }}>
                    {" "}
                    Sign Up
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
  container: {
    flex: 1,
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
  },
  titleTxt: {
    fontSize: 15,
  },
  inputText: {
    marginLeft: 8,
  },
  divider1: { marginRight: 208, marginLeft: 22, bottom: 8 },
  divider2: { marginLeft: 208, marginRight: 22, top: 8 },
  loginHelpCont: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  signUpContText: {
    fontSize: 11.8,
    color: "#060E47",
    fontWeight: "900",
  },
  signUpContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  fbContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
});

export default Login;
