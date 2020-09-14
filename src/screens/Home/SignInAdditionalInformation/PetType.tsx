import { useTheme } from "@react-navigation/native"
import React, { useMemo, useState } from "react"
import { View } from "react-native"
import { SearchBar } from "react-native-elements"
import { ScrollView } from "react-native-gesture-handler"
import ButtonGroups from "../../../components/ButtonGroups"
import ListItem from "../../../components/ListItem"
import { DividerBlock, Text } from "../../../styles"
import { Step } from "../SignInAdditionalInformation"

export const PET_TYPE = [
    'DOG',
    'CAT',
    'ETC',
    'NOT_YET'
]
export const SIZE = [
    'SMALL',
    'MEDIUM',
    'LARGE',
]
export default function PetType({ currentStep, petType, setPetType, searchPetType, setSearchPetType, size, setSize, valid }: {
    currentStep: Step
    petType: string
    setPetType: React.Dispatch<React.SetStateAction<string>>
    searchPetType: string
    setSearchPetType: React.Dispatch<React.SetStateAction<string>>
    size: string
    setSize: React.Dispatch<React.SetStateAction<string>>
    valid: boolean
}) {
    if (currentStep !== Step.PET_TYPE) {
        return null
    }

    const [searchPetTyping, setSearchPetTyping] = useState('')
    const searchedPetType = useMemo(() => {
        let types = ['']
        switch (petType) {
            case 'DOG': {
                types = DOG_TYPE
                break;
            }
            case 'CAT': {
                types = CAT_TYPE
                break;
            }
            default:
            case 'ETC': {
                break;
            }
        }

        return types.filter(type => type.includes(searchPetTyping))
    }, [petType, searchPetTyping])

    const themes = useTheme();

    return (
        <View>
            <DividerBlock marginBottom={8} />
            <Text bold size={16}>어떤 반려동물인가?</Text>
            <ButtonGroups
                buttons={PET_TYPE}
                onSelect={setPetType}
                containerStyle={{
                    width: '100%',
                }}
            />
            {petType && petType !== 'NOT_YET' &&
                <>
                    <SearchBar
                        placeholder="품종을 선택해주세요"
                        onChangeText={setSearchPetTyping}
                        value={searchPetTyping}
                    />
                    <ScrollView style={{ maxHeight: 300,}}>
                        {searchedPetType.map(type => {
                            return (
                                <ListItem
                                    key={type}
                                    title={type}
                                    onPress={() => setSearchPetType(type)}
                                    titleStyle={{
                                        color: type === searchPetType ? themes.colors.primary : '#333',
                                    }}
                                />
                            )
                        })}
                    </ScrollView>
                </>
            }
            {Boolean(petType === 'DOG' && searchPetType.length) &&
            <>
                <DividerBlock marginBottom={8} />
                <Text bold size={16}>견종 사이즈?</Text>
                <ButtonGroups
                    buttons={SIZE}
                    onSelect={setSize}
                    containerStyle={{
                        width: '100%',
                    }}
                />
            </>}
        </View>
    )
}

