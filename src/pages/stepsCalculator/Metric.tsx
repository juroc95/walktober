import React, { ReactElement } from 'react';

import {
  IonCol,
  IonInput,
  IonItem,
  IonLabel
} from '@ionic/react';

const Metric = (props: any): ReactElement => {
  const imperial = (<>

        <IonCol size="auto">
            <IonItem >
                <IonLabel id="miles" position="floating" >Number of miles</IonLabel>
                <IonInput min="0.01" type="number" step="0.01" onInput={
                    (event: any) => {
                      props.updateSteps(event);
                    }
                }></IonInput>
            </IonItem>
        </IonCol>

        <IonCol size="auto">
            {/* <IonItem>
                <IonLabel id="miles" position="floating" >Number of miles</IonLabel>
                <IonInput type="number" onChange={
                    (event: any) => {
                        props.updateSteps(event);
                    }
                }></IonInput>
                <IonRouterLink slot="helper" href="./manualLoggingSteps">Return to steps logging</IonRouterLink>
            </IonItem> */}
            <IonItem>
                <IonLabel id='height-ft' position="floating">Optional: Height ft</IonLabel>
                <IonInput min='1' type="number" onInput={
                    (event: any) => {
                      props.HeightFt(event);
                    }
                }></IonInput>
            </IonItem>
        </IonCol>
        <IonCol size="auto">
            <IonItem>
                <IonLabel id='height-in' position="floating">Optional: Height In</IonLabel>
                <IonInput min='0.5' type="number" step="0.5" onInput={
                    (event: any) => {
                      props.HeightIn(event);
                    }
                }></IonInput>
            </IonItem>
        </IonCol>

    </>);
  const metricVal = (<>
        <IonCol size="auto">
            <IonItem >
                <IonLabel id="miles" position="floating" >Number of kilometers</IonLabel>
                <IonInput min='0.01' type="number" step="0.01" onInput={
                    (event: any) => {
                      props.updateStepsKm(event);
                    }
                }></IonInput>
            </IonItem>
        </IonCol>
        <IonCol size="auto">
            <IonItem>
                <IonLabel id='height-cm' position="floating">Optional: Height cm</IonLabel>
                <IonInput min='0.1' type="number" step="0.1" onInput={
                    (event: any) => {
                      props.HeightCm(event);
                    }
                }></IonInput>
            </IonItem>
        </IonCol>

    </>);
  return (
    props.metric ? metricVal : imperial
  );
};

export default Metric;
