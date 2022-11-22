import React, { useState } from 'react';
import { 
    IonButton, 
    IonCol,
    IonContent,
    IonCard,
    IonProgressBar,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonImg,
    IonInput, 
    IonItem, 
    IonLabel, 
    IonNote,
    IonRouterLink,
} from '@ionic/react';
import './splashscreen.css';
import walktober from '../../resources/Walktober.png'


const Splashscreen: React.FC = () => {

    return (
        <IonContent>
            <IonCard>
                <IonImg src={walktober}></IonImg>
                <IonProgressBar type="indeterminate"></IonProgressBar>
            </IonCard>
        </IonContent>
    )
}

export default Splashscreen;