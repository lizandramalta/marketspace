import { Button, Input, PickAvatarButton } from '@components/index'
import { Center, Text, VStack } from '@gluestack-ui/themed'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as yup from 'yup'

import Logo from '@assets/logo.svg'

type FormDataProps = {
  name: string
  email: string
  tel: string
  password: string
  confirm_password: string
}

const formSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido'),
  tel: yup
    .string()
    .required('Informe o telefone.')
    .min(14, 'Telefone inválido'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter no mínimo 6 caractéres.'),
  confirm_password: yup
    .string()
    .required('Informe a confirmação da senha.')
    .oneOf([yup.ref('password'), ''], 'As senhas não conferem.')
})

export function SignUp({ navigation }: AuthScreenProps<'SingUp'>) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({ resolver: yupResolver(formSchema) })

  function handleGoBack() {
    navigation.goBack()
  }

  function handleCreateAccount(data: FormDataProps) {
    console.log(data)
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
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Nome"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="E-mail"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.email?.message}
                    keyboardType="email-address"
                  />
                )}
              />
              <Controller
                control={control}
                name="tel"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Telefone"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.tel?.message}
                    keyboardType="number-pad"
                    mask="phone"
                    maxLength={15}
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
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="confirm_password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Confirmar senha"
                    isPasswordInput
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.confirm_password?.message}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(handleCreateAccount)}
                  />
                )}
              />
            </Center>
            <Button title="Criar" onPress={handleSubmit(handleCreateAccount)} />
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
