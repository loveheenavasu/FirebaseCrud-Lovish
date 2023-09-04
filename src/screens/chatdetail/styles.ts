import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapper: {
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'space-evenly',
        alignItems:'center',
    },
    icon: {
        marginHorizontal: 5,
        justifyContent:'center',
        alignItems:'center',
    },
    textinput: {
        width:'70%'
    },
});

export default styles;