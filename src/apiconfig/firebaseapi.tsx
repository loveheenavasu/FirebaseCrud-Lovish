import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {validateEmail} from '../util/validation';
export interface UserData {
  email: string;
  name: string;
  phone: string;
  profileImage: string | undefined;
  location: string;
  dob: string;
  gender: string;
  bio: string;
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

export const handleRegister = async (email: string, password: string) => {
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

    try {
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
  dob: string,
  location: string,
  gender: string,
  bio: string,
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const userId = auth().currentUser?.uid;
    if (!userId) {
      reject('User not authenticated.');
      return;
    }

    try {
      console.log(name, phone, userImage, dob, location, gender, bio);

      const userRef = firestore().collection('users').doc(userId);
      const updateData = {name, phone, dob, location, gender, bio};

      if (userImage !== undefined) {
        // Update user image in storage and Firestore
        // Your image update logic here
        handleUpdateImage(userImage);
      }

      await userRef.update(updateData);
      resolve('User data updated successfully.');
    } catch (error) {
      console.error('Error updating user data:', error);
      reject('Error updating user data.');
    }
  });
};
const handleUpdateImage = async (userImage: any) => {
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

      console.log('image updated successfully');
      const imageUrl = await storageRef.getDownloadURL();
      return imageUrl;
    } catch (error) {
      console.log('Error updating profile image:', error);
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

export const changePassword = (
  currentPassword: string,
  newPassword: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const user = auth().currentUser;
    if (!user) {
      reject('User not authenticated');
      return;
    }
    const credentials = auth.EmailAuthProvider.credential(
      user.email || '',
      currentPassword,
    );
    user
      .reauthenticateWithCredential(credentials)
      .then(() => {
        return user.updatePassword(newPassword);
      })
      .then(() => {
        resolve('Password updated successfully.');
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const sendPasswordResetEmail = async (email: string) => {
  return auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log('Password reset email sent successfully');
      return 'Password reset email sent successfully';
    })
    .catch(error => {
      console.log('Error sending password reset email.', error);
      throw new Error('Error sending password reset email.');
    });
};

export const sendChatMessage = async (
  chatId: string,
  currentUser: string | null,
  name: string,
  newMessage: string,
  image: string,
) => {
  console.log('image', image !== '');
  if (newMessage.trim() === '' && image.length === 0) {
    return;
  }
  
  const chatRef = firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages');
  
  try {
    await chatRef.add({
      sender: currentUser,
      name: name,
      text: newMessage,
      imageUrl: image,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
  
    console.log('message sent successfully.');
  } catch (error) {
    console.error('Error sending message:', error);
  }
  
};

interface Message {
  sender: string;
  text: string;
  name: string;
  videoUrl:string;
  imageUrl:string;
  timestamp: any;
}

export const getChatMessages = (
  chatId: string,
  setMessageFunc: (messages: Message[]) => void,
) => {
  const chatRef = firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages');

  return chatRef.orderBy('timestamp').onSnapshot(querySnapshot => {
    const messagesData: Message[] = [];
    querySnapshot.forEach(doc => {
      const messageData = doc.data() as Message;
      messagesData.push(messageData);
    });
    setMessageFunc(messagesData);
  });
};

export const handleMediaUpload = async (imageUrl: string | undefined) => {
  if (imageUrl) {
    try {
      const imageName = `messages/${Date.now()}.jpg`;
      const storageRef = storage().ref().child(imageName);

      const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response as Blob);
        xhr.onerror = () => reject(new TypeError('Network request failed'));
        xhr.responseType = 'blob';
        xhr.open('GET', imageUrl, true);
        xhr.send(null);
      });

      await storageRef.put(blob);
      console.log('Image uploaded successfully');
      
      // Get the download URL if needed
      const downloadUrl = await storageRef.getDownloadURL();
      return downloadUrl;
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  }
};

