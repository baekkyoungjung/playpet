import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/rootReducers';

import SignUpAgreeTermsModal from './AuthScreen/SignUpAgreeTermsModal';
// import SocialSignIn from './AuthScreen/SocialSignIn';
import ProfileSection from '../components/ProfileSection';
import MyCards from '../components/MyCards';
import ListItem from '../components/ListItem';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import ButtonGroups from '../components/ButtonGroups';
import { Layout, Text, DividerBlock } from '../styles';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import i18n from 'i18n-js';

export enum ItemList {
    MEDIA,
    ITEM,
}
export default function AuthScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [listType, setListType] = useState(ItemList.MEDIA);
    const { isLogged } = useSelector((state: RootState) => state.auth);
    const navigation = useNavigation();

    if (!isLogged) {
        return (
            <ScrollView>
                <SignInButton onPress={() => navigation.navigate('AppLogin')}>
                    <Text
                        bold
                        size={20}
                    >
                        {i18n.t('common.loginWithSignUp')}
                    </Text>
                    <Icon
                        name="keyboard-arrow-right"
                    />
                </SignInButton>
                <SignInButton onPress={() => navigation.navigate('AppLogin')}>
                    <Text
                        size={18}
                    >
                        {i18n.t('product.recentViewed')}
                    </Text>
                    <Icon
                        name="keyboard-arrow-right"
                    />
                </SignInButton>
                <DividerBlock
                    backgroundColor="#e9e9e9"
                    marginTop={16}
                    marginBottom={16}
                    height={1}
                />
                <Section>
                    <Text padding="0 16px" size={18} bold>고객센터</Text>
                    <ListItem
                        title='공지사항'
                        onPress={() => { }}
                        rightIcon={<Icon
                            name="keyboard-arrow-right"
                        />}
                    />
                    <ListItem
                        title='불편사항 접수'
                        onPress={() => { }}
                    />
                </Section>
                <Section>
                    <Text padding="0 16px" size={18} bold>앱 설정</Text>
                    <ListItem
                        title='푸시 설정'
                        onPress={() => { }}
                        rightIcon={<Icon
                            name="keyboard-arrow-right"
                        />}
                    />
                    <ListItem
                        title='캐시 데이터 지우기'
                        onPress={() => { }}
                    />
                    <ListItem
                        title='동영상 자동재생'
                        onPress={() => { }}
                    />
                </Section>
            </ScrollView>
        )
    }

    return (
        <ScrollView>
            <ProfileSection />
            <Layout alignItems='center'>
                <ButtonGroups
                    onSelect={setListType}
                    buttons={['영상', '아이템']}
                    containerStyle={{
                        width: '100%',
                    }}
                />
            </Layout>
            <MyCards
                listType={listType}
            />
            <SignUpAgreeTermsModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </ScrollView>
    );
};

const AuthBlock = styled.View`
`;

const Section = styled.View`
    margin-top: 16px;
    /* padding-horizontal: 16px; */
`;

const Hamburger = styled(Icon)`
    padding: 8px;
`;

const SignInButton = styled.TouchableOpacity`
    padding: 16px;
    flex-direction: row;
    justify-content: space-between;
`;