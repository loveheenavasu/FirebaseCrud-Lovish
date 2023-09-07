import React, {useState, useRef, useEffect} from 'react';
import Swiper from 'react-native-deck-swiper';
import {Image, StyleSheet, Text, View} from 'react-native';
import Heart from 'react-native-vector-icons/Ionicons';
import Cross from 'react-native-vector-icons/Entypo';
import Staro from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import {fetchOtherUsers} from '../apiconfig/firebaseapi';
import Location from 'react-native-vector-icons/Ionicons'
import { calculateAge } from '../util/age';
import { scale } from '../util/screenSize';
function* range(start: number, end: number) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

interface UserData {
  uid: string;
  name: string;
  time: string;
  profileImage: string;
  location:string;
  dob:string;
  bio:string;
}
const CardDecker: React.FC = () => {
  const swiperRef = useRef<Swiper<number>>(null);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [otherUsers, setOtherUsers] = useState<UserData[]>([]);

  const fetchUsers = async (currentUserId: string) => {
    const usersData = await fetchOtherUsers(currentUserId);
    setOtherUsers(usersData);
  };
  
  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setCurrentUser(user.uid);
      fetchUsers(user.uid);
    }
  }, []);
  

  const renderCard = (card: number, index: number) => {
    const userData = otherUsers[index];
    if (!userData) {
      return null;
    }
    const age = calculateAge(userData.dob);
    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: userData.profileImage,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.userData}>
          <View style={styles.flexrow}>

          <Text style={styles.userName}>{userData.name.toUpperCase()},</Text>
          <Text style={styles.userInfo}>{age}</Text>
          </View>
          <View style={styles.flexrow}>
          <Location name='location' size={20} color={'#EF5DA8'}/>
          <Text style={styles.userInfo}>{userData.location}</Text>
          </View>
          <Text style={styles.userInfo}>{userData.bio}</Text>
        </View>
        <View style={styles.flex}>
          <View style={styles.pinkBackground}>
            <Cross
              style={styles.icon}
              name="cross"
              size={30}
              color={'#fff'}
              onPress={() => swipeAction('left')}
            />
          </View>
          <View style={styles.pinkBackground}>
            <Heart
              style={styles.icon}
              name="heart-outline"
              size={30}
              color={'#fff'}
              onPress={() => swipeAction('right')}
            />
          </View>
          <View style={styles.pinkBackground}>
            <Staro
              style={styles.icon}
              name="staro"
              size={30}
              color={'#fff'}
              onPress={() => swipeAction('top')}
            />
          </View>
        </View>
      </View>
    );
  };

  const onSwiped = (type: string) => {
    console.log(`on swiped ${type}`);
  };

  const onSwipedAllCards = async () => {
    // Handle swiped all cards
    console.log('fsdfsd');
    
    const user = auth().currentUser;
    if (user) {
      setCurrentUser(user.uid);
      await fetchUsers(user.uid);
    }
  };

  const swipeAction = (action: string) => {
    switch (action) {
      case 'right':
        swiperRef.current?.swipeRight();
        break;
      case 'left':
        swiperRef.current?.swipeLeft();
        break;
      case 'top':
        swiperRef.current?.swipeTop();
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        onSwiped={() => onSwiped('general')}
        onSwipedLeft={() => onSwiped('left')}
        onSwipedRight={() => onSwiped('right')}
        onSwipedTop={() => onSwiped('top')}
        onSwipedBottom={() => onSwiped('bottom')}
        // onTapCard={swipeLeft}
        // cards={otherUsers}
        cards={Array.from(range(0, otherUsers.length - 1))}
        // cardVerticalMargin={80}
        renderCard={renderCard}
        // onSwipedAll={onSwipedAllCards}
        onSwipedAll={onSwipedAllCards}
        stackSize={3}
        stackSeparation={5}
        // animateOverlayLabelsOpacity
        // animateCardOpacity
        swipeBackCard
        overlayLabels={{
          bottom: {
            title: 'Never',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
          },
          left: {
            title: 'NOPE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: -30,
              },
            },
          },
          right: {
            title: 'LIKE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30,
              },
            },
          },
          top: {
            title: 'SUPER LIKE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 0.7,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1, // Use flex: 1 to fill the available space
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: -10,
    width: '80%',
    alignSelf: 'center',
  },
  pinkBackground: {
    backgroundColor: '#EF5DA8',
    borderColor: 'white',
    borderRadius: 19,
    borderWidth: 1,
  },
  flexrow:{
    flexDirection:'row',
    alignItems:'center'
  },
  icon: {
    padding: 4,
    justifyContent: 'center',
  },
  userData: {
    position:'absolute',
    flexDirection: 'column',
    backgroundColor:'white',
    padding:10,
    bottom:20,
    width:scale(150),
    opacity:0.7,
    alignItems:'center'
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity:1

  },
  userInfo: {
    fontSize: 16,
    color: '#555',
    opacity:1

  },
});

export default CardDecker;
