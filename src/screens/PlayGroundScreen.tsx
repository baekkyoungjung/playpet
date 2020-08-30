import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components/native';
import Card from '../components/Card';
import Carousel from 'react-native-snap-carousel';
import { deviceSize, loadPlaygroundCards, CardModel } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { playgroundActions } from '../store/playgroundReducer';
import { RootState } from '../store/rootReducers';
import { useIsFocused } from '@react-navigation/native';
import useCardLikes from '../hooks/useCardLikes';
// import usePlayOptions from '../hooks/usePlayOptions';

const BOTTOM_NAV_BAR_HEIGHT = 65;
const SLIDER_HEIGHT = deviceSize().height - BOTTOM_NAV_BAR_HEIGHT;
export interface RenderItemProps {
    item: CardModel;
    index: number;
}
export default function PlayGroundScreen() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { cards } = useSelector((state: RootState) => state.playground);
    const { uid } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const { myLikes } = useCardLikes();
    // const { isPlaySound, toggleIsPlaySound } = usePlayOptions()

    useEffect(() => {
        if (!isFocused) {
            return;
        }
        const loadCards = async () => {
            const response = await loadPlaygroundCards({});
            console.log("response---------", response)
            dispatch(playgroundActions.setCards(response));
        };
        loadCards();

    }, [isFocused]);

    const renderItem = useCallback(({ item, index }: RenderItemProps) => {
        return (
            <Card
                {...item}
                uid={uid}
                isLike={myLikes.includes(item.id)}
                renderRange={renderRange(activeIndex, index)}
                onPlayActive={activeIndex === index}
            />
        );
    }, [activeIndex, myLikes]);

    return (
        <PlayGroundBlock>
            <Carousel
                data={cards}
                renderItem={renderItem}
                sliderHeight={SLIDER_HEIGHT}
                itemHeight={SLIDER_HEIGHT}
                vertical={true}
                onSnapToItem={useCallback((slideIndex: number) => setActiveIndex(slideIndex), [])}
            />
        </PlayGroundBlock>
    );
};

const renderRange = (activeIndex: number, index: number) => {
    // [1~10]
    // index: 2
    // activeIndex : 8
    // range 는 +-2 총 5카드
    // 총 7카드만이 component가 load 된다
    return (
        activeIndex === (index - 2)
        || activeIndex === (index - 1)
        || activeIndex === index
        || activeIndex === (index + 1)
        || activeIndex === (index + 2)
    );
    // index activeIndex
};

const PlayGroundBlock = styled.View`
    flex: 1;
    background-color: #000;
`;
