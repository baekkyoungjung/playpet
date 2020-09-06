import React, { useMemo, useState, useEffect } from "react";
import styled, { css } from 'styled-components/native'
import Animated, { Value, interpolate } from 'react-native-reanimated'
import { Icon, Button, Image } from 'react-native-elements'
import { deviceSize, setCardLike } from '../../utils'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducers';
import useShare from '../../hooks/useShare';
import { useTheme } from '@react-navigation/native'
import { playgroundActions } from "../../store/playgroundReducer";
import { View, Modal } from "react-native";

const DEVICE_HEIGHT = deviceSize().height

interface Section {
    bounceValue: Value<0>
    id: string
    title: string
    myCards: boolean
}
export default function CardContentSection({
    bounceValue,
    id,
    title,
    myCards,
}: Section) {
    const dispatch = useDispatch()
    const { uid } = useSelector((state: RootState) => state.auth);
    const { myLikes = [] } = useSelector((state: RootState) => state.playground);
    const { popupShare } = useShare({ id, title })
    const isLike = useMemo(() => myLikes.includes(id), [id, myLikes])
    const { bottom } = useSafeAreaInsets();
    const themes = useTheme()
    const [showToastLike, setShowToastLike] = useState(false)

    useEffect(() => {
        if (showToastLike) {
            setTimeout(() => {
                setShowToastLike(false)
            }, 500)
        }
    }, [showToastLike])

    const handleProduct = () => {
        alert('상품클릭')
    }

    const handleAddLikes = () => {
        if (!isLike) {
            setShowToastLike(true)
        }
        const willLikes = isLike ? [...myLikes, uid] : myLikes.filter(like => like != id)
        dispatch(playgroundActions.setMyLikes(willLikes))
        setCardLike({ uid, id, methods: isLike ? 'remove' : 'add' })
    }

    return (
        <CardSectionBlock
            bottom={myCards ? 0 : bottom}
            style={{
                height: interpolate(bounceValue, {
                    inputRange: [0, 1],
                    outputRange: [150, DEVICE_HEIGHT / 2],
                })
            }}
        >
            <Modal
                transparent={true}
                visible={showToastLike}
                animated={true}
                animationType="fade"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Icon
                        name='favorite'
                        color="#ff0000"
                        size={120}
                    />
                </View>
            </Modal>
            <FloatingButtonGroup>
                {/* <Icon
                    onPress={toggleIsPlaySound}
                    name={isPlaySound ? 'volume-up' : 'volume-off'}
                    color="#fff"
                    size={22}
                    style={{
                        padding: 8
                    }}
                /> */}
                {/* <DividerBlock marginTop={8} /> */}
                <Icon
                    onPress={handleAddLikes}
                    name={isLike ? 'favorite' : 'favorite-border'}
                    color="#fff"
                    size={22}
                    containerStyle={{
                        marginRight: 20,
                    }}
                />
                <Icon
                    onPress={popupShare}
                    name='share'
                    color="#fff"
                    size={22}
                />
                {/* <LikeNumber>{likes}</LikeNumber> */}
            </FloatingButtonGroup>
            <Content>
                <BodySection>
                    <Header>
                        <TitleText header>바우와우</TitleText>
                        {!myCards &&
                            <Button
                                title="+팔로우"
                                titleStyle={{
                                    color: themes.colors.primary,
                                    fontSize: 12,
                                }}
                                buttonStyle={{
                                    backgroundColor: themes.colors.background,
                                    padding: 4,
                                }}
                            />
                        }
                    </Header>
                    <Main>
                        <TitleText>{title}</TitleText>
                    </Main>
                </BodySection>
                <Aside>
                    <Image
                        onPress={handleProduct}
                        source={{ uri: 'https://contents.lotteon.com/itemimage/LM/88/01/11/51/14/13/0_/00/1/LM8801115114130_001_1.jpg/dims/resizef/824X824' }}
                        style={{ width: 65, height: 65 }}
                        resizeMode="cover"
                    />
                </Aside>
            </Content>
        </CardSectionBlock>
    )
}

const CardSectionBlock = styled(Animated.View) <{ bottom: number }>`
    overflow: visible;
    position: absolute;
    z-index: 3;
    flex-direction: column;
    min-height: 180px;
    bottom: ${({ bottom }) => bottom + 8}px;
    width: 100%;
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.05);
`

const FloatingButtonGroup = styled.View`
    flex-direction: row;
`


const Content = styled.View`
    margin-top: 20px;
    flex-direction: row;
`

const LikeNumber = styled.Text``

const BodySection = styled.View`
    flex-direction: column;
    flex: 2;
`

const Header = styled.View`
    flex-direction: row;
`

const Main = styled.View`
    margin-top: 16px;
    flex-direction: row;
    font-size: 12px;
    line-height: 14px;
`

const Aside = styled.View`
    flex: 1;
    align-items: flex-end;
    /* justify-content: center; */
`

const TitleText = styled.Text<{ header?: boolean }>`
    color: #fff;
    flex: 1;
    ${({ header }) => header && css`
        font-size: 18px;
        font-weight: 800;
    `};
`
