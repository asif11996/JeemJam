import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';




export default function Home({ navigation, route }) {

    const [isLoading, setLoading] = React.useState(true);
    const [SelectedCountry, setSelectedCountry] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [filteredDataSource, setFilteredDataSource] = React.useState([]);
    const [masterDataSource, setMasterDataSource] = React.useState([]);
    const [currentCountry, setcurrentCountry] = React.useState([]);



    React.useEffect(() => {
        let { SelectedCountry } = route.params
        setSelectedCountry(SelectedCountry)
        console.log(SelectedCountry?.name);
    }, [])
    React.useEffect(() => {
        setFilteredDataSource(options);
        setMasterDataSource(options);

    }, []);


    React.useEffect(() => {

        fetch('https://www.jeemjam.com/api/get-ads-fetching')
            .then((response) => response.json())
            .then((json) => setcurrentCountry(json?.getads.filter(u => u.country == SelectedCountry?.name)))
            .catch((error) => console.error(error))
        setTimeout(() => {
            console.log('Arrayyyyyyyy===>', currentCountry)
            setLoading(false)
        }, 4000);
    }, []);



    //Function for search bar filtering categories
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.name
                        ? item.name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };



    const CountryImg = SelectedCountry;


    const options = [
        { id: 1, name: 'Mobiles', img: require('../../assets/Images/mob.png',), nextlocation: 'Mobile' },
        { id: 2, name: 'Cars', img: require('../../assets/Images/tyty.png'), nextlocation: 'Cars' },
        { id: 3, name: 'Jobs', img: require('../../assets/Images/job.png'), nextlocation: 'Jobs' },
        { id: 4, name: 'Services', img: require('../../assets/Images/servicess.png'), nextlocation: 'Services' },
        { id: 5, name: 'Miscellaneous', img: require('../../assets/Images/misc.jpg'), nextlocation: 'Miscellaneous' },]



    return (
        <View style={styles.container}>
            <View style={styles.headview}>
                <Text style={styles.heading}>Jeem Jam</Text>
                <View style={styles.miniview}>
                    <Ionicons name='settings' size={25} color={'white'} style={styles.topicon} solid onPress={() => navigation.navigate('Profile')} />
                    <TouchableOpacity onPress={() => navigation.navigate('Countries')}>
                        <Image source={CountryImg?.img} style={styles.topimg} />
                    </TouchableOpacity></View>
            </View>
            <ScrollView style={styles.list}>

                <View style={styles.SectionStyle}>
                    <Image
                        source={require('../../assets/Images/oop.png')}
                        style={styles.ImageStyle}
                    />
                    <TextInput
                        style={{ flex: 1, fontSize: 18 }}
                        onChangeText={(text) => searchFilterFunction(text)}
                        value={search}
                        placeholder="Search"
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.middleheader}>
                    <View style={styles.pay}>
                        <TouchableOpacity
                            onPress={() => {

                                navigation.navigate('Signin')
                            }
                            }>
                            <Image source={require('../../assets/Images/ad.png')} style={styles.img} />
                        </TouchableOpacity>
                        <Text style={styles.middletxt}>
                            Place your ad for free</Text>
                    </View >
                    <View style={styles.pay}>
                        <TouchableOpacity onPress={() => navigation.navigate('AccountBalance')}>
                            <Image source={require('../../assets/Images/wwqs.png')} style={styles.img} />
                        </TouchableOpacity>
                        <Text style={styles.middletxt}>
                            Account balance</Text>
                    </View>
                </View>
                {isLoading ?
                    <View style={{ marginHorizontal: '40%', marginVertical: '20%' }}>
                        <ActivityIndicator size={30} color={'blue'} />
                        <Text style={{ fontSize: 18 }}> Loading...</Text>
                    </View>
                    :

                    <View style={styles.subview}>
                        {filteredDataSource.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate(item.nextlocation, { SelectedCountry: SelectedCountry })}>
                                    <View style={styles.listelem}>
                                        <Image style={styles.img} source={item.img} />
                                        <Text style={styles.listtxt}>{item.name}</Text>
                                    </View>
                                    <View style={styles.icon}>
                                        <Text>{item.quantity}  </Text>
                                        <MaterialIcons name='arrow-forward-ios' size={25} color={'black'} solid />
                                    </View>
                                </TouchableOpacity>


                            );
                        })}

                    </View>}

                <TouchableOpacity onPress={() => navigation.navigate('Countries')}>
                    <View style={[styles.listelem, { marginTop: '10%' }]}>
                        <Image style={styles.img} source={CountryImg?.img} />
                        <Text style={styles.listtxtx}>{CountryImg?.name}</Text>
                    </View>
                    <View style={styles.icon}>
                        <MaterialIcons name='location-pin' size={25} color={'black'} solid style={{ marginLeft: '5%' }} />
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAF9F6',
        flex: 1
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
        height: 60,
        width: '100%',
    },
    ImageStyle: {
        padding: 10,
        margin: 10,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    listelem: {
        backgroundColor: '#F0F0F0',
        width: '100%',
        height: 70,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },
    img: {
        height: 55,
        width: 58,
        marginLeft: '2%',
        borderRadius: 70,
        resizeMode: 'stretch',
    },
    topimg: {
        height: 30,
        width: 50,
        marginLeft: '5%',
    },
    listtxt: {
        fontSize: 18,
        marginLeft: '1%',
        color: 'black'
    },
    listtxtx: {
        fontSize: 18,
        marginLeft: '4%',
        color: 'black'
    },
    headview: {
        backgroundColor: '#0000a5',
        height: '8%',
        padding: 10,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    miniview: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    icon: {
        position: 'relative',
        left: 310,
        bottom: '12%',
        flexDirection: 'row'
    },
    topicon: {
        margin: '1%'
    },
    heading: {
        fontSize: 20,
        color: 'white',
        marginLeft: '5%'
    },

    subview: {
        marginTop: '10%',
    },
    pay: {
        backgroundColor: '#D4F1F4',
        width: '40%',
        height: 110,
        borderRadius: 20,
        elevation: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        padding: 20

    },
    middleheader: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    middletxt: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    pop: {
        borderColor: 'black',
        borderWidth: 1,
        marginTop: '13%'
    },
    logo: {
        width: 130,
        height: 30,
        padding: 5
    },
    logoview: {
        backgroundColor: 'white',
        height: 40,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center'

    }



});


