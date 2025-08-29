import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, Dimensions } from "react-native";
import { useAuthStore } from "../store/authStore";
//import { useAuthStore } from "../stores/authStore";

const { width } = Dimensions.get("window");

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [animValue] = useState(new Animated.Value(0));

  const login = useAuthStore((s) => s.login);

  const switchTab = (tab: "login" | "signup") => {
    setActiveTab(tab);
    Animated.spring(animValue, {
      toValue: tab === "login" ? 0 : -width,
      useNativeDriver: true,
    }).start();
  };

  // local state for inputs
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPass, setSignupPass] = useState("");

  const handleLogin = () => {
    // here normally call API
    login({
      user: { id: "1", name: "Demo User", email: loginEmail },
      role: "patient",
      token: "dummy-token",
    });
  };

  const handleSignup = () => {
    // normally call API
    login({
      user: { id: "2", name: signupName, email: signupEmail },
      role: "patient",
      token: "dummy-token",
    });
  };

  return (
    <View className="flex-1 bg-white justify-center items-center px-4">
      {/* Logo / Title */}
      <Text className="text-2xl font-bold mb-6">DocConnect</Text>

      {/* Tabs */}
      <View className="flex-row bg-gray-200 rounded-full p-1 mb-4">
        <TouchableOpacity
          className={`flex-1 py-2 rounded-full ${activeTab === "login" ? "bg-blue-500" : ""}`}
          onPress={() => switchTab("login")}
        >
          <Text className={`text-center ${activeTab === "login" ? "text-white font-bold" : "text-black"}`}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2 rounded-full ${activeTab === "signup" ? "bg-blue-500" : ""}`}
          onPress={() => switchTab("signup")}
        >
          <Text className={`text-center ${activeTab === "signup" ? "text-white font-bold" : "text-black"}`}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sliding Container */}
      <Animated.View
        style={{
          flexDirection: "row",
          width: width * 2,
          transform: [{ translateX: animValue }],
        }}
      >
        {/* Login Form */}
        <View style={{ width, padding: 16 }}>
          <TextInput
            placeholder="Email"
            value={loginEmail}
            onChangeText={setLoginEmail}
            className="border p-3 rounded mb-3"
          />
          <TextInput
            placeholder="Password"
            value={loginPass}
            onChangeText={setLoginPass}
            secureTextEntry
            className="border p-3 rounded mb-3"
          />
          <TouchableOpacity className="bg-blue-500 p-3 rounded" onPress={handleLogin}>
            <Text className="text-white text-center font-bold">Login</Text>
          </TouchableOpacity>
        </View>

        {/* Signup Form */}
        <View style={{ width, padding: 16 }}>
          <TextInput
            placeholder="Name"
            value={signupName}
            onChangeText={setSignupName}
            className="border p-3 rounded mb-3"
          />
          <TextInput
            placeholder="Email"
            value={signupEmail}
            onChangeText={setSignupEmail}
            className="border p-3 rounded mb-3"
          />
          <TextInput
            placeholder="Password"
            value={signupPass}
            onChangeText={setSignupPass}
            secureTextEntry
            className="border p-3 rounded mb-3"
          />
          <TouchableOpacity className="bg-blue-500 p-3 rounded" onPress={handleSignup}>
            <Text className="text-white text-center font-bold">Signup</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default AuthScreen;
