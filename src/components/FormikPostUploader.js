import React from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { PLACEHOLDER_IMG } from "../assets/assets";
import validUrl from "valid-url";
import { Divider, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { db, firebase } from "../config/firebase";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the character limit"),
});

const FormikPostUploader = () => {
  const navigation = useNavigation();

  const [thumbnailUrl, setThumbnailUrl] = React.useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = React.useState(null);

  const getUserName = () => {
    const user = firebase.auth().currentUser;
    const unSubscribe = db
      .collection("users")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        })
      );

    return unSubscribe;
  };

  React.useEffect(() => {
    getUserName();
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unSubscribe = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());

    return unSubscribe;
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        values,
        errors,
      }) => (
        <>
          <View style={styles.container}>
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <TextInput
                style={{ color: "#fff", fontSize: 15 }}
                placeholderTextColor="gray"
                placeholder="Write a caption..."
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider
            orientation={"vertical"}
            style={{ marginTop: 15, marginHorizontal: 5 }}
          />

          <View style={{ marginTop: 2, marginHorizontal: 2 }}>
            <TextInput
              onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
              style={{ color: "#fff", fontSize: 15 }}
              placeholderTextColor="gray"
              placeholder="Enter Image Url"
              onChangeText={handleChange("imageUrl")}
              onBlur={handleBlur("imageUrl")}
              value={values.imageUrl}
            />
          </View>
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: "red", marginHorizontal: 5 }}>
              {errors.imageUrl}
            </Text>
          )}
          <View style={{ marginTop: 15 }}>
            <Button
              onPress={handleSubmit}
              buttonStyle={styles.btn}
              titleStyle={styles.titleTxt}
              title="Share"
              disabled={!isValid}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 5,
    marginTop: 15,
  },
  btn: {
    height: 35,
    width: "100%",
    justifyContent: "center",
    borderRadius: 6,
    marginHorizontal: 5,
    alignSelf: "center",
    backgroundColor: "#7080FA",
  },
  titleTxt: {
    fontSize: 15,
  },
  image: { width: 100, height: 100, borderRadius: 10 },
});

export default FormikPostUploader;
