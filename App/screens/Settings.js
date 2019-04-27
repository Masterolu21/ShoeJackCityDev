import React from 'react';
import {
Icon,
Right,
Header,
Button,
Left,
List,
ListItem,
Body,
} from 'native-base';
import {
View,
Text,
ScrollView,
Alert,
TouchableOpacity,
StatusBar
} from 'react-native';
import { commonStyles } from './styles/styles';

class Settings extends React.Component {
constructor(props) {
super(props);
this.state = {
switchs: true
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
onPress: () => this.props.navigation.navigate('SignInScreen')
}
],
{ cancelable: false }
);
};
onChangeFunction(newState) {
this.setState(newState);
}
render() {
const {
navigation: { goBack }
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
<StatusBar backgroundColor="black" barStyle="light-content" />
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
style={[commonStyles.font18, { color: '#51C5E7' }]}
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
<Right style={{ flex: 0.43 }}>
<Button transparent onPress={this.Alert}>
<Text style={{ color: '#51C5E7' }}>Sign Out</Text>
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
style={[commonStyles.font18, { color: '#C8A74D' }]}
/>
<View style={[commonStyles.ml5, commonStyles.column]}>
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
<Text style={{ width: 150 }}>SOBBYIAL_ATIQ</Text>
<Text style={[commonStyles.textBold, commonStyles.mt5]}>
EMAIL ADDRESS
</Text>
<Text style={[commonStyles.font14]}>
sobyyial.attique@crewlogix.com
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
style={[commonStyles.font18, { color: '#C8A74D' }]}
/>
<View style={[commonStyles.ml5, commonStyles.column]}>
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
<Text style={{ width: 150 }}>
23828 148th Dr, jamaica NY 11422
</Text>
<Text style={[commonStyles.textBold, commonStyles.mt5]}>
SHIPPING
</Text>
<Text style={{ width: 150 }}>
23828 148th Dr, jamaica NY 11422
</Text>
</View>
</Body>
<Right><Body>
<View style={{ right: -20 }}>
<Text style={[commonStyles.font14, { color: 'green' }]}>
Edit
</Text>
</View>
</Body>
</Right>
</ListItem>

<ListItem>
<Body style={[commonStyles.row]}>
<Icon
type="MaterialIcons"
name="monetization-on"
style={[commonStyles.font18, { color: '#C8A74D' }]}
/>
<View style={[commonStyles.column, commonStyles.ml5]}>
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
<Text>{''} ending in 8055</Text>
</View>
</View>
</Body>
<Right>
<Body>
<View style={{ right: -20 }}>
<Text style={[commonStyles.font14, { color: 'green' }]}>
Edit
</Text>
</View>
</Body>
</Right>
</ListItem>
<ListItem>
<Body style={[commonStyles.row]}>
<Icon
type="MaterialIcons"
name="monetization-on"
style={[commonStyles.font18, { color: '#C8A74D' }]}
/>
<View style={{ flexDirection: 'column', marginLeft: 5 }}>
<Text
style={[
commonStyles.textLarge,
commonStyles.mb3,
{ fontWeight: 'bold' }
]}
>
PAYOUT INFO
</Text>
<Text style={{ fontWeight: 'bold' }}>PAYOUT</Text>
<View style={{ flexDirection: 'row' }}>
<Text>NO Payout Method</Text>
</View>
</View>
</Body>
<Right>
<Body>
<View style={[commonStyles.right20]}>
<Text style={[commonStyles.font14, { color: 'green' }]}>
Edit
</Text>
</View>
</Body>
</Right>
</ListItem>

</List>
</ScrollView>
</View>
);
}
}
export default Settings;
