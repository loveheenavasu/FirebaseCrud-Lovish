import { FC } from 'react';
import { Text, TextStyle } from 'react-native';

interface Props {
  title: string;
  styles: TextStyle;
  selected: boolean; // Add selected prop
  numberOfLines?: number;
}

const Label: FC<Props> = ({ title, styles, selected, numberOfLines }) => {
  // Create a new style object with conditional styles
  const combinedStyles = [
    styles,
    selected && { color: '#EF5DA8' }, // Change the text color to pink when selected
  ];

  return (
    <Text style={combinedStyles} numberOfLines={numberOfLines}>
      {title}
    </Text>
  );
};

export default Label;
