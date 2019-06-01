import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {FontAwesome as Icon} from '@expo/vector-icons';
import FBSDK, {LoginManager} from 'react-native-fbsdk';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import firebase from 'firebase';
import {AppAuth} from 'expo';
import {Google} from 'expo';
import InputText from '../Components/InputText';
import {commonStyles} from './styles/styles';
import image from '../assets/Images/ShoeJackCityLogo.png';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../reducers/user/Actions';

// import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import {
    EMAIL_REGIX, //What is this EMAIL_REGIX?
    EMAIL_ALERT,
    PASSWORD_ALERT,
    PASSWORD_MESSAGE,
    FB_ALERT,
    ACCOUNT,
    FORGOT,
    SIGNUP
} from '../utils/constants';

class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        this.checkIfUserIsLoggedIn();
    }

    signInWithFacebook = async () => {

        const appId = '646981779071349';
        const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs

        const {
            type,
            token,
        } = await Expo.Facebook.logInWithReadPermissionsAsync(
            appId,
            {permissions}
        );
        switch (type) {
            case 'success': {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential

                // Do something with Facebook profile data
                // OR you have subscribed to auth state change, authStateChange handler will process the profile data

                return Promise.resolve({type: 'success'});
            }
            case 'cancel': {
                return Promise.reject({type: 'cancel'});
            }
        }
    }

    onSubmit = () => {
        const {
            navigation: {navigate}
        } = this.props;
        if (!EMAIL_REGIX.test(this.state.email)) {
            Alert.alert('Alert', EMAIL_ALERT);
        } else if (this.state.password.length < 6) {
            Alert.alert('Alert', PASSWORD_ALERT);
        } else if (this.state.password.length > 15) {
            Alert.alert('Alert', PASSWORD_MESSAGE);
        } else {
            navigate(ACCOUNT);
        }
    };


    initAsync = async () => {
        try {
            await GoogleSignIn.initAsync({clientId: '863761628819-q1laj1g0mia0pr6o5akfc66s1ia4qj6u.apps.googleusercontent.com'});
        } catch ({message}) {
            alert(`GoogleSignIn.initAsync(): ${message}`);
        }
    };

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            const providerData = firebaseUser.providerData;
            for (let i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.user.id //googleUser.getBasicProfile().getId()
                ) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    };

    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        const unsubscribe = firebase
            .auth()
            .onAuthStateChanged((firebaseUser) => {
                    unsubscribe();
                    // Check if we are already signed-in Firebase with the correct user.
                    if (!this.isUserEqual(googleUser, firebaseUser)) {
                        // Build Firebase credential with the Google ID token.
                        const credential = firebase.auth.GoogleAuthProvider.credential(
                            googleUser.idToken,
                            googleUser.accessToken
                        );
                        // Sign in with credential from the Google user.
                        firebase
                            .auth()
                            .signInAndRetrieveDataWithCredential(credential)
                            .then((result) => {
                                console.log('User is signed in');
                                this.props.setUserID(result.user.uid);
                                this.props.setUserEmail(result.user.email);
                                if (result.additionalUserInfo.isNewUser) {
                                    firebase
                                        .database()
                                        .ref(`/users/${result.user.uid}`)
                                        .set({
                                            gmail: result.user.email,
                                            profile_picture: result.additionalUserInfo.profile.picture,
                                            locale: result.additionalUserInfo.profile.locale,
                                            first_name: result.additionalUserInfo.profile.given_name,
                                            last_name: result.additionalUserInfo.profile.family_name,
                                            username: result.additionalUserInfo.profile.given_name + ' ' + result.additionalUserInfo.profile.family_name,
                                            created_at: Date.now()
                                        })
                                        .then(function (snapshot) {
                                        });
                                } else {
                                    firebase
                                        .database()
                                        .ref(`/users/${result.user.uid}`)
                                        .update({
                                            last_logged_in: Date.now()
                                        });
                                }
                            })
                            .catch((error) => {
                                // Handle Errors here.
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                // The email of the user's account used.
                                const email = error.email;
                                // The firebase.auth.AuthCredential type that was used.
                                const credential = error.credential;
                                // ...
                            });
                    } else {
                        console.log('User already signed-in Firebase.');
                    }
                },
            );
    };
    signInWithGoogleAsync = async () => {
        try {
            const result = await Expo.Google.logInAsync({
                //androidClientId: YOUR_CLIENT_ID_HERE,
                behavior: 'web',
                clientId: '863761628819-q1laj1g0mia0pr6o5akfc66s1ia4qj6u.apps.googleusercontent.com',
                iosClientId: '863761628819-q1laj1g0mia0pr6o5akfc66s1ia4qj6u.apps.googleusercontent.com',
                androidClientId: '863761628819-q1laj1g0mia0pr6o5akfc66s1ia4qj6u.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });


            if (result.type === 'success') {
                this.onSignIn(result);
                return result.accessToken;
            }
            return {cancelled: true};
        } catch (e) {
            return {error: true};
        }
    };

    checkIfUserIsLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('Account');
            } else {
                this.props.navigation.navigate('SignInScreen');
            }
        });
    };

    render() {
        const {width} = Dimensions.get('window');
        const {
            navigation: {navigate}
        } = this.props;
        return (
            <View style={styles.container}>
                <View
                    style={[commonStyles.alignSelfcenter, {
                        ...ifIphoneX( //what is this doing?
                            {
                                marginTop: 50
                            },
                            {
                                marginTop: 30
                            }
                        )
                    }]}
                >
                    <Image
                        resizeMode={'contain'} //What is this doing?
                        style={{height: 150, width: 150}}
                        source={image}
                    />
                </View>
                <View>
                    <InputText
                        style={[styles.TextInput,
                            {
                                width: width * 0.9
                            }
                        ]}
                        placeholder="Username or email"
                        autoCapitalize="none"
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                    />

                    <InputText
                        style={[styles.TextInput,
                            {
                                width: width * 0.9
                            }
                        ]}
                        placeholder="Password"
                        autoCapitalize="none"
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        secureTextEntry
                    />
                </View>
                <View style={[commonStyles.mt10]}>
                    <TouchableOpacity onPress={this.onSubmit}>
                        <View
                            style={[
                                commonStyles.loginbutton,
                                commonStyles.alignSelfcenter,

                                {
                                    backgroundColor: '#FFFFFF',
                                    width: width * 0.9
                                }
                            ]}
                        >
                            <Text style={[styles.logintextbutton, styles.buttonText]}>
                                LOGIN
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigate(FORGOT)}>
                    <View style={[commonStyles.alignSelfcenter, commonStyles.mt20]}>
                        <Text style={[styles.ColorText]}>Forgot Password?</Text>
                    </View>
                </TouchableOpacity>

                <View style={[commonStyles.mt20]}>
                    <TouchableOpacity onPress={() => this.signInWithFacebook()}>
                        <View
                            style={[
                                commonStyles.fbbutton,
                                commonStyles.alignSelfcenter,
                                commonStyles.row,
                                commonStyles.mb10,

                                {
                                    width: width * 0.9
                                }
                            ]}
                        >
                            <Icon
                                name="facebook-f"
                                size={30}
                                color={'white'}
                                style={[commonStyles.ml20]}
                            />

                            <View style={{flex: 0.9}}>
                                <Text style={[commonStyles.fbbuttonText, commonStyles.font16]}>
                                    Facebook
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        title="Sign In with Google"
                        onPress={() => this.signInWithGoogleAsync()}
                    >
                        <View
                            style={[
                                styles.googlebutton,
                                commonStyles.alignSelfcenter,
                                commonStyles.row,
                                {
                                    width: width * 0.9
                                }
                            ]}
                        >
                            <Icon
                                name="google"
                                size={30}
                                color={'white'}
                                style={[commonStyles.ml20]}
                            />

                            <View style={{flex: 0.85}}>
                                <Text style={[styles.buttonText]}>
                                    Google
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[commonStyles.mt10]}>
                    <TouchableOpacity onPress={() => navigate(SIGNUP)}>
                        <View
                            style={[
                                commonStyles.loginbutton,
                                commonStyles.alignSelfcenter,

                                {
                                    backgroundColor: '#FFFFFF',
                                    width: width * 0.9
                                }
                            ]}
                        >
                            <Text style={[styles.logintextbutton, styles.buttonText]}>
                                Sign Up
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        marginBottom: 20
    },
    TextInput: {
        marginTop: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000000',
        fontSize: 16,
    },
    ColorText: {
        color: '#BA55D3'
    },
    logintextbutton: {
        fontSize: 16,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#C2CAE6',
        marginTop: 4
    },
    googlebutton: {
        width: 320,
        backgroundColor: '#5434E4',
        paddingVertical: 8,
        borderRadius: 10
    },
});


function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setUserID: bindActionCreators(userActions.setUserID, dispatch),
        setUserEmail: bindActionCreators(userActions.setUserEmail, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
