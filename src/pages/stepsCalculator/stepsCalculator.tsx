import React, { useState } from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonToggle
} from '@ionic/react';
import './stepsCalculator.css';
import Metric from './Metric';

const StepsCalculator: React.FC = () => {
  const [metric, setMetric] = useState(false);
  let steps = 0;
  let heightIn = 0; // height inches param
  let heightFt = 0; // height feet param
  const strideConverter = 0.413; // conversion factor for height in inches to average stride in inches
  const cmToIn = 0.393701;
  let heightCm = 0.0; // for our metric friends
  // let time: number;
  const stepsPerMile = 2250;
  let miles: number;
  const kmtom = 0.621371;

  function calculate (ev: Event): number {
    miles = Number((ev.target as HTMLInputElement).value);
    if (miles <= 0) {
      return 0;
    }
    steps = miles * stepsPerMile;
    return steps;
  }

  function calculateKm (ev: Event): number {
    miles = Number((ev.target as HTMLInputElement).value);
    if (miles <= 0) {
      return 0;
    }
    miles *= kmtom;
    steps = miles * stepsPerMile;
    return steps;
  }

  function getHeightFt (ev: Event): number {
    heightFt = Number((ev.target as HTMLInputElement).value);
    if (heightFt <= 0) {
      return 0;
    }
    return heightFt;
  }

  function getHeightIn (ev: Event): number {
    heightIn = Number((ev.target as HTMLInputElement).value);
    if (heightIn <= 0) {
      return 0;
    }
    return heightIn;
  }

  function getHeightcm (ev: Event): number {
    heightCm = Number((ev.target as HTMLInputElement).value);
    if (heightCm <= 0) {
      return 0;
    }
    return heightCm;
  }

  function placeHolder (ev: Event): void {
    ev.preventDefault();
    if (metric) { console.log('ASDASDSADASDSADASDQWDQWDQWEAQWEASDAWEAWEASEWAQEDWQDQAW'); }
    const updateSteps = document.querySelector('#result');
    if (updateSteps != null) {
      if (!metric && heightFt > 0) {
        // imperial calculations
        // height in IN * convert = inches per stride
        // IN per stride / 12 = feet per stride
        // 5280 / feet per stride = steps per mile
        steps = miles * (5280 / ((((heightFt * 12) + heightIn) * strideConverter) / 12));
      } else if (metric) {
        if (heightCm === 0.0) { steps = miles * stepsPerMile; } else { steps = miles * (5280 / (((heightCm * cmToIn) * strideConverter) / 12)); }
        console.log('placeholder');
        console.log(steps);
      }
      if (steps.toString() !== 'NaN' && steps !== 0) { updateSteps.innerHTML = Math.round(steps).toString(); } else { updateSteps.innerHTML = '0'; }
    }

    // updateSteps.innerHTML = steps.toString();
  }

  const changeMetricImperial = (): void => {
    const testing = document.getElementById('stepsForm');
    if (testing != null) {
      (testing as HTMLFormElement).reset();
    }
    /// console.log(testing);
    setMetric((prev) => { return !prev; });
    /// console.log(metric);
  };

  return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Steps Calculator
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel >{metric ? 'Metric' : 'Imperial'}</IonLabel>
                    <IonToggle slot="end" onClick={changeMetricImperial}></IonToggle>
                </IonItem>
                <form onSubmit={(event: any) => placeHolder(event)} id="stepsForm">
                    <IonGrid>
                        <IonRow >
                        {<Metric HeightFt={getHeightFt} HeightIn={getHeightIn} HeightCm={getHeightcm} metric={Boolean(metric)} updateSteps={calculate} updateStepsKm={calculateKm} />}
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton type="submit" >Calculate </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow><a><IonRouterLink slot="helper" href="./manualLoggingSteps">Return to steps logging</IonRouterLink></a></IonRow>
                    </IonGrid>
                </form>

                <IonItem id="result">{steps.toLocaleString('en-US')}</IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol size="auto"><IonItem>20 min/mi = Slow walk</IonItem></IonCol>
                        <IonCol size="auto"><IonItem>15 min/mi = Brisk walk</IonItem></IonCol>
                        <IonCol size="auto"><IonItem>12 min/mi = Jog</IonItem></IonCol>
                        <IonCol size="auto"><IonItem>9 min/mi = Run</IonItem></IonCol>
                        <IonCol size="auto"><IonItem>7 min/mi = Fast run</IonItem></IonCol>
                        <IonCol size="auto"><IonItem>5 min/mi = Very fast run</IonItem></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
  );
};

export default StepsCalculator;
