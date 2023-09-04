import {View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import Spinner from 'react-native-loading-spinner-overlay';
import Label from '../../components/Label';
import styles from './styles';
import LocationPicker from '../../components/LocationPicker';
import GenderPicker from '../../components/Gender';
import Slider from '../../components/RangeSlider';
import Layout from '../../components/Layout';

interface Searchprops {
  location: string;
  gender: string;
  minAge: number;
  maxAge: number;
}
const SearchCriteriaScreen = () => {
  const [searchData, setSearchData] = useState<Searchprops>({
    location: '',
    gender: '',
    minAge: 18, // Initial min value
    maxAge: 80,
  });
  const {location, gender, minAge, maxAge} = searchData;
  const [error, setError] = useState<any>(null);
  const [spinner, setSpinner] = useState<boolean>(false);

  const handleFieldChange = (
    fieldName: keyof Searchprops,
    text: string | number,
  ) => {
    setSearchData(prevData => ({
      ...prevData,
      [fieldName]: text,
    }));
  };

  const handleApplyfilter = () => {};
  const handleReset = () => {
    setSearchData({
      location: '',
      gender: '',
      minAge: 18,
      maxAge: 80,
    });
  };

  return (
    <Layout title="Search Criteria" header={true}>
      <Spinner visible={spinner} />
      <View style={styles.wrapper}>
        <LocationPicker
          location={location}
          update={true}
          handleFieldChange={handleFieldChange}
        />
        <GenderPicker
          gender={gender}
          update={true}
          handleFieldChange={handleFieldChange}
        />
        <Label selected={false} styles={styles.text} title="Age" />
        <Slider
          minAge={minAge}
          maxAge={maxAge}
          handleFieldChange={handleFieldChange}
        />
        {error && (
          <Label selected={false} styles={styles.errorText} title={error} />
        )}
        <View style={styles.flex}>
          <View style={styles.buttonWidth}>
            <CustomButton
              title="Reset"
              marginTop={20}
              onPress={handleReset}
              textColor="#4B164C"
              backgroundColor="#fcf3fb"
            />
          </View>
          <View style={styles.buttonWidth}>
            <CustomButton
              title="Apply Filters"
              marginTop={20}
              onPress={handleApplyfilter}
              backgroundColor="#4B164C"
              textColor="white"
            />
          </View>
        </View>
      </View>
    </Layout>
  );
};
export default SearchCriteriaScreen;
