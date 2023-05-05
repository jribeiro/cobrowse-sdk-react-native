import React from 'react'
import { StyleSheet, Text, Button, SafeAreaView } from 'react-native'
import {
  Redacted,
  SessionControl,
  Unredacted,
  useSession
} from 'cobrowse-sdk-react-native'

export function SessionIndicator (): JSX.Element {
  const session = useSession()
  console.log('🚀 ~ file: SessionIndicator.tsx:12 ~ SessionIndicator ~ session:', session)

  return (
    <SessionControl>
      <Unredacted style={styles.container}>
        <SafeAreaView style={styles.contentWrapper}>
          <Text style={styles.text}>Screen Sharing session is active</Text>
          <Redacted>
            <Button title='Stop' onPress={() => { void session?.end() }} />
          </Redacted>
        </SafeAreaView>
      </Unredacted>
    </SessionControl>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: { fontSize: 16 }
})
