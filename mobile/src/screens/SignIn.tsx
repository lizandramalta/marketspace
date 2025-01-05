import { Center, Text, VStack } from '@gluestack-ui/themed'
import { Input, Button } from '@components/index'

import Logo from '@assets/logo.svg'
import AppName from '@assets/appName.svg'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export function SignIn({ navigation }: AuthScreenProps<'SignIn'>) {
  function handleCreateAccount() {
    navigation.navigate('SingUp')
  }

  return (
    <VStack flex={1}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack
          bgColor="$gray600"
          w="$full"
          sx={{
            borderBottomEndRadius: 24,
            borderBottomStartRadius: 24
          }}
          alignItems="center"
          pt={102}
          pb={68}
        >
          <Center gap="$5" mb={77}>
            <Logo width={96} height={64} />
            <Center gap="$0.5">
              <AppName />
              <Text
                fontFamily="$mono"
                fontSize="$sm"
                lineHeight="$sm"
                color="$gray300"
              >
                Seu espaço de compra e venda
              </Text>
            </Center>
          </Center>
          <VStack px="$12" gap="$8" w="$full">
            <Center gap="$4">
              <Text
                fontFamily="$body"
                fontSize="$sm"
                lineHeight="$sm"
                color="$gray200"
              >
                Acesse sua conta
              </Text>
              <Input placeholder="E-mail" />
              <Input placeholder="Senha" secureTextEntry />
            </Center>
            <Button title="Entrar" theme="blue" />
          </VStack>
        </VStack>
        <Center flex={1} gap="$4" px="$12">
          <Text
            fontFamily="$body"
            fontSize="$sm"
            lineHeight="$sm"
            color="$gray200"
          >
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar uma conta"
            theme="gray"
            onPress={handleCreateAccount}
          />
        </Center>
      </KeyboardAwareScrollView>
    </VStack>
  )
}
