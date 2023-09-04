import { TouchableOpacity, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Label from './Label';

interface ForgotPasswordProps {
  onPress: () => void;
}
export const ForgotPassword: FC<ForgotPasswordProps> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.forgotView}>
      <Label title="Forgot Password?" selected={true} styles={styles.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    forgotView:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
  text: {
    fontSize: 16,
  },
});

export default ForgotPassword;
