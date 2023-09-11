import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const initialState = {
  user: null,
  loading: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, {dispatch}) => {
    try {
      dispatch(setLoading(true));
      const userId = auth().currentUser?.uid;
      if (!userId) {
        throw new Error('User not authenticated.');
      }
      const userRef = firestore().collection('users').doc(userId);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        dispatch(setLoading(false));
        return userData;
      } else {
        dispatch(setLoading(false));
        throw new Error('User data not found.');
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.error('Error fetching user data:', error);
      throw new Error('User data not found.');
    }
  },
);


export const updateUserData = createAsyncThunk(
  'auth/updateUserData',
  async (
    {
      name,
      phone,
      userImage,
      dob,
      location,
      gender,
      bio,
    }: {
      name: string;
      phone: string;
      userImage: string | undefined;
      dob: string;
      location: string;
      gender: string;
      bio: string;
    },
    { dispatch }
  ) => {
    try {
      dispatch(setLoading(true));
      const userId = auth().currentUser?.uid;
      if (!userId) {
        throw new Error('User not authenticated.');
      }
      console.log(name, phone, userImage, dob, location, gender, bio);
      const userRef = firestore().collection('users').doc(userId);
      const updateData = { name, phone, dob, location, gender, bio };

      if (userImage !== undefined) {
        await handleUpdateImage(userImage);
      }
      await userRef.update(updateData);
      dispatch(setLoading(false));
      return 'User data updated successfully.';
    } catch (error) {
      dispatch(setLoading(false));
      console.error('Error updating user data:', error);
      throw new Error('Error updating user data.');
    }
  }
);


const handleUpdateImage = async (userImage: string | undefined) => {
  const userId = auth().currentUser?.uid;
  if (userId && userImage) {
    try {
      // Update Firestore collection
      await firestore().collection('users').doc(userId).update({
        profileImage: userImage,
      });

      // Convert the image URI to Blob
      const blob = await fetch(userImage).then((response) => response.blob());

      // Generate a unique filename for the image
      const imageName = `profileImages/profile_${userId}_${Date.now()}.jpg`;

      const storageRef = storage().ref().child(imageName);

      // Upload the Blob to Firebase Storage
      await storageRef.put(blob);

      console.log('Image updated successfully');

      // Return the image URL
      const imageUrl = await storageRef.getDownloadURL();
      await firestore().collection('users').doc(userId).update({
        profileImage: imageUrl,
      });
      return imageUrl;
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  }
};

export const {setUser, setLoading} = profileSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;

export default profileSlice.reducer;
