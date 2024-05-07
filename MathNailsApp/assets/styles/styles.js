// styles.js
import { StyleSheet } from 'react-native';

export const ProfilScreen = StyleSheet.create({
    Container: {
      width: "100%",
      alignItems: "center",
    },
    ProfilContainer: {
      width: "100%",
      alignItems: "center",
    },
    ProfileImage: {
      width: 150,
      height: 150,
      marginTop: 20,
    },
    TextName: {
      marginTop: 20,
      height: 50,
      padding: 10,
      width: "70%", 
      borderWidth: 2,
      borderColor: 'gray', 
      borderRadius: 50,
      marginBottom: 10, 
      paddingLeft: 10
    },
    FlexUp: {
      height: "90%",
      justifyContent: "space-between",
      flexDirection: "column",
      alignItems: "center"
    },
    ButtonSpecial: {
      width: "50%",
    },
  });
export const GeneralScreen = StyleSheet.create({
    header: {
        marginTop: 10,
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 4,
        alignItems: 'center',
        backgroundColor: "rgba(12,121,232,0.5)",
        borderRadius: 20,
      },
      content: {
        padding: 10,
        
      },
      contentText: {
        fontSize: 20,
        marginBottom: 5,
      },
      headerText: {
        fontSize: 20,
      },
      moreDetailsButton: {
        alignSelf: "flex-end",
        marginTop: -40,
      },
      generalView: {
        height: "100%",
      },
});
export const EntryScreen = StyleSheet.create({ 
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 4,
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "rgb(11,119,226)",
},
headerText: {
    fontSize: 20,

},
content: {
    padding: 10,
},
contentItem: {
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
},
contentItemText: {
    fontSize: 24,   
  },
  
});
export const ServicesScreen = StyleSheet.create({
    container: {
      flex: 1,
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: "100%",
      backgroundColor: "white",
    },
    input: {
      borderWidth: 2,
      padding: 10,
      fontSize: 20,
      marginBottom: 30,
      borderRadius: 50,
      width: "80%",
    },
    renderList: {
      height: "100%",
    },
    servicesScreen: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 60,
      padding: 10,
      borderBottomWidth: 2,
    },  
    nameStyle: {
      fontSize: 20,
    },
    costStyle: {
      fontSize: 24,
    },
    selectedServiceText: {
      flex: 1,
      justifyContent: "center",
    },
    selectedServiceTextView: {
      borderBottomWidth: 2,
      padding: 10,
    },
    selectedServiceTextInner: {
      textAlign: "center",
      fontSize: 24,
    },
    selectedServiceButton: {
      width: "100%",
      alignItems: "center",
      flex: 1,
    },
    changeView: {
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      backgroundColor: "white",
    },
  });
export const SettingsScreen = StyleSheet.create({
    containerSettings: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
});

export const lightTheme = StyleSheet.create({
    ...ProfilScreen,
    ...GeneralScreen,
    ...EntryScreen,
    ...ServicesScreen,
    ...SettingsScreen,
  text: {
    fontSize: 20,
    color: 'black',
    
  },
  headerText: {
    ...GeneralScreen.headerText,
    color: "black",
  },
  contentText: {
    ...GeneralScreen.contentText,
    color: "black",
    
  },
  header: {
    ...GeneralScreen.header,
    backgroundColor: "#e7e9ea",
    borderColor: "rgb(11,119,226)",
    backgroundColor: "#ffffff",
  },
  content: {
    ...GeneralScreen.content,
    zIndex: -1,
    marginHorizontal: 10,
    marginTop: -20,
    paddingTop: 20,
  },
  contentItem: {
    ...EntryScreen.contentItem,
    backgroundColor: "#33B5FF",
  },
});

export const darkTheme = StyleSheet.create({
    ...ProfilScreen,
    ...GeneralScreen,
    ...EntryScreen,
    ...ServicesScreen,
    ...SettingsScreen,
    
  text: {
    fontSize: 20,
    color: 'white',
  },
  headerText: {
    ...GeneralScreen.headerText,
    color: "white",
  },
  contentText: {
    color: "white",
    fontSize: 20,
    
  },
  header: {
    ...GeneralScreen.header,
    backgroundColor: "rgb(12,121,232)",
  },
  content: {
    ...GeneralScreen.content,
    zIndex: -1,
    marginHorizontal: 10,
    marginTop: -20,
    paddingTop: 20,
  },
  contentItem: {
    ...EntryScreen.contentItem,
   fontSize: 20,
  },
  sectionHeader: {
    ...EntryScreen.sectionHeader,
    backgroundColor: "rgb(12,121,232)",
  },
  contentItemText: {
    ...EntryScreen.contentItemText,
    color: "white",
    textShadowColor: "rgba(12,121,232,1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  servicesScreen: {
    ...ServicesScreen.servicesScreen,
    borderColor: "white",
  },
  modalContainer: {
    ...ServicesScreen.modalContainer,
    backgroundColor: "black",
  }, 
  changeView: {
    ...ServicesScreen.changeView,
    backgroundColor: "black"
  },
  input: {
    ...ServicesScreen.input,
    borderColor: "gray",
  },
});

