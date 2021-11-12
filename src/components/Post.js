import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-elements";
import {
  Entypo,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { firebase, db } from "../config/firebase";

const Post = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    );
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => {
        console.log("Document updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating document", error);
      });
  };

  return (
    <View style={{ marginBottom: "4%" }}>
      <Divider orientation="vertical" width={0.2} color="gray" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostFooter post={post} handleLike={handleLike} />
      <Likes post={post} />
      <Caption post={post} />
      <CommentSection post={post} />
      {/* <Comments post={post} /> */}
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View style={styles.postHeaderContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: post.profile_picture }}
          style={styles.postHeaderImg}
        />
        <Text style={styles.postHeaderText}>{post.user}</Text>
      </View>
      <View>
        <Entypo name="dots-three-vertical" size={15} color="#fff" />
      </View>
    </View>
  );
};

const PostImage = ({ post }) => {
  return (
    <View style={{ width: "100%", height: 450, marginTop: 8 }}>
      <Image
        source={{ uri: post.imageUrl }}
        style={{ resizeMode: "cover", height: "100%" }}
      />
    </View>
  );
};
const PostFooter = ({ handleLike, post }) => {
  return (
    <View
      style={{
        marginHorizontal: 5,
        marginTop: 8,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "27%",
        }}
      >
        <TouchableOpacity onPress={() => handleLike(post)}>
          <MaterialCommunityIcons
            name="heart-outline"
            color="#ffffff"
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            name="message-circle"
            color="#ffffff"
            size={30}
            style={{ transform: [{ rotateY: "180deg" }] }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="ios-paper-plane-outline"
            color="#ffffff"
            size={30}
            style={{ transform: [{ rotateZ: "20deg" }], marginTop: -2 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end", marginHorizontal: 5 }}>
        <TouchableOpacity>
          <Ionicons name="ios-bookmark-outline" color="#ffffff" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Likes = ({ post }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 5, marginHorizontal: 5 }}>
      <Text style={{ color: "#ffffff", fontWeight: "600" }}>
        {post.likes_by_users.length.toLocaleString("en")} likes
      </Text>
    </View>
  );
};

const Caption = ({ post }) => {
  return (
    <View style={{ marginTop: 5, marginHorizontal: 5 }}>
      <Text style={{ color: "#ffffff" }}>
        <Text style={{ fontWeight: "600" }}>{post.user}</Text>
        <Text> {post.caption}</Text>
      </Text>
    </View>
  );
};

const CommentSection = ({ post }) => {
  return (
    <View style={{ marginTop: 5, marginHorizontal: 5 }}>
      {!!post.comments.length && (
        <Text style={{ color: "gray" }}>
          View{post.comments.length > 1 ? " all" : ""} {post.comments.length}
          {post.comments.length > 1 ? " comments" : " comment"}
        </Text>
      )}
    </View>
  );
};

// const Comments = ({ post }) => {
//   return (
//     <>
//       {post.comments.map((comment, index) => (
//         <View
//           key={index}
//           style={{ flexDirection: "row", marginTop: 5, marginHorizontal: 5 }}
//         >
//           <Text style={{ color: "white", fontWeight: "100" }}>
//             <Text style={{ fontWeight: "bold" }}>{comment.user}</Text>{" "}
//             {comment.comment}
//           </Text>
//         </View>
//       ))}
//     </>
//   );
// };

const styles = StyleSheet.create({
  postHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  postHeaderText: {
    color: "#ffffff",
    fontWeight: "700",
    marginLeft: 10,
  },
  postHeaderImg: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
});

export default Post;
