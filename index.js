/**
 * @format
 */
import {StatusBar} from 'react-native';
import {Navigation} from 'react-native-navigation';
import App from './App';
Navigation.registerComponent(`Home`, () => App);
StatusBar.setHidden(true);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'myStack',
        options: {
          statusBar: {
            visible: false,
          },
          topBar: {
            visible: false,
          },
          bottomTabs: {
            visible: false,
          },
        },
        children: [
          {
            component: {
              name: 'Home',
              passProps: {
                text: 'This is tab 1',
              },
              options: {
                statusBar: {visible: false},
                bottomTabs: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
});
