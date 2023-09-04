import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const MembershipCard: React.FC = () => {
    const DATA = [
        {id:0,month:'12',price:80,title:'Super Saver'},
        {id:1,month:'6',price:45,title:'Recommeded'},
        {id:2,month:'1',price:15,title:'Costly'}
      ]
  const [selectedMonth, setSelectedMonth] = useState<string | null>('6');

  const handleClick = (clickedMonth: string) => {
    setSelectedMonth(selectedMonth === clickedMonth ? null : clickedMonth);
  };
  console.log(selectedMonth);
  
  

  return (
    <View style={styles.flex}>
    {
        DATA.map((item)=>{
            return(
                <TouchableOpacity
                style={[
                  styles.card,
                  { borderColor: selectedMonth === item.month ? 'pink' : 'transparent' },
                  { elevation: selectedMonth === item.month ? 10 : 5 },
                ]}
                onPress={() => handleClick(item.month)}
                key={item.id}
              >
                <View style={[styles.highlight, { backgroundColor: selectedMonth === item.month ? '#EF5DA8' : 'transparent' }]}>
                  <Text style={[styles.title, { color: selectedMonth === item.month ? '#fff' : '#888' }]}>{item.title}</Text>
                </View>
                <Text style={[styles.month, { color: selectedMonth === item.month ? '#EF5DA8' : 'black' }]}>{item.month}</Text>
                <Text style={[styles.month, { color: selectedMonth === item.month ? '#EF5DA8' : 'black', marginTop: -10 }]}>months</Text>
                <Text style={[styles.price, { color: selectedMonth === item.month ? '#EF5DA8' : '#888' }]}>${item.price}.00</Text>
              </TouchableOpacity>
            )
            
        })
    }
   
    </View>

  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    borderWidth: 2,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  highlight: {
    backgroundColor: '#EF5DA8',
    padding: '4%',
    borderRadius: 10,
    position: 'absolute',
    top: -15,
  },
  month: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 10,
    color: '#fff',
    textAlign:'center'
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
  flex:{
    flexDirection:'row',
    marginTop:10,
    justifyContent:'space-evenly'
  }
});

export default MembershipCard;
