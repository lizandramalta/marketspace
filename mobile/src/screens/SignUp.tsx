import { Button, Input, PickAvatarButton } from '@components/index'
import { Center, Text, VStack } from '@gluestack-ui/themed'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Logo from '@assets/logo.svg'

export function SignUp({ navigation }: AuthScreenProps<'SingUp'>) {
  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1} bgColor="$gray600" pt={64} pb={56}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack gap="$10" w="$full" px="$12">
          <Center gap="$3">
            <Logo width={60} height={40} />
            <Text
              fontFamily="$heading"
              fontSize="$xl"
              lineHeight="$xl"
              color="$gray100"
            >
              Boas vindas!
            </Text>

            <Text
              fontFamily="$body"
              fontSize="$sm"
              lineHeight="$sm"
              color="$gray200"
              textAlign="center"
            >
              Crie sua conta e use o espaço para comprar{'\n'}itens variados e
              vender seus produtos
            </Text>
          </Center>
          <VStack gap="$6">
            <Center gap="$3">
              <PickAvatarButton onPickAvatar={() => {}} />
              <Input placeholder="Nome" />
              <Input placeholder="E-mail" />
              <Input placeholder="Telefone" />
              <Input placeholder="Senha" secureTextEntry />
              <Input placeholder="Confirmar senha" secureTextEntry />
            </Center>
            <Button title="Criar" />
          </VStack>
          <Center gap="$4">
            <Text
              fontFamily="$body"
              fontSize="$sm"
              lineHeight="$sm"
              color="$gray200"
            >
              Já tem uma conta?
            </Text>
            <Button
              title="Ir para o login"
              theme="gray"
              onPress={handleGoBack}
            />
          </Center>
        </VStack>
      </KeyboardAwareScrollView>
    </VStack>
  )
}
