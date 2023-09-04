import {
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import Spinner from 'react-native-loading-spinner-overlay';
import Label from '../../components/Label';
import styles from './styles';
import Layout from '../../components/Layout';

interface InterestProps {
  items: string[];
}

const interests = [
  'Gaming',
  'Dancing',
  'Animals',
  'Fashion',
  'Writing',
  'People',
  'Food & Drink',
  'Hockey',
  'Basketball',
  'Slam Poetry',
  'Home Workout',
  'Walking',
  'Running',
  'Travel',
  'Language',
  'Music',
  'Movie',
  'Gym',
];

const InterestsScreen = () => {
  const [interestData, setInterestData] = useState<InterestProps>({
    items: interests,
  });
  const {items} = interestData;
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [spinner, setSpinner] = useState<boolean>(false);

  const handleToggleInterest = (selectedInterest: string) => {
    if (selectedInterests.includes(selectedInterest)) {
      setSelectedInterests(prevSelected =>
        prevSelected.filter(item => item !== selectedInterest),
      );
    } else {
      setSelectedInterests(prevSelected => [...prevSelected, selectedInterest]);
    }
  };

  const handleSave = () => {
    // Send the items array to Firebase collection
    console.log('Selected Interests:', items);
  };

  return (
    <Layout title="Select your interests" header={true}>
      <Spinner visible={spinner} />
      <View style={styles.wrapper}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {interests.map(interest => (
            <TouchableOpacity
              onPress={() => handleToggleInterest(interest)}
              key={interest}
              style={[
                styles.card,
                selectedInterests.includes(interest) && styles.selectedCard, // Apply pink border style
              ]}>
              <Label
                title={interest}
                styles={styles.text}
                selected={selectedInterests.includes(interest)}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.marginTop}>
          <CustomButton
            title="Save"
            marginTop={0}
            onPress={handleSave}
            backgroundColor="#4B164C"
            textColor="white"
          />
        </View>
      </View>
    </Layout>
  );
};

export default InterestsScreen;