const DOG_TYPE = [
    '고든 세터',
    '골든 리트리버',
    '그레이트 데인',
    '그레이트 스위스 마운틴 도그',
    '그레이트 피레니즈',
    '그레이하운드',
    '글렌 오브 이말 테리어',
    '기슈견',
    '네오폴리탄 마스티프',
    '노르웨지안 부훈트',
    '노르웨이 엘크 하운드',
    '노리치 테리어',
    '노바 스코셔 덕 톨링 레트리버',
    '노퍽 테리어',
    '뉴펀들랜드',
    '닥스훈트',
    '달마시안',
    '댄디 딘몬트 테리어',
    '도고 까나리오',
    '도그 드 보르도',
    '도베르만 핀셔',
    '도사견',
    '동경이',
    '라사압소',
    '라포니안 허더',
    '래브라도 레트리버',
    '레이크랜드 테리어',
    '로디지아 리지백',
    '로첸',
    '로트와일러',
    '마스티프',
    '맨체스터 테리어',
    '몰티즈',
    '미니어처 불 테리어',
    '미니어처 슈나우저',
    '미니어처 핀셔',
    '바센지',
    '바셋 하운드',
    '버니즈 마운틴 도그',
    '베들링턴 테리어',
    '벨기에 말리노이즈',
    '벨기에 시프도그',
    '벨기에 테뷰런',
    '벨지안 그리펀',
    '벨지안 셰퍼드 독',
    '보더콜리',
    '보더 테리어',
    '보르조이',
    '보스롱',
    '보스턴 테리어',
    '복서',
    '볼로네즈',
    '부비에 데 플랑드르',
    '불도그',
    '불 마스티프',
    '불 테리어',
    '브뤼셀 그리펀',
    '브리아드',
    '브리타니',
    '블랙 러시안 테리어',
    '블랙 앤드 탄 쿤하운드',
    '블러드 하운드',
    '비글',
    '비숑 프리제',
    '비어디드 콜리',
    '비즐라',
    '사모예드',
    '살루키',
    '삽살개',
    '서식스 스패니얼',
    '세인트 버나드',
    '셔틀랜드 시프도그',
    '소프트 코티드 휘튼 테리어',
    '스무드 폭스 테리어',
    '스웨디쉬 발훈트',
    '스카이 테리어',
    '스코티시 디어하운드',
    '스코티시 테리어',
    '스키퍼키',
    '스태퍼드셔 불 테리어',
    '스탠더드 슈나우저',
    '스패니쉬 그레이 하운드',
    '스패니쉬 마스티프',
    '스피노네 이탈리아노',
    '스피츠',
    '시바 이누',
    '시베리언 허스키',
    '시추',
    '시코쿠견',
    '실리엄 테리어',
    '실키 테리어',
    '아나톨리아 셰퍼드',
    '아메리칸 불도그',
    '아메리칸 스태퍼드셔 테리어',
    '아메리칸 아키다',
    '아메리칸 에스키모 도그',
    '아메리칸 워터 스패니얼',
    '아메리칸 코커 스패니얼',
    '아메리칸 폭스하운드',
    '아이리시 소프트코티드 휘튼 테리어',
    '아이리시 레드 앤드 화이트 세터',
    '아이리시 세터',
    '아이리시 울프 하운드',
    '아이리시 워터 스패니얼',
    '아이리시 테리어',
    '아키타',
    '아펜핀셔',
    '아프간 하운드',
    '알래스칸 맬러뮤트',
    '에스트렐라 마운틴 독',
    '에어데일 테리어',
    '오스트레일리안 실키 테리어',
    '오스트레일리안 켈피',
    '오스트레일리언 셰퍼드',
    '오스트레일리언 캐틀 도그',
    '오스트레일리언 테리어',
    '오터 하운드',
    '올드 잉글리시 시프도그',
    '와이머라너',
    '와이어 폭스 테리어',
    '와이어헤어드 포인팅 그리펀',
    '요크셔 테리어',
    '웨스트 하이랜드 화이트 테리어',
    '웰시 스프링어 스패니얼',
    '웰시 코기',
    '웰시 테리어',
    '이비전 하운드',
    '이탤리언 그레이하운드',
    '잉글리시 세터',
    '잉글리시 스프링어 스패니얼',
    '잉글리시 코커 스패니얼',
    '잉글리시 토이 스패니얼',
    '잉글리시 폭스하운드',
    '자이언트 슈나우저',
    '재패니즈 친',
    '재패니즈 스피츠',
    '잭 러셀 테리어',
    '저먼 셰퍼드',
    '저먼 쇼트헤어드 포인터',
    '저먼 와이어헤어드 포인터',
    '저먼 핀셔',
    '저먼 헌팅 테리어',
    '진돗개',
    '차우차우',
    '차이니즈 샤페이',
    '차이니즈 크레스티드',
    '체서피크 베이 레트리버',
    '치와와',
    '카디건 웰시 코기',
    '카발리에 킹 찰스 스패니얼',
    '컬리코티드 레트리버',
    '케리 블루 테리어',
    '케언 테리어',
    '케이넌 도그',
    '케이스혼트',
    '코몬도르',
    '코커 스패니얼',
    '코튼 드 툴리어',
    '콜리',
    '쿠바스',
    '쿠이커혼제',
    '클럼버 스패니얼',
    '토이 폭스 테리어',
    '티베탄 마스티프',
    '티베탄 스패니얼',
    '티베탄 테리어',
    '파라오 하운드',
    '파슨 러셀 테리어',
    '파피용',
    '퍼그',
    '페키니즈',
    '펨브록 웰시 코기',
    '포르투기즈 워터 도그',
    '포메라니안',
    '포인터',
    '폴리시 롤런드 시프도그',
    '푸들',
    '푸미',
    '풀리',
    '풍산개',
    '프렌치 불도그',
    '프티 바세 그리퐁 방댕',
    '플랫코티드 레트리버',
    '플롯 하운드',
    '피니시 스피츠',
    '피레니안 마스티프',
    '피레니안 쉽독',
    '피레니언 셰퍼드',
    '필드 스패니얼',
    '해리어',
    '허배너스',
    '홋카이도 이누',
    '휘핏',
]

const CAT_TYPE = [
    '노르웨이숲',
    '네바 머스커레이드',
    '네벨룽',
    '데본렉스',
    '도메스틱 숏헤어',
    '도메스틱 롱헤어',
    '돈스코이',
    '드래곤 리',
    '라가머핀',
    '라팜',
    '랙돌',
    '러시안 블루',
    '라이코이',
    '람킨 드월프',
    '맹크스',
    '메인쿤',
    '민스킨',
    '먼치킨(고양이)',
    '미뉴에트',
    '메콩 밥테일',
    '발리니즈',
    '버만',
    '버미즈',
    '벵갈',
    '봄베이',
    '브리티시 쇼트헤어',
    '브리티시 롱 헤어',
    '밤비노',
    '버밀라',
    '시베리아',
    '샴',
    '샤트룩스',
    '셀커크 렉스',
    '소말리',
    '스코티시 폴드',
    '스핑크스',
    '싱가퓨라',
    '스노우슈',
    '사바나',
    '아메리칸 밥테일',
    '아메리칸 쇼트헤어',
    '아메리칸 와이어헤어',
    '아메리칸 컬',
    '아비시니안',
    '오리엔탈쇼트헤어',
    '오리엔탈롱헤어',
    '오시캣',
    '유러피안버미즈',
    '이그저틱',
    '이집션마우',
    '엑조틱 쇼트헤어',
    '자바니즈',
    '재패니즈 밥테일',
    '쵸지',
    '차이니즈 리 와우',
    '치토',
    '컬러포인트쇼트헤어',
    '코니시 렉스',
    '코리안 숏헤어',
    '코랫',
    '터키시 반',
    '터키시 앙고라',
    '통키니즈',
    '토이거',
    '페르시안',
    '픽시 밥',
    '하바나브라운',
    '하이랜더',
    '히말라얀',
]