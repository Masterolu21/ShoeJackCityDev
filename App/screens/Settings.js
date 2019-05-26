import React from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Alert,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
} from 'react-native';
import {
    Right,
    Header,
    Button,
    Left,
    List,
    ListItem,
    Body,
} from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../reducers/user/Actions';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import {commonStyles} from './styles/styles';
import Modal from 'react-native-modal';
import firebase from 'firebase';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchs: true,
            isModalVisible: false,
            modalType: '',
            modalTitle: '',
            modalText: '',
        };
    }

    Alert = () => {
        Alert.alert(
            'Alert',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.props.setUserID('');
                        this.props.navigation.navigate('SignInScreen');
                    }
                }
            ],
            {cancelable: false}
        );
    };

    onChangeFunction(newState) {
        this.setState(newState);
    }

    // show modal to edit user infomation
    onShowModal(type) {
        switch (type) {
            case 'username':
                this.setState({
                    isModalVisible: true,
                    modalType: type,
                    modalTitle: 'USER NAME',
                    modalText: this.props.user.username
                });
                break;
            case 'billing':
                this.setState({
                    isModalVisible: true,
                    modalType: type,
                    modalTitle: 'BILLING ADDRESS',
                    modalText: this.props.user.billing
                });
                break;
            case 'shipping':
                this.setState({
                    isModalVisible: true,
                    modalType: type,
                    modalTitle: 'SHIPPING ADDRESS',
                    modalText: this.props.user.shipping
                });
                break;
            case 'selling':
                this.setState({
                    isModalVisible: true,
                    modalType: type,
                    modalTitle: 'SELLING INFORMATION',
                    modalText: this.props.user.selling
                });
                break;
            case 'payout':
                this.setState({
                    isModalVisible: true,
                    modalType: type,
                    modalTitle: 'PAYOUT INFOMATION',
                    modalText: this.props.user.payout
                });
                break;
            default:
                break;
        }
    }

    //close modal without saving
    onModalCancel() {
        this.setState({isModalVisible: false});
    }

    // save userinfo to redux and firebase
    onModalSave() {
        this.setState({isModalVisible: false});
        // update data in firestore
        firebase.database().ref(`/users/${this.props.user.id}`).update({
            [this.state.modalType]: this.state.modalText,
        });

        //update data in redux
        switch (this.state.modalType) {
            case 'username':
                this.props.setUserName(this.state.modalText);
                break;
            case 'billing':
                this.props.setBilling(this.state.modalText);
                break;
            case 'shipping':
                this.props.setShipping(this.state.modalText);
                break;
            case 'selling':
                this.props.setSelling(this.state.modalText);
                break;
            case 'payout':
                this.props.setPayout(this.state.modalText);
                break;
            default:
                break;
        }
    }

    render() {
        const {
            navigation: {goBack}
        } = this.props;
        const uri =
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVuX0uaDPSwnfS_Rue4cKqk7EhmXDqzpKl9MYeEWZiK9k6NtepIg';
        return (
            <View style={[commonStyles.flex1, commonStyles.backgroundWhite]}>
                <Header
                    hasSegment
                    style={[
                        commonStyles.backgroundWhite,
                        {
                            borderBottomWidth: 1,
                            borderBottomColor: '#F2F2F2'
                        }
                    ]}
                >
                    <StatusBar backgroundColor="black" barStyle="light-content"/>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                goBack();
                            }}
                        >
                            <Icon
                                type="MaterialIcons"
                                name="arrow-back"
                                style={[commonStyles.font18, {color: '#51C5E7'}]}
                            />
                        </Button>
                    </Left>
                    <Body>
                    <Text
                        style={[
                            commonStyles.alignSelfcenter,
                            commonStyles.colorblack,
                            commonStyles.textBold
                        ]}
                    >
                        Settings
                    </Text>
                    </Body>
                    <Right style={{flex: 0.43}}>
                        <Button transparent onPress={this.Alert}>
                            <Text style={{color: '#51C5E7'}}>Sign Out</Text>
                        </Button>
                    </Right>
                </Header>
                <ScrollView>
                    <List>
                        <ListItem>
                            <Body style={[commonStyles.row]}>
                            <Icon
                                type="MaterialIcons"
                                name="monetization-on"
                                style={[commonStyles.font18, {color: '#C8A74D'}]}
                            />
                            <View style={[commonStyles.ml5, commonStyles.column, {flex: 1}]}>
                                <Text
                                    style={[
                                        commonStyles.textLarge,
                                        commonStyles.mb3,
                                        commonStyles.textBold
                                    ]}
                                >
                                    USER INFO
                                </Text>
                                <Text style={[commonStyles.textBold]}>USER NAME</Text>
                                <View style={styles.itemContainer}>
                                    <Text style={{width: 150}}>{this.props.user.username}</Text>
                                    <TouchableOpacity style={styles.editButton} onPress={() => this.onShowModal('username')}>
                                        <Icon name={'edit'} size={18} color={'#008b00'}/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={[commonStyles.textBold, commonStyles.mt5]}>
                                    EMAIL ADDRESS
                                </Text>
                                <Text style={[commonStyles.font14]}>
                                    {this.props.user.email}
                                </Text>
                                <Text style={[commonStyles.textBold, commonStyles.mt5]}>
                                    RESET PASSWORD
                                </Text>
                                <TouchableOpacity>
                                    <Text
                                        style={[
                                            commonStyles.font14,
                                            commonStyles.textDecorationLine,
                                            {
                                                color: 'green'
                                            }
                                        ]}
                                    >
                                        RESET
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Body style={[commonStyles.row]}>
                            <Icon
                                type="MaterialIcons"
                                name="monetization-on"
                                style={[commonStyles.font18, {color: '#C8A74D'}]}
                            />
                            <View style={[commonStyles.ml5, commonStyles.column, {flex: 1}]}>
                                <Text
                                    style={[
                                        commonStyles.textLarge,
                                        commonStyles.mb3,
                                        commonStyles.textBold
                                    ]}
                                >
                                    BUYING INFO
                                </Text>
                                <Text style={[commonStyles.textBold]}>BILLING</Text>
                                <View style={styles.itemContainer}>
                                    <Text style={{width: 150}}>{this.props.user.billing}</Text>
                                    <TouchableOpacity style={styles.editButton} onPress={() => this.onShowModal('billing')}>
                                        <Icon name={'edit'} size={18} color={'#008b00'}/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={[commonStyles.textBold, commonStyles.mt5]}>
                                    SHIPPING
                                </Text>
                                <View style={styles.itemContainer}>
                                    <Text style={{width: 150}}>{this.props.user.shipping}</Text>
                                    <TouchableOpacity style={styles.editButton} onPress={() => this.onShowModal('shipping')}>
                                        <Icon name={'edit'} size={18} color={'#008b00'}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </Body>
                            {/*<Right><Body>*/}
                            {/*<View style={{right: -20}}>*/}
                                {/*<Text style={[commonStyles.font14, {color: 'green'}]}>*/}
                                    {/*Edit*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                            {/*</Body>*/}
                            {/*</Right>*/}
                        </ListItem>
                        <ListItem>
                            <Body style={[commonStyles.row]}>
                            <Icon
                                type="MaterialIcons"
                                name="monetization-on"
                                style={[commonStyles.font18, {color: '#C8A74D'}]}
                            />
                            <View style={[commonStyles.column, commonStyles.ml5, {flex: 1}]}>
                                <Text
                                    style={[
                                        commonStyles.textLarge,
                                        commonStyles.mb3,
                                        commonStyles.textBold
                                    ]}
                                >
                                    SELLING INFO
                                </Text>
                                <Text style={[commonStyles.textBold]}>PAYMENT</Text>
                                <View style={styles.itemContainer}>
                                    <View style={[commonStyles.row]}>
                                        <Text style={[commonStyles.textBold]}>VISA</Text>
                                        <Text>{''} ending in {this.props.user.selling}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.editButton} onPress={() => this.onShowModal('selling')}>
                                        <Icon name={'edit'} size={18} color={'#008b00'}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </Body>
                            {/*<Right>*/}
                                {/*<Body>*/}
                                {/*<View style={{right: -20}}>*/}
                                    {/*<Text style={[commonStyles.font14, {color: 'green'}]}>*/}
                                        {/*Edit*/}
                                    {/*</Text>*/}
                                {/*</View>*/}
                                {/*</Body>*/}
                            {/*</Right>*/}
                        </ListItem>
                        <ListItem>
                            <Body style={[commonStyles.row]}>
                            <Icon
                                type="MaterialIcons"
                                name="monetization-on"
                                style={[commonStyles.font18, {color: '#C8A74D'}]}
                            />
                            <View style={{flexDirection: 'column', marginLeft: 5, flex: 1}}>
                                <Text
                                    style={[
                                        commonStyles.textLarge,
                                        commonStyles.mb3,
                                        {fontWeight: 'bold'}
                                    ]}
                                >
                                    PAYOUT INFO
                                </Text>
                                <Text style={{fontWeight: 'bold'}}>PAYOUT</Text>
                                <View style={styles.itemContainer}>
                                    <Text style={{width: 150}}>{this.props.user.payout}</Text>
                                    <TouchableOpacity style={styles.editButton} onPress={() => this.onShowModal('payout')}>
                                        <Icon name={'edit'} size={18} color={'#008b00'}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </Body>
                            {/*<Right>*/}
                                {/*<Body>*/}
                                {/*<View style={[commonStyles.right20]}>*/}
                                    {/*<Text style={[commonStyles.font14, {color: 'green'}]}>*/}
                                        {/*Edit*/}
                                    {/*</Text>*/}
                                {/*</View>*/}
                                {/*</Body>*/}
                            {/*</Right>*/}
                        </ListItem>
                    </List>
                </ScrollView>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitleText}>{this.state.modalTitle}</Text>
                        <TextInput value={this.state.modalText} onChangeText={(text) => this.setState({modalText: text})} style={styles.modalTextInput}/>
                        <View style={styles.modalBottomContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => this.onModalSave()}>
                                <Text style={styles.modalButtonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, {backgroundColor: '#bdbdbd'}]} onPress={() => this.onModalCancel()}>
                                <Text style={[styles.modalButtonText, {color: 'black'}]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editButton: {

    },
    editIcon: {

    },
    modal: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    modalTitleText: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    modalTextInput: {
        fontSize: 17,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#eee',
    },
    modalBottomContainer: {
        flexDirection: 'row',
    },
    modalButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#0091EA',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 17,
    }
});

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setUserID: bindActionCreators(userActions.setUserID, dispatch),
        setUserName: bindActionCreators(userActions.setUserName, dispatch),
        setBilling: bindActionCreators(userActions.setBilling, dispatch),
        setShipping: bindActionCreators(userActions.setShipping, dispatch),
        setSelling: bindActionCreators(userActions.setSelling, dispatch),
        setPayout: bindActionCreators(userActions.setPayout, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
