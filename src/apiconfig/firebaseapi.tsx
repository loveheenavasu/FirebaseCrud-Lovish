import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {validateEmail} from '../util/validation';
export interface UserData {
  email: string;
  name: string;
  phone: string;
  profileImage: string | undefined;
}
export const handleLogin = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    if (!email || !password) {
      reject('Please provide both email and password.');
      return;
    }

    if (!validateEmail(email)) {
      reject('Please provide a valid email address.');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
        resolve('Logged in successfully!');
      })
      .catch((error: any) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            reject('That email address is already in use!');
            break;
          case 'auth/invalid-email':
            reject('That email address is invalid!');
            break;
          case 'auth/user-not-found':
            reject('That email address does not exist!');
            break;
          case 'auth/wrong-password':
            reject('Wrong password!');
            break;
          default:
            reject(error.message); // Reject with the actual Firebase error message
            break;
        }
      });
  });
};

export const handleRegister = async (
  email: string,
  password: string,
  userImage: string | undefined,
) => {
  return new Promise(async (resolve, reject) => {
    if (!email) {
      reject('Please enter an email address.');
      return;
    }

    if (!validateEmail(email)) {
      reject('Please enter a valid email address.');
      return;
    }

    if (!password) {
      reject('Please enter a password.');
      return;
    }

    if (!userImage) {
      reject('Please select an image.');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      if (userImage) {
        const imageFileName = `profile_${user.uid}.jpg`;
        const reference = storage().ref(`profileImages/${imageFileName}`);
        await reference.putFile(userImage);

        const imageUrl = await reference.getDownloadURL();

        const usersCollection = firestore().collection('users');
        await usersCollection.doc(user.uid).set({
          email: email,
          name: '',
          phone: '',
          profileImage: imageUrl,
        });
      }

      resolve('User created successfully!');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          reject('That email address is already in use!');
          break;
        case 'auth/invalid-email':
          reject('That email address is invalid!');
          break;
        case 'auth/weak-password':
          reject('Please enter a password of minimum 6 digits.');
          break;
        default:
          reject('An error occurred while creating the user.');
          break;
      }
    }
  });
};

export const fetchUserData = () => {
  return new Promise<UserData | any>(async (resolve, reject) => {
    const userId = auth().currentUser?.uid;
    if (!userId) {
      reject('User not authenticated.');
      return;
    }

    try {
      const userRef = firestore().collection('users').doc(userId);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        resolve(userData);
      } else {
        reject('User data not found.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      reject('Error fetching user data.');
    }
  });
};

export const updateUserData = (
  name: string,
  phone: string,
  userImage: string | undefined,
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const userId = auth().currentUser?.uid;
    if (!userId) {
      reject('User not authenticated.');
      return;
    }

    try {
      const userRef = firestore().collection('users').doc(userId);
      const updateData = {name, phone};

      if (userImage !== undefined) {
        // Update user image in storage and Firestore
        // Your image update logic here
        handleUpdateImage(userImage)
        
      }

      await userRef.update(updateData);
      resolve('User data updated successfully.');
    } catch (error) {
      console.error('Error updating user data:', error);
      reject('Error updating user data.');
    }
  });
};
const handleUpdateImage = async (userImage:any) => {
  const userId = auth().currentUser?.uid;
  if (userId && userImage) {
    console.log(userImage);

    try {
      // Update Firestore collection
      await firestore().collection('users').doc(userId).update({
        profileImage: userImage,
      });

      // Upload new image to Firebase Storage
      const imageName = `profileImages/profile_${userId}.jpg`;
      const storageRef = storage().ref().child(imageName);

      // Convert local image URI to blob directly
      const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response as Blob);
        xhr.onerror = () => reject(new TypeError('Network request failed'));
        xhr.responseType = 'blob';
        xhr.open('GET', userImage, true); // Use userImage directly
        xhr.send(null);
      });

      await storageRef.put(blob);
      console.log('Profile image updated successfully');
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  }
};

export const signOutUser = () => {
  return new Promise<void>((resolve, reject) => {
    auth()
      .signOut()
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};