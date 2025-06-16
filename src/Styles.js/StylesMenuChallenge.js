import { StyleSheet, TouchableOpacity } from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

export default StyleSheet.create({
    imageAjust: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    
    rankingIcon: {
        position: "absolute",
        width: 125,
        height: 125,
        bottom: 680,
        left: 264,
    },
    rankingIconImage: {
        width: 125,
        height: 125,
    },
    boxImageBoss: {
        width: wp('60%'), 
        height: wp('52%'),
        position: 'absolute',
        resizeMode: 'contain',
        top: hp('15%'),
        transform: [{ scale: 1.2 }],
    },
    boxLastDay: {
        top: -35,
        height: 200,
        width: 150,
        alignItems: 'center',
    },
    lastDayClosed: {
        opacity: 0.3,
    },
    boxImageImage: {
        height: 100,
        width: 175,
        flex: 1,
        
    },
    boxImageButton: {
        height: 135,
        width: 135,
        alignItems: 'center',
        justifyContent: 'center',
    },
    faseIcon: {
        position: 'relative',
        bottom: 62
    },
    faseIconImage: {
        height: 50,
        width: 50,
        position: 'absolute',
    },
    centerFaseIcon: {
        marginTop: hp('40%'),
        marginRight: 100,
    },
    rightFaseIcon: {
        right:45,
        bottom:40,
    },
    leftFaseIcon: {
        left: 10,
        bottom:35,
    },
    activeIcon: {
        marginTop: 10,
    },
    faseIconText: {
        height: 45,
        width: 50,
        position: 'absolute',
        textAlign: 'center',
        verticalAlign: "middle",
        color: '#ffffff',
        fontSize: 12,
        fontFamily: 'Inder_400Regular',
    },
    divTela: {
        height: 'auto',
        width: 'auto',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: hp('5%'),

    },
    rotatedFase: {
        transform: [{ rotateY: '180deg' }],
    },
    bottomPierLeft: {
        position: 'absolute',
        right: wp('50%'),
        bottom: hp('33%'),
        transform: [{ scale: height > 800 ? 0.9 : height < 700 ? 0.7 : 1 }],
    },
    bottomPierRight: {
        position: 'absolute',
        left: wp('50%'),
        bottom: hp('32%'),
        transform: [{ scale: height > 800 ? 0.9 : height < 700 ? 0.7 : 1 }],
        
    },
    centerPierLeft: {
        position: 'absolute',
        right: wp('40%'),
        bottom: hp('45%'),
        transform: [{ scale: height > 800 ? 0.8 : height < 700 ? 0.6 : 1 }],
    },
    centerPierRight: {
        position: 'absolute',
        left: wp('40%'),
        bottom: hp('45%'),
        transform: [{ scale: height > 800 ? 0.8 : height < 700 ? 0.6 : 1 }],
    },
    topPierLeft: {
        position: 'absolute',
        right: wp('32%'),
        bottom: hp('55%'),
        transform: [{ scale: height > 800 ? 0.7 : height < 700 ? 0.5 : 1 }],
    },
    topPierRight: {
        position: 'absolute',
        left: wp('32%'),
        bottom: hp('55%'),
        transform: [{ scale: height > 800 ? 0.7 : height < 700 ? 0.5 : 1 }],
    },
});