import {useFormik} from 'formik';
import React from 'react';
import * as yup from 'yup';
import TextInput from '../components/text-input';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/app-navigation';
import {Image, View, Text, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import data from '../assets/data.json';
import Snackbar from 'react-native-snackbar';

const loginSchema = yup.object().shape({
  username: yup.string().required().min(2),
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
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      let isCorrectUser = false;
      for (const user of data) {
        if (
          user.username === values.username &&
          user.password === values.password
        )
          isCorrectUser = true;
      }

      if (isCorrectUser) navigation.replace('Home');
      else
        Snackbar.show({
          text: 'Incorrect username or password',
          backgroundColor: '#dc2626',
        });
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
          value={formik.values.username}
          placeholder="username..."
          error={formik.errors.username}
          touched={formik.touched.username}
          onChangeText={formik.handleChange('username')}
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
