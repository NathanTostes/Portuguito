import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get("window")

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        backgroundColor: "#D2D0FA",
        alignItems:'center',
        minHeight: height<700 ? height+200:null,
        paddingTop: '10%',
    },
    button: {
        position:  'absolute',
        bottom: 0,
        backgroundColor: "#FF6F6F",
        paddingVertical: 15,
        paddingHorizontal: 45,
        borderRadius: 10,
        marginBottom: 30,
        
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    profilesContainer: {
        flexDirection: 'row',
        width: '90%',
    },
    profileContainer: {
        width: width * 0.45,
        transform: width<360?[{scale: 0.9}]: [{scale:1}],
        marginTop: 10,
        alignItems: 'center',
    },
    backgroundUser: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginBottom: 10,
        borderColor: '#ff8c90',
        borderWidth: 4,
        overflow: 'hidden',
        backgroundColor: '#00000000',
    },
    selectedProfile: {
        borderColor: "#2cc21b",
    },
    image: {
        width: null,
        height: 'auto',
        flex: 1,
        resizeMode: "cover"
    },
    selectIconFrame: {
        zIndex: 1,
        position: 'absolute',
        bottom: 36,
        right: 20,
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: "#2cc21b",
    },
    selectIcon: {
        color: "#FFFFFF",
        fontSize: 20,
        padding: 5,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        borderRadius: 75,
    },
    profileText: {
        color: "#FFFFFF",
        fontSize: 20,
        width:width < 360? width*0.315 : null, 
        fontWeight: "bold",
    },
    textContainer: {
        flexDirection: 'row',
    },
    infoButton: {
        top: 3,
        marginLeft: width<360? 0:4,
        height: 22,
        width: 22,
        borderRadius: 11,
        backgroundColor: "#1176fa",
    },
    infoIcon: {
        color: "#FFFFFF",
        fontSize: 18,
        padding: 2.5,
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
})