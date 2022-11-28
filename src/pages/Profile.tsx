import { 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonImg, 
    IonItem, 
    IonText, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonButton, 
    IonPage
} from '@ionic/react';
import './Profile.css';

const Profile: React.FC = () => {
    let profilePic: string;
    let name: string;
    let email: string;
    let joinDate: Date;
    let joinDateString: string;
    let totalDistance: number; // Currently in miles
    // let badges;

    function GetRecords (){
        // TODO: Get information from database 
        profilePic = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kristen_Stewart_in_2022.JPG/1280px-Kristen_Stewart_in_2022.JPG";
        name = "Kristen Stewart";
        email = "stewart@pdx.edu";
        joinDate = new Date("2015-03-25");
        joinDateString = joinDate.toLocaleDateString();
        totalDistance = 500;
    }
    
    function DisplayRecords(){
        GetRecords()
        return (
            <IonGrid>
                <IonRow>
                    <IonCol size="auto">
                        <IonText>
                            <IonImg className = "ProfilePic" src={profilePic} alt="Our lord and savior Kristen Stewart"></IonImg>
                            <h2>{name}</h2>
                            <p>{email}</p>
                            <IonButton>Change Password</IonButton>
                        </IonText>
                    </IonCol>
                    <IonCol>
                        <IonText>
                            <p>Joined on {joinDateString}</p>
                            <p>{totalDistance} miles walked in total</p>
                            <h6>Badges:</h6>
                            {/* TODO: Put badges here */}
                        </IonText>
                    </IonCol>
                </IonRow>
            </IonGrid>
        )
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>{DisplayRecords()}</IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Profile;