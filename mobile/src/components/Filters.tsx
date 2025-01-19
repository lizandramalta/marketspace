import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  HStack,
  Switch,
  Text,
  VStack
} from '@gluestack-ui/themed'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView
} from '@gorhom/bottom-sheet'
import { useNavigatorOptions } from '@hooks/useNavigatorOptions'
import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { TouchableOpacity } from 'react-native'
import { PaymentMethods, ProductQueryParamsDTO } from '../dtos/ProductDTO'
import { Button } from './Button'
import { Icon } from './Icon'
import { ConditionTagFilter } from './ConditionTagFilter'

const paymentMethodsOptions: PaymentMethodsOption[] = [
  {
    key: 'boleto',
    label: 'Boleto'
  },
  {
    key: 'pix',
    label: 'Pix'
  },
  {
    key: 'cash',
    label: 'Dinheiro'
  },
  {
    key: 'card',
    label: 'Cartão de Crédito'
  },
  {
    key: 'deposit',
    label: 'Deposito Bancário'
  }
]

export type FiltersRef = {
  showMoreFilters: () => void
}

type FiltersProps = {
  onApplyFilters: (filters: ProductQueryParamsDTO) => void
  onResetFilters: () => void
  activeFilters?: ProductQueryParamsDTO
}

type PaymentMethodsOption = {
  key: PaymentMethods
  label: string
}

export const Filters = forwardRef(
  (
    { activeFilters, onApplyFilters, onResetFilters }: FiltersProps,
    ref: Ref<FiltersRef>
  ) => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const [isNewFilter, setIsNewFilter] = useState<boolean>(false)
    const [isOldFilter, setIsOldFilter] = useState<boolean>(false)
    const [acceptTradeFilter, setAcceptTradeFilter] = useState<boolean>()
    const [paymentMethodsFilter, setPaymentMethodsFilter] = useState<
      PaymentMethods[]
    >([])
    const { hideTabBar, showTabBar } = useNavigatorOptions()

    function showMoreFilters() {
      hideTabBar()
      bottomSheetRef.current?.expand()
    }

    function handleClose() {
      bottomSheetRef.current?.close()
      showTabBar()
    }

    function handleResetFilters() {
      setIsNewFilter(false)
      setIsOldFilter(false)
      setAcceptTradeFilter(undefined)
      setPaymentMethodsFilter([])
      onApplyFilters({
        accept_trade: undefined,
        is_new: undefined,
        payment_methods: undefined,
        query: undefined
      })
      onResetFilters()
      handleClose()
    }

    function handleApplyFilters() {
      let acceptTradeValueApplied

      if (acceptTradeFilter) {
        acceptTradeValueApplied = true
      } else {
        acceptTradeValueApplied = undefined
      }

      let isNewValueApplied
      if (isNewFilter === isOldFilter) {
        isNewValueApplied = undefined
      } else if (isNewFilter) {
        isNewValueApplied = true
      } else {
        isNewValueApplied = false
      }

      onApplyFilters({
        accept_trade: acceptTradeValueApplied,
        is_new: isNewValueApplied,
        payment_methods: paymentMethodsFilter
      })
      handleClose()
    }

    useImperativeHandle(ref, () => ({
      showMoreFilters
    }))

    useEffect(() => {
      if (activeFilters) {
        const { accept_trade, is_new, payment_methods } = activeFilters

        if (accept_trade != null || accept_trade != undefined) {
          setAcceptTradeFilter(accept_trade)
        }

        if (is_new != null || is_new != undefined) {
          setIsNewFilter(is_new)
        }

        if (payment_methods && payment_methods.length !== 0) {
          setPaymentMethodsFilter(payment_methods)
        }
      }
    }, [activeFilters])

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['70%']}
        enablePanDownToClose
        onClose={handleClose}
        enableOverDrag={false}
        backdropComponent={(props) => (
          <BottomSheetBackdrop opacity={0.5} pressBehavior="none" {...props} />
        )}
        handleIndicatorStyle={{
          height: 4,
          width: 56,
          backgroundColor: '#9F9BA1'
        }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <VStack
            flex={1}
            py="$8"
            px="$6"
            gap="$16"
            justifyContent="space-between"
          >
            <VStack gap="$6">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontFamily="$heading" color="$gray100" fontSize="$xl">
                  Filtrar anúncios
                </Text>
                <TouchableOpacity onPress={handleClose}>
                  <Icon as="X" color="gray400" />
                </TouchableOpacity>
              </HStack>
              <VStack gap="$3">
                <Text fontFamily="$heading" color="$gray200" fontSize="$sm">
                  Condição
                </Text>
                <HStack gap="$2">
                  <ConditionTagFilter
                    title="novo"
                    value={isNewFilter}
                    onChange={(value) => setIsNewFilter(value)}
                  />
                  <ConditionTagFilter
                    title="usado"
                    value={isOldFilter}
                    onChange={(value) => setIsOldFilter(value)}
                  />
                </HStack>
              </VStack>
              <VStack gap="$3">
                <Text fontFamily="$heading" color="$gray200" fontSize="$sm">
                  Aceita troca?
                </Text>
                <Switch
                  thumbColor="$gray700"
                  trackColor={{ false: '$gray500', true: '$blueLight' }}
                  ios_backgroundColor="$gray500"
                  value={acceptTradeFilter}
                  onToggle={() => setAcceptTradeFilter(!acceptTradeFilter)}
                />
              </VStack>
              <VStack gap="$3">
                <Text fontFamily="$heading" color="$gray200" fontSize="$sm">
                  Meios de pagamento aceitos
                </Text>
                <CheckboxGroup
                  value={paymentMethodsFilter}
                  onChange={(keys) => {
                    setPaymentMethodsFilter(keys)
                  }}
                >
                  <VStack gap="$2">
                    {paymentMethodsOptions.map(({ key, label }) => (
                      <Checkbox value={key} key={key}>
                        <CheckboxIndicator
                          mr="$2"
                          borderColor="$gray400"
                          $checked={{
                            borderColor: '$blueLight',
                            bgColor: '$blueLight'
                          }}
                        >
                          <CheckboxIcon as={CheckIcon} color="$white" />
                        </CheckboxIndicator>
                        <CheckboxLabel
                          color="$gray200"
                          fontSize="$md"
                          $checked-color="$gray200"
                        >
                          {label}
                        </CheckboxLabel>
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </VStack>
            </VStack>
            <HStack gap="$3">
              <Button
                title="Resetar filtros"
                theme="gray"
                flex={1}
                onPress={handleResetFilters}
              />
              <Button
                title="Aplicar filtros"
                flex={1}
                onPress={handleApplyFilters}
              />
            </HStack>
          </VStack>
        </BottomSheetView>
      </BottomSheet>
    )
  }
)
