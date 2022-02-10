import React,{useState} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Center, Row } from 'native-base';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Alert,
    ImageBackground,
    Picker,
    ScrollView,
    Modal,
    Image,
    Pressable
  } from 'react-native';
import { AntDesign, Feather,Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';  
import * as Clipboard from 'expo-clipboard';
import firebase from '../firebase/fire'


export default  AppList= ({item}) => {
  const ref=firebase.firestore().collection('records');
  

  const [modalOpen,setmodalOpen]=useState(false);
          const copyText=(text)=>{
            Clipboard.setString(text);      
          }
          let handleDelete=()=>
          {
            ref.where("UID", "==", item.UID).get().then(function(querySnapshot) 
            {
              querySnapshot.forEach(function(doc) 
              {
                  doc.ref.delete();
              });
            }); 
            setmodalOpen(false);
            //console.log(item.UID);
          };
//   return (
    // <View >
    //     <TouchableOpacity style={styles.listContainer}>
    //     <Text >{item.Type}</Text>
    //     <Text  >{item.id}</Text>
    //     <Text  >{item.name}</Text>
    //     <Text >{item.password}</Text>
    //     <Text >{item.Note}</Text>
    //     </TouchableOpacity>      
    // </View>
    const [selectedValue, setSelectedValue] = useState(item.Type);
    if(selectedValue=='Card')
        {
          return (
           
            <View >
            <TouchableOpacity style={styles.listContainer} onPress={()=>setmodalOpen(true)}>
              <Text >{item.Type}:{item.cardholdername}</Text>
              
            
            <Modal
                visible={modalOpen}
                animationType={'slide'}
                >
                  
                <TouchableOpacity>
                    <AntDesign name="delete" size={36} color="dimgrey"  onPress={()=>handleDelete()} />
                </TouchableOpacity>
                <Ionicons name="close-sharp" size={36} color="dimgrey"  onPress={()=>setmodalOpen(false)} style={{marginLeft:390}}/>
                  <View style={styles.main}>
            <ScrollView vertical={true}>           
            <Text style={styles.title}>Card Details  <AntDesign name="creditcard" size={24} color="black" /></Text>           
            <Text style={{marginTop:10}}>Cardholder Name : </Text>
            <Text style={styles.itemInput}>{item.cardholdername}</Text>
            <Text>Brand : </Text>
            <Text style={styles.itemInput}>{item.cardbrand}</Text>
           <Text>Card Number : </Text>
           <View style={styles.button3}>
        <Text styles={styles.btnText3}>{item.number}</Text>
        <TouchableOpacity onPress={()=>{copyText(item.number)}}>
          <MaterialCommunityIcons name="content-copy" size={24} color="black"/>
        </TouchableOpacity>
      </View>
            <View style={{flexDirection:'row'}}>
            <Text>Expiry Date : </Text>
            <Text style={{marginLeft:60}}>CVV : </Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={[styles.itemInput,{width:65}]}>{item.expr}</Text>
            <Text style={{fontSize:27}}>/</Text>
            <Text style={[styles.itemInput,{width:65}]}>{item.result}</Text>
           </View>
            <Text>Note  :</Text>
            <Text style={styles.itemInput}>{item.card_note}</Text>
            </ScrollView>
            </View>
                </Modal>
            </TouchableOpacity>      
        </View>
            
          );
        }
        else if (selectedValue=='Identity') 
        {
          return (
           
            <View >
                <TouchableOpacity style={styles.listContainer} onPress={()=>setmodalOpen(true)}>
                
                <Text >{item.Type}:{item.Id_Firstname}</Text>
                
                </TouchableOpacity> 
                <Modal
                visible={modalOpen}
                animationType={'slide'}
                >
                  <TouchableOpacity>
                    <AntDesign name="delete" size={36} color="dimgrey"  onPress={()=>handleDelete()} />
                </TouchableOpacity>
                   <Ionicons name="close-sharp" size={36} color="dimgrey"  onPress={()=>setmodalOpen(false)} style={{marginLeft:390}}/>
                  <View style={styles.main}>
                    <Text style={styles.title}>Personal Details  <Ionicons name="person-circle-outline" size={24} color="black" /></Text>
            <ScrollView vertical={true}>           
            <Text style={{marginTop:10}}>Title: </Text>
            <Text style={styles.itemInput}>{item.Idtitle}</Text>
            <Text>First Name : </Text>
            <Text style={styles.itemInput}>{item.Id_Firstname}</Text>
            <Text>Last Name : </Text>
            <Text style={styles.itemInput}>{item.Idtitle}</Text>
            <Text>Email : </Text>
            <View style={styles.button3}>
            <Text styles={styles.btnText3}>{item.Idemail}</Text>
            <TouchableOpacity onPress={()=>{copyText(item.Idemail)}}>
            <MaterialCommunityIcons name="content-copy" size={24} color="black"/>
            </TouchableOpacity>
            </View>
            <Text>Phone : </Text>
            <View style={styles.button3}>
            <Text styles={styles.btnText3}>{item.Idphone}</Text>
            <TouchableOpacity onPress={()=>{copyText(item.Idphone)}}>
            <MaterialCommunityIcons name="content-copy" size={24} color="black"/>
            </TouchableOpacity>
            </View>
            <Text>AADHAR number : </Text>
            <View style={styles.button3}>
            <Text styles={styles.btnText3}>{item.result}</Text>
            <TouchableOpacity onPress={()=>{copyText(item.result)}}>
            <MaterialCommunityIcons name="content-copy" size={24} color="black"/>
            </TouchableOpacity>
            </View>
            <Text>Passport number : </Text>
            <View style={styles.button3}>
            <Text styles={styles.btnText3}>{item.Idpassport}</Text>
            <TouchableOpacity onPress={()=>{copyText(item.Idpassport)}}>
            <MaterialCommunityIcons name="content-copy" size={24} color="black"/>
            </TouchableOpacity>
            </View>
            <Text>License number : </Text>
            <View style={styles.button3}>
            <Text styles={styles.btnText3}>{item.Idlicense}</Text>
            <TouchableOpacity onPress={()=>{copyText(item.Idlicense)}}>
            <MaterialCommunityIcons name="content-copy" size={24} color="black"/>
            </TouchableOpacity>
            </View>
            <Text>Address 1 : </Text>
            <View style={styles.button3}>
            <Text styles={styles.btnText3}>{item.address1}</Text>
            <TouchableOpacity onPress={()=>{copyText(item.address1)}}>
            <MaterialCommunityIcons name="content-copy" size={24} color="black"/>
            </TouchableOpacity>
            </View>
            <Text>Address 2 : </Text>
            <View style={styles.button3}>
            <Text styles={styles.btnText3}>{item.address2}</Text>
            <TouchableOpacity onPress={()=>{copyText(item.address2)}}>
            <MaterialCommunityIcons name="content-copy" size={24} color="black"/>
            </TouchableOpacity>
            </View>
            <Text>City/Town : </Text>
            <Text style={styles.itemInput}>{item.card_city}</Text>
            <Text>State/Province : </Text>
            <Text style={styles.itemInput}>{item.card_state}</Text>
            <Text>Country : </Text>
            <Text style={styles.itemInput}>{item.card_country}</Text>
            <Text>Zip/Postal Code : </Text>
            <Text style={styles.itemInput}>{item.card_zip}</Text>
            <Text>Note : </Text>
            <Text style={styles.itemInput}>{item.Idnote}</Text>
            </ScrollView>
            </View>
                </Modal>
            </View>
            
          );
        } 
        else if (selectedValue=='Secure Note')
         {
          return (
           
            <View >
                <TouchableOpacity style={styles.listContainer} onPress={()=>setmodalOpen(true)}>
                
                <Text >{item.Type} : {item.secure_name}</Text>
                
                </TouchableOpacity>   
                <Modal
                visible={modalOpen}
                animationType={'slide'}
                >
                  <TouchableOpacity>
                    <AntDesign name="delete" size={36} color="dimgrey"  onPress={()=>handleDelete()} />
                </TouchableOpacity>
                <Ionicons name="close-sharp" size={36} color="dimgrey"  onPress={()=>setmodalOpen(false)} style={{marginLeft:390}}/>
                  <View style={styles.main}>
            <ScrollView vertical={true}>           
            <Text style={styles.title}>Secure Note    <AntDesign name="person-circle-outline" size={24} color="black" /></Text>           
            <Text style={{marginTop:10}}>Title : </Text>
            <Text style={styles.itemInput}>{item.secure_name}</Text>
           <Text>Note : </Text>
           <Text style={styles.itemInput}>{item.result}</Text>
            </ScrollView>
            </View>
                </Modal>
            </View>
          );
        } 
        else
         {
          const [vis,setVis]=useState(true);
          var len=0;
          if(item.result)
          {
            len=item.result.length;
          }
          var temp='';
         for(var i=0;i<len;i++)
         {
            temp+='*';
         }
          return (
            <View>
              
                <TouchableOpacity style={styles.listContainer} onPress={()=>setmodalOpen(true)}>
               
                <Text >{item.Type}:{item.name}</Text>
                
                </TouchableOpacity>      
                <Modal
                visible={modalOpen}
                animationType={'slide'}
                >
                  <TouchableOpacity>
                    <AntDesign name="delete" size={36} color="dimgrey"  onPress={()=>handleDelete()} />
                </TouchableOpacity>
                    <Ionicons name="close-sharp" size={36} color="dimgrey"  onPress={()=>setmodalOpen(false)} style={{marginLeft:390}}/>
                  <View style={styles.main}>
            <ScrollView vertical={true}>           
            <Text style={styles.title}>Password Details <AntDesign name="login" size={24} color="black" /></Text>
            <Text style={{marginTop:10}}>Website/App : </Text>
            <Text style={styles.itemInput}>{item.name}</Text>
            <Text>Username : </Text>
            <View style={styles.button3}>
            <Text styles={styles.btnText3}>{item.id}</Text>
            <TouchableOpacity onPress={()=>{copyText(item.id)}}>
            <MaterialCommunityIcons name="content-copy" size={24} color="black"/>
            </TouchableOpacity>
            </View>
            <Text>Password : </Text>
            <View style={styles.button3}>
            <Text styles={styles.btnText3}>{item.result}</Text>
            <TouchableOpacity onPress={()=>{copyText(item.result)}}>
            <MaterialCommunityIcons name="content-copy" size={24} color="black"/>
            </TouchableOpacity>
            </View>
            <Text>Note  :</Text>    
            <Text style={styles.itemInput}>{item.Note}</Text>        
            </ScrollView>
            </View>
                </Modal>
            </View>
  );
}
}
const styles = StyleSheet.create({
  itemInput: {  
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    backgroundColor:'lavender',
    marginBottom:10,
    margin:10,
    color: 'black',
    paddingHorizontal:15,
    paddingVertical:10,
    
  },
    listContainer:{
        backgroundColor:'white',
        padding:15,
        borderRadius:10,
        marginBottom:5,
        marginTop:10,
        width:360,
        height:60,
        flexDirection:'column',
        justifyContent:'center',
    },
    listTitle:{
        color:'black',
        padding:5,
        margin:5 ,
        fontSize:19,
        
    },
    name:{
        color:'black',
        padding:5,
        margin:5
    },
    click:{
        marginTop:90,
        fontSize:12,
        color:'white',
        fontWeight:"200"
    },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'lavender',
    
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
 
   modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 30,
    borderWidth:4,
    borderColor:'black'
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  }, 
  button3:
  {
    padding:10,
    alignItems:'center',
    width:'94%',
    borderRadius:5,
    backgroundColor:'lavender',
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomLeftRadius:10,
    borderTopLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
    borderWidth: 1,
    marginLeft :13,
    height:"9.3%"
    
  },
  main: {
    flex:1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    height:65,
    width:'100%',
    borderRadius:20,
    opacity:1,
    marginTop:40,
    backgroundColor:'lavender',
    alignSelf:'center',
  },
  btnText3:{
    marginLeft:"5%",
    margin:20,
    padding:20,
    borderRadius:5,
    width:"90%",
    textAlign:'center'
  },
  copy:{
    flexDirection:'row',
    //justifyContent:'flex-start',
    alignItems:'center',
  }
});