// note to self, use the useEffect hook to pull in data from the server forthe steps logged etc.
// useEffect will conditinaly run a passed in function, so it will not run with every state change.
// maybe use isloading useState and render if the user has steps recorded or not with &&&

import React, { useState, useEffect, useCallback } from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow
} from '@ionic/react';
import './manualLoggingSteps.css';

// function Record (date: Date, stepslogged: number): {} {
//   return { time: Date, stepslogged };
// }

const DummyDataForTesting = [
  { time: new Date('2021-05-05'), stepsLogged: 100 },
  { time: new Date('2021-06-05'), stepsLogged: 200 },
  { time: new Date('2021-07-05'), stepsLogged: 300 },
  { time: new Date('2021-08-05'), stepsLogged: 400 },
  { time: new Date('2021-09-05'), stepsLogged: 500 },
  { time: new Date('2021-10-05'), stepsLogged: 600 },
  { time: new Date('2021-11-05'), stepsLogged: 700 },
  { time: new Date('2021-12-05'), stepsLogged: 800 }
];

const ManualSteps: React.FC = () => {
  const getRecordsFromDB = useCallback(async () => {
    // datesFromDB = callToDB();
    // stepsFromDB = callToDB();
    /* for number of dates in datesFromDB{
        let newReccord: Record;
        newRecord.time = dates.at(index);
        newRecord.stepsWaled = stepds.at(index);
        pastRecords.append(newReccord);
    }
    */
    return; // only temporary
    try {
      const response = await fetch('https://some_firebase_address');
      if (!response.ok) {
        throw new Error('couldnt get data');
      }
      const data = await response.json();
      const transformedData = data.results.map((item: any) => {
        return {
          logDate: item.logedDate,
          steps: item.logedSteps
        };
      });
    } catch (error: any) {
      console.log(error);
      return;
    }
    // here we would add the data to databasse etc
  }, []);

  const sendNewLog = useCallback(async (newLog: any) => {
    return; // only temporary
    try {
      const response = await fetch('https://some_firebase_address',
        {
          method: 'POST',
          body: JSON.stringify(newLog),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) {
        throw new Error('could not update DB with new log');
      }
    } catch (error: any) {
      console.log(error);
    }
  }, []);
    // use effect called to load in the data for the logs
  useEffect(
    () => { getRecordsFromDB; }
    , []);

  let stepsToLog: number;
  let date: Date;
  const [stepLogs, setStepLogs] = useState(DummyDataForTesting); // state update so that we load in new step logs when steps are added.
  // let pastRecordDates: Array: Date;
  let minDate: Date;
  let maxDate: Date;

  function DisplayRecords (): any {
    if (stepLogs.length > 0) {
      return (
                <>
                    <IonGrid>
                        <IonRow>
                            <IonCol >Date:</IonCol>
                            <IonCol >Steps:</IonCol>
                        </IonRow>

                        {
                            stepLogs.map(item => (
                                <IonRow key={Math.random()}>
                                    <IonCol >{item.time.toLocaleDateString('en-US')}</IonCol>
                                    <IonCol >{item.stepsLogged}</IonCol>
                                </IonRow>
                            ))
                        }
                    </IonGrid>
                </>
      );
    } else {
      return (
                <>
                    <IonGrid>
                        <IonRow>
                            <IonCol>Date:</IonCol>
                            <IonCol>Steps:</IonCol>
                        </IonRow>
                    </IonGrid>
                </>
      );
    }
  }

  const submitHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    const stepsFromForm = document.querySelector('#steps');
    const timeFromForm = document.querySelector('#time');
    if ((stepsFromForm != null) && (timeFromForm != null)) {
      // date = new Date((timeFromForm as HTMLInputElement).value.toString().replace(/-/g, '\/')); need to test if this gets mad at me in new change
      date = new Date((timeFromForm as HTMLInputElement).value.toString().replace(/-/g, '/'));
      stepsToLog = Number(((stepsFromForm as HTMLInputElement).value).toString());
      setStepLogs((prev) => {
        return [
          ...prev,
          { time: date, stepsLogged: stepsToLog }
        ];
      });
    }
    console.log((stepsFromForm as HTMLInputElement).value);
    console.log((timeFromForm as HTMLInputElement).value);
    const theStepsLogForm = document.querySelector('#stepLog');
    if (theStepsLogForm != null) {
      (theStepsLogForm as HTMLFormElement).reset();
    }
  };

  // note to sef for refs const thingRef = useRef<HTMLIonInputElement>(null);
  // ref={thingRef}

  return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Steps log
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <form id='stepLog' onSubmit={(event: React.FormEvent) => submitHandler(event)}>
                    <IonItem>
                        <IonLabel position="floating">Number of steps</IonLabel>
                        <IonInput min='1' id='steps' type="number" onInput={
                            (event: any) => {
                              // if (storeSteps(event) == false) {
                              /* Print an error msg */

                              // }
                            }
                        }></IonInput>
                        <IonRouterLink slot="helper" href="./stepsCalculator">Need help calculating steps?</IonRouterLink>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating"></IonLabel>
                        <IonInput id='time' type="date" onInput={
                            (event: any) => {
                              // storeNewDate(event);
                            }
                        }></IonInput>
                    </IonItem>
                    <IonCol>
                        <IonButton type="submit">Submit</IonButton>
                    </IonCol>
                </form>
                <IonItem>{DisplayRecords()}</IonItem>

            </IonContent>
        </>
  );
};

export default ManualSteps;
