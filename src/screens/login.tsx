import {useFormik} from 'formik';
import React from 'react';
import * as yup from 'yup';
import TextInput from '../components/text-input';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/app-navigation';
import {Image, View, Text, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/^(?=.*[A-Z]).*$/, {
      message: 'Password must at least contain one capital character',
    })
    .matches(/^(?=.*[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/gi, {
      message: 'Password must at least contain one special character',
    }),
});

type FormValues = yup.InferType<typeof loginSchema>;

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: () => {
      navigation.replace('Home');
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-neutral-900 p-4">
      <View className="justify-center items-center flex-1" style={{gap: 16}}>
        <Image
          source={require('../assets/movia-logo.png')}
          style={{height: 150, marginBottom: 32}}
          resizeMode="contain"
        />
        <Text className="text-center text-4xl font-bold">Sign in</Text>
        <Text className="text-center text-neutral-400">
          Enter your email and password below to get started
        </Text>
        <TextInput
          value={formik.values.email}
          placeholder="email..."
          error={formik.errors.email}
          touched={formik.touched.email}
          onChangeText={formik.handleChange('email')}
        />
        <TextInput
          value={formik.values.password}
          placeholder="password..."
          error={formik.errors.password}
          touched={formik.touched.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry
        />
        <TouchableWithoutFeedback onPress={formik.handleSubmit as () => void}>
          <View
            className="w-full bg-red-500 justify-center items-center rounded-lg"
            style={{height: 45}}>
            <Text className="text-center font-bold">Sign in</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}
