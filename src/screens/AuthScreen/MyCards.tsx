import React, { useCallback, useMemo, useState } from 'react'
import { Icon, Image } from 'react-native-elements'
import styled from 'styled-components/native'
import Card from '../../components/Card'
import PlaypetModal from '../../components/PlaypetModal'
import useLoadMyCards from '../../hooks/useLoadMyCards'
import { ItemList } from '../../models'
import { ListBlock, Text } from '../../styles'
import { deviceSize } from '../../utils'

const DEVICE_WIDTH = deviceSize().width
function MyCards({ listType }: { listType: ItemList }) {
    const { myCards } = useLoadMyCards({})
    const [selectedCard, setSelectedCard] = useState('')

    const renderCards = useCallback(() => {
        if (listType === ItemList.MEDIA) {
            if (!myCards.length) {
                return <Text>올린 영상이 없습니다.</Text>
            }
            return myCards.map(card => (
                <Image
                    onPress={() => setSelectedCard(card.id)}
                    key={card.id}
                    source={{
                        uri: card.contents[0].videoThumbnail,
                    }}
                    resizeMode="cover"
                    style={{
                        width: DEVICE_WIDTH * 0.45,
                        height: 180,
                        marginBottom: 8,
                    }}
                />
            ))
        } else if (listType === ItemList.ITEM) {
            return <Text>올린 영상이 없습니다.</Text>
        }
    }, [myCards, listType])

    const selectedCardData = useMemo(() => {
        return myCards.find(({ id }) => id === selectedCard)
    }, [selectedCard])


    return (
        <MyCardsBlock>
            <ListBlock paddingHorizontal={16}>
                {renderCards()}
            </ListBlock>
            <PlaypetModal
                modalVisible={Boolean(selectedCard.length && selectedCardData)}
                setModalVisible={() => setSelectedCard('')}
                containerStyle={{
                    width: DEVICE_WIDTH,
                    padding: '0',
                }}
            >
                <>
                    <Icon
                        name='close'
                        onPress={() => setSelectedCard('')}
                        containerStyle={{
                            position: 'absolute',
                            right: 16,
                            top: 16,
                            zIndex: 2,
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            padding: 6,
                            borderRadius: 16,
                        }}
                    />
                    {selectedCardData &&
                        <Card
                            {...selectedCardData}
                            myCards
                        />
                    }
                </>
            </PlaypetModal>
        </MyCardsBlock>
    )
}

export default MyCards

const MyCardsBlock = styled.View`
    flex-direction: column;
`