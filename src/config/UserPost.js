import { USERS } from "./Users";

export const USER_POST = [
  {
    imageURL:
      "https://instagram.fidr2-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/244783860_3098245833770480_3222705515879744561_n.webp.jpg?_nc_ht=instagram.fidr2-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=0nQh190QmwMAX9K80mE&edm=AP_V10EBAAAA&ccb=7-4&oh=9d5535cacab7f7eb86905a69f63d1840&oe=6186C9D4&_nc_sid=4f375e",
    user: USERS[0].user,
    likes: 74,
    profile_picture: USERS[0].image,
    caption: "Beyond the universe...🍁✨🔭",
    comments: [
      {
        user: "john",
        comment: "Nice Picture😉🔥",
      },
      {
        user: "cody",
        comment: "Awesome😉",
      },
    ],
  },
  {
    imageURL:
      "https://instagram.fidr2-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/247348601_406037877741322_5824403892907435258_n.jpg?_nc_ht=instagram.fidr2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=CUeLq2EiGKYAX83iqoT&edm=AP_V10EBAAAA&ccb=7-4&oh=fee0dcab88963f7504982b8556cdc47f&oe=6185E861&_nc_sid=4f375e",
    user: USERS[1].user,
    likes: 624,
    profile_picture: USERS[1].image,
    caption: `Shall we dance?\nThis #HubbleFriday image shows a pair of interacting galaxies called Arp 86 locked in a cosmic dance`,
    comments: [
      {
        user: "samueldim",
        comment: "left me speechless🙌",
      },
      {
        user: `micahluciani`,
        comment: `smashed it 🤩🤩`,
      },
    ],
  },
];
