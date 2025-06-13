import React, { Component } from 'react'
import { WebView } from 'react-native-webview'
import { unredact, Unredacted } from 'cobrowse-sdk-react-native'
import { Button, Text, View } from 'react-native';

const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>WebView</title>

      <style>
        .red { 
          color: red; 
        }
      </style>
    </head>
    <body>
      <h2>WebView</h2>
      <p>This paragraph won't be redacted</p>
      <p class="red redact-me">This paragraph will be redacted</p>
      <label for="sensitive">Sensitive Input</label>
      <input id="sensitive" type="text" />
    </body>
  </html>
`

class MyWebView extends Component {
  constructor(props) {
    super(props);
    // Initialize state with the HTML source
    this.state = {
      src: { html },
      size: { height: 300, width: 300 }
    };
  }

  // Handler to change the WebView source
  changeSrc = () => {
    this.setState({
      src: { uri: 'https://docs.cobrowse.io' },
      size: { height: 350, width: 300 }
    });
  };

  render() {
    const { src, size } = this.state;
    return (
      <>
        <Text
          onPress={this.changeSrc}
        >Change Src</Text>
        <Unredacted>

          <WebView
            source={src}
            style={size}
          />
        </Unredacted>
      </>
    );
  }
}

export default unredact(MyWebView)
