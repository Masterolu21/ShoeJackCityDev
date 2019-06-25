import React, {Component} from 'react';
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
import firebase from 'firebase';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import {commonStyles} from "./styles/styles";
import {Container, Content, Body, Button, Header, Left, List, ListItem, Right} from "native-base";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../reducers/user/Actions';

class EditBuyingInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //get info from redux
            billing: this.props.user.billing,
            shipping: this.props.user.shipping,
        }
    }

    onSave() {
        firebase.database().ref(`/users/${this.props.user.id}`).update({
            billing: this.state.billing,
            shipping: this.state.shipping
        });
        //call redux action to save buying information
        this.props.setBilling(this.state.billing);
        this.props.setShipping(this.state.shipping);
        this.props.navigation.goBack();
    }

    render() {
        return(
            <Container style={[commonStyles.flex1, commonStyles.backgroundWhite]}>
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
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
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
                        Edit Buying Info
                    </Text>
                    </Body>
                    <Right style={{flex: 0.43}}>
                    </Right>
                </Header>
                    <ScrollView>
                        <List>
                            <ListItem>
                                <Body style={[commonStyles.row]}>
                                    <View style={[commonStyles.ml5, commonStyles.column, {flex: 1}]}>
                                        <Text
                                            style={[
                                                commonStyles.textLarge,
                                                commonStyles.mb3,
                                                commonStyles.textBold
                                            ]}
                                        >
                                            Billing Address
                                        </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            value={this.state.billing}
                                            placeholder={'Please Input Billing Address'}
                                            onChangeText={(text) => this.setState({billing: text})}
                                        />
                                    </View>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <Body style={[commonStyles.row]}>
                                    <View style={[commonStyles.ml5, commonStyles.column, {flex: 1}]}>
                                        <Text
                                            style={[
                                                commonStyles.textLarge,
                                                commonStyles.mb3,
                                                commonStyles.textBold
                                            ]}
                                        >
                                            Shipping Address
                                        </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            value={this.state.shipping}
                                            placeholder={'Please Input Shipping Address'}
                                            onChangeText={(text) => this.setState({shipping: text})}
                                        />
                                    </View>
                                </Body>
                            </ListItem>
                        </List>
                    </ScrollView>
                    <TouchableOpacity style={styles.saveButton} onPress={() => this.onSave()}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        paddingVertical: 10,
        paddingHorizontal: 2,
        fontSize: 14,
    },
    cancelButtonText: {
        color: '#0288D1'
    },
    saveButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#388E3C'
    },
    saveButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white'
    }
});

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setBilling: bindActionCreators(userActions.setBilling, dispatch),
        setShipping: bindActionCreators(userActions.setShipping, dispatch),
    };
}

// Connect the screens to Redux
export default connect(mapStateToProps, mapDispatchToProps)(EditBuyingInfo);
