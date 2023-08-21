import  {FC} from 'react';
import {Text, TextStyle} from 'react-native';

interface props {
  title: string;
  styles: TextStyle;
  numberOfLines?: number;
}

const Label: FC<props> = ({title, styles, numberOfLines}) => {
  return (
    <Text style={styles} numberOfLines={numberOfLines}>
      {title}
    </Text>
  );
};

export default Label;
