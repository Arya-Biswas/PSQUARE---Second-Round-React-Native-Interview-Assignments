import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { colors, fonts, screenWidth } from '../../../helpers/constants/styles';
import FastImage from '@d11/react-native-fast-image';
import { ICON_NAMES } from '../../../helpers/constants/icons';
import { moderateScale } from 'react-native-size-matters';
import { HomeHeaderGrid, Text, Touchable } from '../../../components';
import Doctor from './components/Doctor';
import Vitamin from './components/Vitamin';

const HomeView = () => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex1}
    >
      <ScrollView
        style={styles.flex1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <View style={styles.rowHeader}>
            <View style={styles.header1}>
              <FastImage source={ICON_NAMES.burgerBar} resizeMode="contain" style={styles.burgerBar} />
              <FastImage source={ICON_NAMES.healthy} resizeMode="contain" style={styles.healthy} />
            </View>

            <View style={styles.micContainer}>
              <FastImage source={ICON_NAMES.mic} resizeMode="contain" style={styles.mic} />
            </View>
          </View>

          <HomeHeaderGrid />

          <View style={styles.uploadContainer}>
            <Text fontFamily={fonts.BOLD} fontSize={20} customStyle={styles.uploadTitle}>
              UPLOAD PRESCRIPTION
            </Text>
            <Text fontFamily={fonts.SEMI_BOLD} fontSize={14} customStyle={styles.uploadDesc}>
              {`Upload a Prescription and Tell Us What you Need. We \ndo the Rest!`}
            </Text>

            <View style={styles.discountRow}>
              <Text fontFamily={fonts.SEMI_BOLD} fontSize={14} customStyle={styles.discountText}>
                {`Flat 25% OFF \nON MEDICINES`}
              </Text>
              <Touchable onPress={() => {}} style={styles.button}>
                <Text fontFamily={fonts.BOLD} fontSize={20} color={colors.white}>
                  ORDER NOW
                </Text>
              </Touchable>
            </View>
          </View>

          <View style={styles.pinkBackground} />

          <Doctor />
          <Vitamin />


          <View style={{ height: moderateScale(200) }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: moderateScale(20),
    paddingHorizontal: moderateScale(24),
    marginBottom: moderateScale(14),
  },
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  burgerBar: {
    height: moderateScale(30),
    width: moderateScale(30),
  },
  healthy: {
    width: moderateScale(33),
    height: moderateScale(39),
    marginLeft: moderateScale(33),
  },
  micContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(100),
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mic: {
    height: moderateScale(20),
    width: moderateScale(18),
  },
  uploadContainer: {
    paddingHorizontal: moderateScale(30),
  },
  uploadTitle: {
    marginTop: moderateScale(20),
  },
  uploadDesc: {
    marginTop: moderateScale(14),
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(6),
  },
  discountText: {
    marginTop: moderateScale(14),
  },
  button: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(8),
    backgroundColor: colors.deepBlue,
    borderRadius: moderateScale(10),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
    marginRight: moderateScale(10),
    alignItems:"center"

  },
  pinkBackground: {
    backgroundColor: colors.lightPink,
    marginTop: moderateScale(110),
    height: moderateScale(178),
    width: screenWidth / 2,
    borderTopRightRadius: moderateScale(15),
    borderBottomRightRadius: moderateScale(15),
  },
});
