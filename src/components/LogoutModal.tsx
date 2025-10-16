import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Button from './Button';
import { colors, fonts } from '../helpers/constants/styles';
import Text from './Text';

interface LogoutModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ visible, onConfirm, onCancel }: LogoutModalProps) => {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text customStyle={styles.title}>Are you sure you want to logout?</Text>
          <View style={styles.buttonRow}>
            <Button
              value="No"
              onPress={onCancel}
              customStyle={{ backgroundColor: colors.grey, flex: 1, marginRight: 10 }}
            />
            <Button
              value="Yes"
              onPress={onConfirm}
              customStyle={{ backgroundColor: colors.red, flex: 1 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(18),
    fontFamily: fonts.SEMI_BOLD,
    marginBottom: moderateScale(20),
    textAlign: 'center',
  },
  buttonRow: { flexDirection: 'row', width: '100%' },
});
