import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, getFirestore } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import Styles from "../Styles.js/StylesMenuChallenge";

export default function MenuChallenge() {
  const db = getFirestore(FIREBASE_APP);
  const auth = FIREBASE_AUTH;

  const navigation = useNavigation();

  const currentDay = (new Date()).getDay();
  const openedDays = [];

  for (let i = 0; i < 6; i++) {
    if (i === currentDay) {
      openedDays.push(true);
    } else {
      openedDays.push(false);
    }
  }

  const FaseIcon = ({ style, faseDay }) => {
    return (
      <View style={[Styles.faseIcon, style]}>
        <Image
          source={require("../Imagens/faseIcon.png")}
          style={Styles.faseIconImage}
        />
        <Text style={Styles.faseIconText}>{faseDay}</Text>
      </View>
    )
  }

  const LastDayOppened = ({  }) => {
    return (
      <TouchableOpacity
        style={Styles.boxLastDay}
        onPress={() =>
          navigation.navigate("IlhasChallenge", {
            screen: "IlhasChallenge",
            // params: { info: info, subTemaDoc: subTemaDoc },
          })
        }
      >
        <Image
          source={require("../Imagens/BarcoFinal.png")}
          style={Styles.boxImageBoss}
        />
        <FaseIcon
          style={Styles.centerFaseIcon}
          faseDay={7 + '°'}
        />
      </TouchableOpacity>
    );
  };

  const LastDayClosed = ({  }) => {
    return (
      <TouchableOpacity
        style={Styles.boxLastDay}
        activeOpacity={1}
      >
        <Image
          source={require("../Imagens/BarcoFinal.png")}
          style={[Styles.boxImageBoss, Styles.lastDayClosed]}
        />
      </TouchableOpacity>
    );
  };

  const OpenedDay = ({ index }) => {
    return (
      <TouchableOpacity
        style={Styles.boxImageButton}
        onPress={() =>
          navigation.navigate("IlhasChallenge", {
            screen: "IlhasChallenge",
            // params: { info: info, subTemaDoc: subTemaDoc },
          })
        }
      >
        {
          index % 2 === 0 ? (
            <>
              <Image
                source={require("../Imagens/BarcoEscuro.png")}
                style={[Styles.boxImageImage, Styles.rotatedFase]}
              />
              <FaseIcon
                style={Styles.leftFaseIcon}
                faseDay={(index + 1) + '°'}
              />
            </>
          ) : (
            <>
              <Image
                source={require("../Imagens/BarcoEscuro.png")}
                style={Styles.boxImageImage}
              />
              <FaseIcon
                style={Styles.rightFaseIcon}
                faseDay={(index + 1) + '°'}
              />
            </>
          )
        }
      </TouchableOpacity>
    );
  };

  const ClosedDay = ({ index }) => {
    return (
      <TouchableOpacity
        style={Styles.boxImageButton}
        activeOpacity={1}
      >
        {
          index % 2 === 0 ? (
            <>
              <Image
                source={require("../Imagens/BarcoEscuro.png")}
                style={[Styles.boxImageImage, Styles.rotatedFase]}
              />
              <FaseIcon
                style={Styles.leftFaseIcon}
                faseDay={(index + 1) + '°'}
              />
            </>
          ) : (
            <>
              <Image
                source={require("../Imagens/BarcoEscuro.png")}
                style={Styles.boxImageImage}
              />
              <FaseIcon
                style={Styles.rightFaseIcon}
                faseDay={(index + 1) + '°'}
              />
            </>
          )
        }
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      style={Styles.imageAjust}
      source={require("../Imagens/pier.png")}
      resizeMode="cover"
    >
      <View style={Styles.divTela}>
        {
          currentDay === 6 ? (
            <LastDayOppened />
          ) : (
            <LastDayClosed />
          )
        }
        {openedDays.map((isDayOpened, index) => {
          const getPositionFase = () => {
            switch (index) {
              case 0:
                return Styles.bottomPierLeft;
              case 1:
                return Styles.bottomPierRight;
              case 2:
                return Styles.centerPierLeft;
              case 3:
                return Styles.centerPierRight;
              case 4:
                return Styles.topPierLeft;
              default:
                return Styles.topPierRight;
            }
          }

          let style = getPositionFase();

          return (
            <View style={style}>
              {
                isDayOpened ? (
                  <OpenedDay index={index} />
                ) : (
                  <ClosedDay index={index} />
                )
              }
            </View>
          );
        })}
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}
