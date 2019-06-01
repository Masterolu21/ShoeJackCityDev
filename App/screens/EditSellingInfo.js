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

class EditSellingInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //get info from redux
            selling: this.props.user.selling,
        }
    }

    onSave() {
        firebase.database().ref(`/users/${this.props.user.id}`).update({
            selling: this.state.selling,
        });
        //call redux action to save selling information
        this.props.setSelling(this.state.selling);
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
                        Edit Selling Info
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
                                    Selling Info
                                </Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.selling}
                                    placeholder={'Please Input Billing Address'}
                                    onChangeText={(text) => this.setState({selling: text})}
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
        setSelling: bindActionCreators(userActions.setSelling, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSellingInfo);
