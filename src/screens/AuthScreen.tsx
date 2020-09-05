import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components/native'
import ProfileSection from '../components/ProfileSection'
import MyCards from '../components/MyCards'
import ListItem from '../components/ListItem'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Icon, Image } from 'react-native-elements'
import ButtonGroups from '../components/ButtonGroups'
import { Layout, Text, DividerBlock } from '../styles'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducers'
import i18n from 'i18n-js'
import { ItemList } from '../models'
import { View } from 'react-native'
import { linkingUrl } from '../utils'

export default function AuthScreen() {
    const [listType, setListType] = useState(ItemList.MEDIA)
    const { isLogged } = useSelector((state: RootState) => state.auth)
    const navigation = useNavigation()

    return (
        <ScrollView>
            <ProfileSection />
            <ListItem
                title='영상 더보기'
                titleStyle={{
                    fontSize: 18,
                    fontWeight: 'bold'
                }}
                onPress={() => navigation.navigate('AppSettings')}
                rightIcon={<Icon name="keyboard-arrow-right" />}
            />
            <DividerBlock height={4} />
            <MyCards
                listType={listType}
            />
            <SignInButton onPress={() => { }}>
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
                <ListItem
                    title='앱 설정'
                    titleStyle={{
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}
                    onPress={() => navigation.navigate('AppSettings')}
                    rightIcon={<Icon name="keyboard-arrow-right" />}
                />
            </Section>
            <Section>
                <ListItem
                    title='공지사항'
                    onPress={() => { }}
                    rightIcon={<Icon name="keyboard-arrow-right" />}
                />
                <ListItem
                    title='불편사항 접수'
                    onPress={() => { }}
                />
            </Section>
            <Section>
                <ListItem
                    title='고객센터'
                    titleStyle={{
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}
                    onPress={() => linkingUrl('http://pf.kakao.com/_xhxoBIK')}
                    rightIcon={<Image
                        source={require('../../assets/icons/kakao_icon.png')}
                        style={{
                            width: 32,
                            height: 32,
                        }}
                    />}
                />
            </Section>
        </ScrollView>
    )
}

const Section = styled.View`
    margin-top: 16px;
    /* padding-horizontal: 16px; */
`

const SignInButton = styled.TouchableOpacity`
    padding: 16px;
    flex-direction: row;
    justify-content: space-between;
`

const KakaoChannelButton = styled.TouchableOpacity`
    flex-direction: row;
`
