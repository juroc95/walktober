import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
  , IonButton
} from '@ionic/react';
import './HealthApp.css';
import { HealthKit } from '@awesome-cordova-plugins/health-kit';

const HealthApp: React.FC = () => {
  const available = async () => {
    await HealthKit.available()
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const requestAuthorization = async () => {
    const supportedTypes = [
      'HKQuantityTypeIdentifierHeight',
      'HKQuantityTypeIdentifierStepCount',
      'HKQuantityTypeIdentifierDistanceWalkingRunning',
      'HKCategoryTypeIdentifierSleepAnalysis',
      'HKQuantityTypeIdentifierDietaryEnergyConsumed',
      'HKQuantityTypeIdentifierDietaryFatTotal'
    ];
    await HealthKit.requestAuthorization({
      readTypes: supportedTypes,
      writeTypes: supportedTypes
    })
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const checkAuthStatus = async () => {
    HealthKit.checkAuthStatus({
      type: 'HKQuantityTypeIdentifierHeight'
    })
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const readSteps = async () => {
    const date = new Date();
    const stepOptions = {
      startDate: new Date(date.getFullYear(), date.getMonth(), 1),
      endDate: new Date(),
      unit: 'count',
      sampleType: 'HKQuantityTypeIdentifierStepCount'
    };
    await HealthKit.querySampleType(stepOptions)
      .then((data: any) => {
        const totalStep = data.reduce((a: any, b: { quantity: any }) => a + b.quantity, 0);
        alert(JSON.stringify(totalStep));
      })
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Health App Integration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Health App Integration</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h2>Apple Health</h2>
        <IonButton expand="block" onClick={available}>
          Health Available?
        </IonButton>
        <IonButton expand="block" onClick={requestAuthorization}>
          Request Auth
        </IonButton>
        <IonButton expand="block" onClick={checkAuthStatus}>
          Check Auth Status
        </IonButton>
        <IonButton expand="block" onClick={readSteps}>
          Read Step Count
        </IonButton>
        <h2>Fitbit</h2>
        <h2>Garmin</h2>
        <h2>Google Fit</h2>
        <h2>Misfit</h2>
        <h2>Omron</h2>
        <h2>Polar</h2>
        <h2>Samsung Health</h2>
        <h2>Withings (Nokia)</h2>
        <h2>Strava</h2>
      </IonContent>
    </IonPage>
  );
};

export default HealthApp;
