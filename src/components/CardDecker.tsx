import React, {useState, useRef} from 'react';
import Swiper from 'react-native-deck-swiper';
import {Image, StyleSheet, View} from 'react-native';
import Heart from 'react-native-vector-icons/Ionicons';
import Cross from 'react-native-vector-icons/Entypo';
import Staro from 'react-native-vector-icons/AntDesign';


function* range(start: number, end: number) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const CardDecker: React.FC = () => {
  const [cards] = useState<number[]>([...range(1, 50)]);
  const swiperRef = useRef<Swiper<number>>(null);
  const imageUrl1 =
    'https://images.unsplash.com/photo-1456082902841-3335005c3082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80';
  const imageUrl2 =
    'https://images.unsplash.com/photo-1692278265511-7c884556cd74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=696&q=80';
  const renderCard = (card: number, index: number) => {

    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: index % 2 === 0 ? imageUrl1 : imageUrl2,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.flex}>
          <View style={styles.pinkBackground}>
            <Cross
              style={styles.icon}
              name="cross"
              size={30}
              color={'#fff'}
              onPress={()=>swipeAction('left')}
            />
          </View>
          <View style={styles.pinkBackground}>
            <Heart
              style={styles.icon}
              name="heart-outline"
              size={30}
              color={'#fff'}
              onPress={()=>swipeAction('right')}
            />
          </View>
          <View style={styles.pinkBackground}>
            <Staro style={styles.icon} name="staro" size={30} color={'#fff'} onPress={()=>swipeAction('top')}/>
          </View>
        </View>
      </View>
    );
  };

  const onSwiped = (type: string) => {
    console.log(`on swiped ${type}`);
  };

  const onSwipedAllCards = () => {
    // Handle swiped all cards
  };

  const swipeAction = (action:string) => {
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
        cards={cards}
        // cardVerticalMargin={80}
        renderCard={renderCard}
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
  icon: {
    padding: 4,
    justifyContent: 'center',
  },
});

export default CardDecker;
