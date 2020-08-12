import { cardImage } from "../CardFormScreen";
import React, { useState } from "react";
import { CardModel, submitCard, firebaseNow } from "../../utils";
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
import { Button } from 'react-native-elements';

interface Submit {
    cardImages: cardImage[];
    uid: string;
    title: string;
    description: string;
    tags: string[];
    onSubmitCallback: Function;
}
function SubmitButton({ cardImages, uid, title, description, tags, onSubmitCallback }: Submit) {
    const [isSubmitLoading, setSubmitLoading] = useState(false);

    const formSubmit = async () => {
        setSubmitLoading(true);
        const downloadUrls = await startUploadStorage();
        const formData: CardModel = {
            id: '',
            likes: 0,
            status: 'active',
            title,
            description,
            tags,
            uid,
            uploadMedia: cardImages.map((image, index) => ({
                firebaseUrl: downloadUrls[index].url,
                videoThumbnails: downloadUrls[index].thumbnail,
                isVideo: image.isVideo,
                width: image.width,
                height: image.height,
            })),
            createdAt: firebaseNow(),
            updatedAt: firebaseNow(),
        };
        await submitCard(formData);
        setSubmitLoading(false);
        onSubmitCallback();
    };

    const startUploadStorage = async () => {
        return await Promise.all(
            cardImages.map(async (image) => {
                const urls = {
                    url: '',
                    thumbnail: '',
                };
                const reference = firebase.storage().ref(`playground/${uid}_${firebaseNow().seconds}`);
                await reference.putFile(image.uri);
                urls.url = await reference.getDownloadURL();
                if (image.videoThumbnails) {
                    const reference = firebase.storage().ref(`playground/${uid}_${firebaseNow().seconds}_thumbnail.jpg`);
                    await reference.putFile(image.videoThumbnails);
                    urls.thumbnail = await reference.getDownloadURL();
                }
                return urls;
            })
        );
    };
    return (
        <Button
            title="저장"
            disabled={isSubmitLoading}
            onPress={formSubmit}
        />
    );
};

export default SubmitButton;