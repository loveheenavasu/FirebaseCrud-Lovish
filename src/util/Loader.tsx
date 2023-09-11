import React, {FC} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

interface props {
  Visible: boolean;
}

const Loader: FC<props> = ({Visible}) => {
  return <>{Visible && <Spinner visible={Visible} />}</>;
};

export default Loader;
