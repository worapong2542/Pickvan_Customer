import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  baseText: {
    fontWeight: 'bold',
    color: 'rgba(86, 96, 179, 1)',
    fontSize: 18,
    marginLeft: 30,
    marginRight:20,
    marginTop:15,
    marginBottom:15
  },

  box: {
    marginLeft: 20,
    marginRight:20,
    flexDirection: "row"
  },
  boxInput: {
    fontSize: 18,
    width: 100,
    color: 'rgba(86, 96, 179, 1)',
    marginTop: 13,
    marginLeft: 75,
    marginRight: 75,
    
  },
  touch_able: {
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(172, 211, 211, 0.28)",
    borderRadius: 10,
    
  },

 
  btnConfirm: {
    marginTop:50,
    margin: 20,
    backgroundColor: 'rgba(254, 181, 166, 1)',
    borderRadius: 40,
    height: 45,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  dropdownsRow1: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingLeft: 10,
  },

  dropdownsRow: {
    //flexDirection: "row",
    width: "100%",
    paddingHorizontal: "5%",
    paddingTop: 25,
    paddingBottom: 10

  },
  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: "rgba(172, 211, 211, 0.28)",
    borderRadius: 4,
    width: "100%",
  },
  dropdown1BtnTxtStyle:
  {
    color: "rgba(86, 96, 179, 1)",
    textAlign: "left"
  },

  dropdown1DropdownStyle:
    { backgroundColor: "#EFEFEF" },

  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
  },
  dropdown1RowTxtStyle:
  {
    color: "'rgba(86, 96, 179, 1)'",
    textAlign: "left"
  },

  // -----------------------------------------------------------------------

  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: "rgba(230, 234, 249, 1)",
    borderRadius: 3,
    width: "100%",
  },

  dropdown2BtnTxtStyle: {
    color: "'rgba(86, 96, 179, 1)'",
    textAlign: "left"
  },

  dropdown2DropdownStyle: {
    backgroundColor: "#EFEFEF"
  },

  dropdown2RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },

  dropdown2RowTxtStyle: {
    color: "'rgba(86, 96, 179, 1)'",
    textAlign: "left"
  },
  blockAddSeatPlus:{
    marginLeft:70,
    backgroundColor: "rgba(172, 211, 211, 0.28)",
    borderRadius: 10,
  },
  blockAddSeatMinus:{
    backgroundColor: "rgba(172, 211, 211, 0.28)",
    borderRadius: 10,
  },
  goWhere:{
    fontWeight: 'bold',
    color: 'rgba(86, 96, 179, 1)',
    fontSize: 20,
    marginLeft: 30,
    marginRight:20,
    marginTop:20,
  },
  bankImg:{
    width: 35, height: 35, marginRight:10
  },
  bankNum:{
    marginLeft:50, marginBottom:10
  }

});
export default styles;
