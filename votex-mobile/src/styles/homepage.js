// src/styles/HomeStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  menu: {
    fontSize: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
    color: "#002F6C",
  },
  electionCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#002F6C",
  },
  electionText: {
    color: "#002F6C",
    fontWeight: "600",
    flex: 1,
  },
  logoEmoji: {
    fontSize: 30,
    marginLeft: 10,
  },
  candidateCard: {
    backgroundColor: "#002F6C",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  candidate: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  candidateAvatar: {
     color:"#fff",
     position: "relative",
     left: 8,
     top: 7,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#FFD700",
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  candidateName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  voteText: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 5,
  },
  progress: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ddd",
  },
  percentage: {
    color: "#fff",
    fontSize: 12,
    textAlign: "right",
  },
  voteNow: {
    backgroundColor: "#FFD700",
    padding: 1,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  voteTextBtn: {
    fontSize: 30,
    fontWeight: "bold",
    position: "relative",
    top: -25,
    left: 20,
    marginLeft: 30,
    color: "#fff",
    textShadowColor: "#808080", // shadow color
    textShadowOffset: { width: 1.5, height: 1 }, // X and Y offset
    textShadowRadius: 8, // blur radius
  },
  voteLogo: {
     color:"#fff",
     position: "relative",
     right: 90,
     top: 20,
  },
  viewProf: {
    color:"#fff",
    position: "relative",
    top: -2,
 },
 viewCandidates: {
    color:"#fff",
    position: "relative",
    top: -2,
 },
 viewResults: {
    color:"#fff",
    position: "relative",
    top: -2,
 },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  navBtn: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  footer: {
    textAlign: "center",
    color: "#888",
    fontSize: 12,
    marginBottom: 50,
  },
});

export default styles;
