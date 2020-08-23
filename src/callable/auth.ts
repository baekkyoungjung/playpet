import { SignType } from '../models';
import functions from '@react-native-firebase/functions';

enum callable {
    CreateUser = 'createUserCollection',
    Withdraw = 'withdraw',
}
interface createUserCollectionParams {
    uid: string;
    method?: SignType;
};
export const createUserCall = async (params: createUserCollectionParams) => {
    await functions().httpsCallable(callable.CreateUser)(params);
};
export const withdrawCall = async () => await functions().httpsCallable(callable.Withdraw)();
export const aoeuaoeu = async () => await functions().httpsCallable('aoeuaoeu')();
export const videoTest = async (url: string) => await functions().httpsCallable('haha')(url);