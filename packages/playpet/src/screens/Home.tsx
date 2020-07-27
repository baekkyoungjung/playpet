import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';

const HomeBlock = styled.View`
    display: flex;
`;

export default function Home() {
    const { profileImage } = useSelector((state: RootState) => state.auth);
    return (
        <SafeAreaView>
            <HomeBlock>
                <Text>홈</Text>
            </HomeBlock>
        </SafeAreaView>
    );
};