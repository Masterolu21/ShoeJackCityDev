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
import firebase from 'firebase';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            switchs: true,
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

    onEditInfo(type) {
        if(type === "buying") {
            this.props.navigation.navigate('EditBuyingInfo');
        } else if(type === 'selling') {
            this.props.navigation.navigate('EditSellingInfo');
        } else if(type === 'payout') {
            this.props.navigation.navigate('EditPayoutInfo');
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
                                <Text style={{width: 150}}>{this.props.user.username}</Text>
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
                                <Text style={{width: 150}}>{this.props.user.billing}</Text>
                                <Text style={[commonStyles.textBold, commonStyles.mt5]}>
                                    SHIPPING
                                </Text>
                                <Text style={{width: 150}}>{this.props.user.shipping}</Text>
                            </View>
                            </Body>
                            <Right><Body>
                            <TouchableOpacity style={{right: -20}} onPress={() => this.onEditInfo('buying')}>
                                <Text style={[commonStyles.font14, {color: 'green'}]}>
                                    Edit
                                </Text>
                            </TouchableOpacity>
                            </Body>
                            </Right>
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
                                <View style={[commonStyles.row]}>
                                    <Text style={[commonStyles.textBold]}>VISA</Text>
                                    <Text>{''} ending in {this.props.user.selling}</Text>
                                </View>
                            </View>
                            </Body>
                            <Right>
                                <Body>
                                <TouchableOpacity style={{right: -20}} onPress={() => this.onEditInfo('selling')}>
                                    <Text style={[commonStyles.font14, {color: 'green'}]}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                                </Body>
                            </Right>
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
                                <Text style={{width: 150}}>{this.props.user.payout}</Text>
                            </View>
                            </Body>
                            <Right>
                                <Body>
                                <TouchableOpacity style={[commonStyles.right20]} onPress={() => this.onEditInfo('payout')}>
                                    <Text style={[commonStyles.font14, {color: 'green'}]}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                                </Body>
                            </Right>
                        </ListItem>
                    </List>
                </ScrollView>
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
