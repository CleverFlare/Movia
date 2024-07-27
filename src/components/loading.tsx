import React from 'react';
import {Dimensions, View} from 'react-native';
import * as Progress from 'react-native-progress';

const {width, height} = Dimensions.get('window');

export default function Loading() {
  return (
    <View
      className="flex-row justify-center items-center -z-10"
      style={{width, height}}>
      <Progress.CircleSnail thickness={12} size={160} color="#ef4444" />
    </View>
  );
}
