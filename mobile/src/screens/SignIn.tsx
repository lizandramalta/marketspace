import { Button, Input } from '@components/index'
import { Center, Text, VStack } from '@gluestack-ui/themed'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as yup from 'yup'

import AppName from '@assets/appName.svg'
import Logo from '@assets/logo.svg'

type FormDataProps = {
  email: string
  password: string
}

const formSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.')
})

export function SignIn({ navigation }: AuthScreenProps<'SignIn'>) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({ resolver: yupResolver(formSchema) })

  function handleCreateAccount() {
    navigation.navigate('SingUp')
  }

  function handleSignIn(data: FormDataProps) {
    console.log(data)
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
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    errorMessage={errors.email?.message}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Senha"
                    isPasswordInput
                    errorMessage={errors.password?.message}
                    onChangeText={onChange}
                    value={value}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(handleSignIn)}
                  />
                )}
              />
            </Center>
            <Button
              title="Entrar"
              theme="blue"
              onPress={handleSubmit(handleSignIn)}
            />
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
