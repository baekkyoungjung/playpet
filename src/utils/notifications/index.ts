import firestore from '@react-native-firebase/firestore';
import * as Sentry from "@sentry/react-native";
import { Collections } from '../../models/src/collections';
import { Notification } from './../../hooks/useUserNotifications';
import { firebaseTimeStampToStringStamp } from './../system/index';

export const hasNewNotification = async (uid: string) => {
    try {
        const docs = await firestore()
            .collection(Collections.Notifications)
            .where('toUid', '==', uid)
            .where('read', '==', false)
            .get()
        return docs.size > 0
    } catch (e) {
        Sentry.captureException(e)
        return false
    }
    
}

export const addListenerNotification = async (uid: string, onSnapCallback: Function) => {
    const listener = firestore()
        .collection(Collections.Notifications)
        .where('toUid', '==', uid)
        .onSnapshot(snapshot => {
            onSnapCallback(snapshot.docs.map(doc => {
                const data = doc.data() as Notification
                return {
                    ...data,
                    createdAt: firebaseTimeStampToStringStamp(data.createdAt),
                    expiredAt: firebaseTimeStampToStringStamp(data.expiredAt),
                    updatedAt: firebaseTimeStampToStringStamp(data.updatedAt),
                }
                
            }))
            // if (!data) {
            //     onSnapCallback()
            // }
            // onSnapCallback({
            //     ...data,
            //     createdAt: firebaseTimeStampToStringStamp(data.createdAt),
            //     expiredAt: firebaseTimeStampToStringStamp(data.expiredAt),
            //     updatedAt: firebaseTimeStampToStringStamp(data.updatedAt),
            // });
        }
    );
    return listener;
};