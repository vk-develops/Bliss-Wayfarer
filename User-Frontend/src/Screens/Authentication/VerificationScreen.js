import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { OtpInput } from "react-native-otp-entry";

const VerificationScreen = () => {
    const [otp, setOtp] = useState("");

    return (
        <View className="flex-1">
            <View className="m-4 pt-12">
                <Text
                    className="text-2xl text-headerColor-light"
                    style={{ fontFamily: "jakartaBold" }}
                >
                    Enter Your OTP
                </Text>
                <Text
                    className="text-base pt-4 text-paraColor-light"
                    style={{
                        fontFamily: "jakartaRegular",
                    }}
                >
                    An OTP has been sent to your mail ID for verfication
                    purposes, Please enter that OTP to continue!
                </Text>
                <View className="mt-10">
                    <OtpInput
                        numberOfDigits={6}
                        style={{
                            width: "100%",
                            height: 50,
                        }}
                        focusColor="#5a03d5"
                        focusStickBlinkingDuration={500}
                        theme={{
                            pinCodeTextStyle: { color: "#5a03d5" },
                            pinCodeContainerStyle: { borderColor: "#ccc" },
                        }}
                        onTextChange={(text) => console.log(text)}
                        onFilled={(text) => setOtp(text)}
                    />
                </View>
                <View className="flex items-center justify-end gap-[1px] flex-row mt-5">
                    <Text
                        className="text-paragraphColor text-base"
                        style={{ fontFamily: "jakartaRegular" }}
                    >
                        Did'nt recieve OTP ?{" "}
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("RegisterScreen")}
                        activeOpacity={0.7}
                    >
                        <Text
                            className="text-purple--800 text-base"
                            style={{
                                fontFamily: "jakartaSemiBold",
                            }}
                        >
                            Resend OTP
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default VerificationScreen;
