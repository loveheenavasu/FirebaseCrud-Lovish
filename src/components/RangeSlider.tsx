import {View, Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {RangeSlider} from '@react-native-assets/slider';
import Label from './Label';

const Slider = ({minAge, maxAge, handleFieldChange}: any) => {
  const handleValuesChange = (values: number[]) => {
    const [newMinAge, newMaxAge] = values;
    handleFieldChange('minAge', Math.round(newMinAge));
    handleFieldChange('maxAge', Math.round(newMaxAge));
  };
  const renderCustomThumb = ({value, thumb}: any) => {
    const roundedValue = Math.round(value).toString();
    return (
      <View
        style={[
          styles.mark,
          {
            marginLeft: thumb == 'min' ? 20 : 0,
            marginRight: thumb == 'max' ? 20 : 0,
          },
        ]}>
        {Platform.OS === 'ios' && (
          <View style={styles.container}>
            <View style={styles.square} />
            <View style={styles.arrow} />
          </View>
        )}
        <Label styles={styles.text} title={roundedValue} selected={false}/>
      </View>
    );
  };

  return (
    <View style={styles.rangeSlider}>
      <RangeSlider
        range={[minAge, maxAge]}
        minimumValue={0}
        maximumValue={99}
        outboundColor="grey"
        inboundColor="#FF3099"
        thumbTintColor="#FF3099"
        minimumRange={10}
        trackHeight={4}
        thumbSize={20}
        crossingAllowed={false}
        enabled={true}
        slideOnTap={true}
        CustomThumb={renderCustomThumb}
        onValueChange={handleValuesChange}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  rangeSlider: {
    padding: 10,
    marginVertical: Platform.OS === 'ios' ? 18 : 0,
    zIndex: -1,
  },
  mark: {
    backgroundColor: '#FF3099',
    width: 20,
    height: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    marginLeft: 20,
  },
  container: {
    position: 'absolute',
    width: 20,
    height: 20,
    alignItems: 'center',
    top: -30,
  },
  square: {
    width: 25,
    height: 22,
    backgroundColor: '#FF3099',
    borderRadius: 4,
  },
  arrow: {
    position: 'absolute',
    bottom: -5,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FF3099',
  },
  text: {
    color: 'white',
    position: Platform.OS === 'ios' ? 'absolute' : 'relative',
    top: Platform.OS === 'ios' ? -28 : 0,
    zIndex: 10,
    elevation: 5,
  },
});
