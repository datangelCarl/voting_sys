// src/screens/HomeScreen.js
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Fingerprint, User, Users,ChartColumn} from "lucide-react-native";
import logo from "../assets/votexmlogo.png";
import styles from "../styles/homepage.js";

const HomeScreen = () => {
  const navigation = useNavigation();

  const candidates = [
    { id: 1, name: "Candidate No. 1", votes: 100, percent: 0.8 },
    { id: 2, name: "Candidate No. 2", votes: 100, percent: 0.7 },
    { id: 3, name: "Candidate No. 3", votes: 100, percent: 0.95 },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.menu}>☰</Text>
      </View>

      {/* Welcome */}
      <Text style={styles.welcome}>WELCOME, USER!</Text>

      {/* Election Info */}
      <View style={styles.electionCard}>
        <Text style={styles.electionText}>
          COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING{"\n"}
          <Text style={{ fontWeight: "bold" }}>2025 ELECTIONS</Text> 01/01/25 10:00:00
        </Text>
        <Text style={styles.logoEmoji}>🎯</Text>
      </View>

      {/* Candidates */}
      <View style={styles.candidateCard}>
        {candidates.map((c) => (
          <View key={c.id} style={styles.candidate}>
          <View style={styles.avatar}>
            <User style={styles.candidateAvatar} size={35}/>
          </View>
            <View style={styles.info}>
              <Text style={styles.candidateName}>{c.name}</Text>
              <Text style={styles.voteText}>{c.votes} Votes</Text>
              <ProgressBar
                progress={c.percent}
                color="#FFD700"
                style={styles.progress}
              />
              <Text style={styles.percentage}>{(c.percent * 100).toFixed(2)}%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Vote Now Button */}
      <TouchableOpacity style={styles.voteNow}>
      <Fingerprint style={styles.voteLogo} size={50}/>
        <Text style={styles.voteTextBtn}>VOTE NOW!</Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity style={[styles.navBtn, { backgroundColor: "#32CD32" }]}>
        <ChartColumn style={styles.viewCandidates} size={25}/>
          <Text style={styles.navText}>Results</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtn, { backgroundColor: "#002F6C" }]}>
        <Users style={styles.viewCandidates} size={25}/>
          <Text style={[styles.navText, { color: "#fff" }]}>Candidates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtn, { backgroundColor: "#C0392B" }]}>
           <User style={styles.viewProf} size={25}/>
          <Text style={styles.navText}>View Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>2025 © Votex Solutions</Text>
    </ScrollView>
  );
};

export default HomeScreen;
