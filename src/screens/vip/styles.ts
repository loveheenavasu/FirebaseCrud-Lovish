import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:15
  },
  wrapper: {
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginVertical: 5,
    borderRadius: 15,
    marginHorizontal: 2,
  },
  shadow: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  button:{
    paddingHorizontal:20
  }
  
});
