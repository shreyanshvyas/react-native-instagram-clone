import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Divider } from "react-native-elements";

export const bottomTabIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/search--v1.png",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/instagram-reel.png",
  },
  {
    name: "Shop",
    active:
      "https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png",
  },
  {
    name: "Profile",
    active:
      "https://instagram.fidr2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/248171986_682869102620374_3915756377499108639_n.jpg?_nc_ht=instagram.fidr2-1.fna.fbcdn.net&_nc_ohc=9NL70bvuV0UAX-gGXe9&edm=ALbqBD0BAAAA&ccb=7-4&oh=41e69418da741c15939e3b3e738184dc&oe=61876105&_nc_sid=9a90d6",

    inactive:
      "https://instagram.fidr2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/248171986_682869102620374_3915756377499108639_n.jpg?_nc_ht=instagram.fidr2-1.fna.fbcdn.net&_nc_ohc=9NL70bvuV0UAX-gGXe9&edm=ALbqBD0BAAAA&ccb=7-4&oh=41e69418da741c15939e3b3e738184dc&oe=61876105&_nc_sid=9a90d6",
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = React.useState("Home");

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name === "Profile" ? styles.profilePic() : null,
          activeTab === "Profile" && icon.name === activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={0.2} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    height: "8%",
    bottom: "0%",
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    paddingTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profilePic: (activeTab = "") => ({
    borderRadius: 50,
    borderColor: "#ffffff",
    borderWidth: activeTab === "Profile" ? 2 : 0,
  }),
});

export default BottomTabs;
