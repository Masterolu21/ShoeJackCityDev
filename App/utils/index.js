
import {Alert} from 'react-native';

export const showAlert = (
  confirmText,
  title,
  message,
  onPress,
) =>
  Alert.alert(
    title,
    message,
    [{text: confirmText, onPress: onPress ? onPress : () => {}}],
    {cancelable: false},
  );

export const showCustomAlert = (
  title,
  message,
  cancelText,
  confirmText,
  onConfirm,
  onCancel,
) =>
  Alert.alert(
    title,
    message,
    [
      {text: cancelText, style: 'cancel', onPress: onCancel},
      {text: confirmText, onPress: onConfirm ? onConfirm : () => {}},
    ],
    {cancelable: false},
  );
