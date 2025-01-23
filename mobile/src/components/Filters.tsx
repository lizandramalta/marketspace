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
  useToken,
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
import { ScrollView, TouchableOpacity } from 'react-native'
import { PaymentMethods, ProductQueryParamsDTO } from '../dtos/ProductDTO'
import { Button } from './Button'
import { ConditionTagFilter } from './ConditionTagFilter'
import { Icon } from './Icon'
import { AcceptTradeSwitchInput } from './AcceptTradeSwitchInput'
import { PaymentMethodsCheckboxInput } from './PaymentMethodsCheckboxInput'

export type FiltersRef = {
  showMoreFilters: () => void
}

type FiltersProps = {
  onApplyFilters: (filters: ProductQueryParamsDTO) => void
  onResetFilters: () => void
  activeFilters?: ProductQueryParamsDTO
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
    const handleBottomSheetBackgroundColor = useToken('colors', 'gray600')

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
        handleStyle={{
          backgroundColor: handleBottomSheetBackgroundColor
        }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <VStack py="$8" px="$6" bgColor="$gray600" flex={1} gap="$6">
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontFamily="$heading" color="$gray100" fontSize="$xl">
                Filtrar anúncios
              </Text>
              <TouchableOpacity onPress={handleClose}>
                <Icon as="X" color="gray400" />
              </TouchableOpacity>
            </HStack>
            <ScrollView
              style={{ flexGrow: 1 }}
              contentContainerStyle={{
                gap: 24
              }}
              showsVerticalScrollIndicator={false}
            >
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
              <AcceptTradeSwitchInput
                value={acceptTradeFilter}
                onToggle={() => setAcceptTradeFilter(!acceptTradeFilter)}
              />
              <PaymentMethodsCheckboxInput
                value={paymentMethodsFilter}
                onChange={(keys) => {
                  setPaymentMethodsFilter(keys)
                }}
              />
            </ScrollView>

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
