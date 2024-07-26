import {RootStackParamList} from './src/navigation/app-navigation';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
