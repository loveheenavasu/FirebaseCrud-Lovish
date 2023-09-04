import React, {createContext, useContext, useState} from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext<{
  showToast: (message: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  toastMessage: string;
  toastType: string;
}>({ showToast: () => {}, toastMessage: '', toastType: '' });

export const ToastProvider = ({children}: any) => {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'warning' | 'error' | 'info'>('success'); // Default to 'success'


  const showToast = (message:any, type:any) => {
    setToastMessage(message);
    setToastType(type);

    setTimeout(() => {
      setToastMessage('');
      setToastType('success'); // Reset the type
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{showToast, toastMessage, toastType}}>
      {children}
      {toastMessage ? ( // Conditionally render the SuccessToast
        <Toast type={toastType} message={toastMessage} />
      ) : null}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
