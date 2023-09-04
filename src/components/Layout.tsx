import React, {ReactNode} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BackHeader from './BackHeader';

interface LayoutProps {
  title: string;
  header:boolean;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({title, header,children}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
        {header && <BackHeader title={title} />}
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center',
  },
});

export default Layout;
