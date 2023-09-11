import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from './store';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const initialState = {
  user: null,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
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
export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      if (user) {
        dispatch(setUser(user.uid));
        dispatch(setLoading(false));
      }

      return Promise.resolve('Logged in successfully!');
    } catch (error: any) {
      dispatch(setLoading(false));
      console.log(error.code);

      switch (error.code) {
        case 'auth/email-already-in-use':
          return Promise.reject('That email address is already in use!');
        case 'auth/invalid-email':
          return Promise.reject('That email address is invalid!');
        case 'auth/user-not-found':
          return Promise.reject('That email address does not exist!');
        case 'auth/wrong-password':
          return Promise.reject('Wrong password!');
        default:
          return Promise.reject(error.message);
      }
    }
  };


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({email, password}: {email: string; password: string}, {dispatch}) => {
    try {
      dispatch(setLoading(true));
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      const usersCollection = firestore().collection('users');
      await usersCollection.doc(user.uid).set({
        email: email,
        name: '',
        phone: '',
        profileImage: '',
        location: '',
        dob: '',
        gender: '',
        bio: '',
      });

      dispatch(setUser(user.uid));
      dispatch(setLoading(false));

      return Promise.resolve('User created successfully!');
    } catch (error: any) {
      dispatch(setLoading(false));

      switch (error.code) {
        case 'auth/email-already-in-use':
          return Promise.reject('That email address is already in use!');
        case 'auth/invalid-email':
          return Promise.reject('That email address is invalid!');
        case 'auth/weak-password':
          return Promise.reject(
            'Please enter a password of a minimum of 6 digits.',
          );
        default:
          return Promise.reject('An error occurred while creating the user.');
      }
    }
  },
);

export const loginUser = createAsyncThunk<
  void,
  {email: string; password: string},
  {state: RootState}
>('auth/loginUser', async ({email, password}, {dispatch}) => {
  try {
    dispatch(setLoading(true));
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    if (user) {
      dispatch(setUser(user.uid));
      dispatch(setLoading(false));
    }
  } catch (error: any) {
    dispatch(setLoading(false));
    console.log(error.code);
    switch (error.code) {
      case 'auth/email-already-in-use':
        return Promise.reject('That email address is already in use!');
      case 'auth/invalid-email':
        return Promise.reject('That email address is invalid!');
      case 'auth/user-not-found':
        return Promise.reject('That email address does not exist!');
      case 'auth/wrong-password':
        return Promise.reject('Wrong password!');
      default:
        return Promise.reject(error.message);
    }
  }
});

export const signOutUser = createAsyncThunk<void, void, {state: RootState}>(
  'auth/signOutUser',
  async (_, {dispatch}) => {
    try {
      await auth().signOut();
      dispatch(setUser(null));
      dispatch(setLoading(false));
    } catch (error) {
      console.log('Error signing out:', error);
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    { currentPassword, password }: { currentPassword: string; password: string },
    { dispatch }
  ) => {
    try {
      dispatch(setLoading(true))
      const user = auth().currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const credentials = auth.EmailAuthProvider.credential(user.email || '', currentPassword);

      await user.reauthenticateWithCredential(credentials);
      await user.updatePassword(password);
      dispatch(setLoading(false))

      return 'Password updated successfully.';
    } catch (error:any) {
      // return rejectWithValue(error);
      dispatch(setLoading(false))

      throw error.message

    }
  }
);

export const sendPasswordResetEmail = createAsyncThunk(
  'auth/sendPasswordResetEmail',
  async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
      console.log('Password reset email sent successfully');
      return 'Password reset email sent successfully';
    } catch (error:any) {
      console.log('Error sending password reset email.', error);
      throw error.message; // Throw the actual error to handle it in the catch block
    }
  }
);


export const {setUser, setLoading} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;

export default authSlice.reducer;
