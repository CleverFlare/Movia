import React, {useState} from 'react';
import {
  TextInput as NativeTextInput,
  Text,
  TextInputProps,
  View,
} from 'react-native';

export default function TextInput({
  error,
  touched,
  ...props
}: TextInputProps & {error?: string; touched?: boolean}) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View className="w-full" style={{minHeight: 45, gap: 4}}>
      <NativeTextInput
        {...props}
        style={{
          minHeight: 45,
          maxHeight: 45,
          height: '100%',
          borderColor: isFocused ? '#ef4444' : '#525252',
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="border rounded-lg px-4"
      />
      {touched && error ? <Text className="text-red-500">{error}</Text> : null}
    </View>
  );
}
