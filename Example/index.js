import { Navigation } from 'react-native-navigation'
import App from './app/App'

Navigation.registerComponent('Example.WelcomScreen', () => App)
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'HOME_TAB',
              children: [
                {
                  component: {
                    id: 'HOME_SCREEN',
                    name: 'Example.WelcomScreen'
                  }
                }
              ],
              options: {
                bottomTab: {
                  text: 'Home'
                },
                statusBar: {
                  visible: false,
                  style: 'dark',
                  backgroundColor: '#000'
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                }
              }
            }
          },
          {
            stack: {
              id: 'PROFILE_TAB',
              children: [
                {
                  component: {
                    id: 'PROFILE_SCREEN',
                    name: 'Example.WelcomScreen'
                  }
                }
              ],
              options: {
                bottomTab: {
                  text: 'Profile'
                },
                statusBar: {
                  visible: false,
                  style: 'light',
                  backgroundColor: '#000'
                }
              }
            }
          }
        ]
      }
    }
  })
})
