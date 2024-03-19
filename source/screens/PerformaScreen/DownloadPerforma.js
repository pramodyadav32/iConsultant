import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  Animated,
  TextInput,
  StyleSheet,
} from "react-native";
import * as constant from "../../utilities/constants";
import { useDispatch, useSelector } from "react-redux";
import HomeHeader from "../../components/HomeHeader";
import FastImage from "react-native-fast-image";
import images from "../../utilities/images";
import * as common_fn from "../../utilities/common_fn";
import { APIName, imageUrl, tokenApiCall } from "../../utilities/apiCaller";
import CommonHeader from "../../components/CommonHeader";
import SelectDropList from "../../components/SelectDropList";
import Button from "../../components/Button";
import PDFView from "react-native-view-pdf";
import Share from "react-native-share";
import { emptyLoader_Action } from '../../redux/actions/AuthAction';

export default function DownloadPerforma(props) {
  const { performaGeneralMasterData, performaBasicInfo,invoice_Data } = props;
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.AuthReducer);
  const [active, setActive] = useState(false);
  const [listData, setListData] = useState([]);
  const [pdfPath, setPdfPath] = useState("");
  const [base64String, setBase64String] = useState("");
  const [resourceType, setResourceType] = useState('file')

  useEffect(() => {
    console.log(
      "performaGeneralMasterData = ",
      performaBasicInfo,
      performaGeneralMasterData
    );

    setBase64String(invoice_Data)
    fn_CreatePdfFromBase64(invoice_Data);
    // getPrformaPdf();
  }, [invoice_Data]);

  const getPrformaPdf = (item) => {
    dispatch(emptyLoader_Action(true));
    const param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      userId: userData?.userId,
      ipAddress: "1::1",
      docLocation: "MADU01",
      docCode: "SRP",
      docFY: "2023-2024",
      docNo: 49,
    };
    console.log("param" + JSON.stringify(param));
    tokenApiCall(
      getEstimatePdf_Callback,
      APIName.GetProformaPDF,
      "POST",
      JSON.stringify(param),
      item
    );
  };

 

  const fn_CreatePdfFromBase64 = async (base64Data) => {
    const dirs = fs.dirs; //Use the dir API
   let  newPath = dirs.DocumentDir;

    let fPath = `${newPath}/Invoice_${"doc_no"}.pdf`;

    fs.writeFile(fPath, base64Data, "base64")
      .then((success) => {
        setPdfPath(fPath);
      })
      .catch((err) => {
        console.log("aaaa error=", err.message);
      });

    let filePath = null;
    const configOptions = { fileCache: true };
  };

  const fn_SavePdf = () => {
    constant.showMsg(` Pdf save to  ${route.params?.url}`);
  };

  const fn_SharePdf = () => {
    const options = {
      title: ` ${route.params?.title}`,
      url: `file://${route.params?.url}`,
      type: "file/pdf",
    };

    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  const resources = {
    file: pdfPath, //Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: "https://www.africau.edu/images/default/sample.pdf",
    base64: base64String,
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E1E1E1" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: constant.whiteColor,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={resources[resourceType]}
          resourceType={resourceType}
          onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
          onError={(error) => console.log("Cannot render PDF", error)}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          title="Cancel Proforma"
          click_Action={() => null}
          buttonExt={styles.cancelPerformaButton}
        />
        <Pressable
          style={styles.printerPerformaButton}
          onPress={() => {
            fn_SavePdf();
          }}
        >
          <FastImage source={images.notify} style={styles.printerImage} />
        </Pressable>
        <Pressable
          style={styles.sharePerformaButton}
          onPress={() => {
            fn_SharePdf();
          }}
        >
          <FastImage source={images.notify} style={styles.printerImage} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cancelPerformaButton: {
    marginBottom: constant.moderateScale(20),
    marginTop: constant.moderateScale(10),
    marginHorizontal: constant.moderateScale(10),
    paddingVertical: constant.moderateScale(10),
    borderWidth: 0.8,
    borderColor: constant.whiteColor,
    width: constant.moderateScale(150),
    elevation: 1,
  },
  printerPerformaButton: {
    marginBottom: constant.moderateScale(20),
    marginTop: constant.moderateScale(10),
    paddingHorizontal: constant.moderateScale(23),
    paddingVertical: constant.moderateScale(10),
    borderWidth: 0.8,
    borderColor: constant.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B3B3B",
    marginHorizontal: constant.moderateScale(4),
    borderRadius: 10,
    elevation: 1,
  },
  sharePerformaButton: {
    marginBottom: constant.moderateScale(20),
    marginTop: constant.moderateScale(10),
    paddingHorizontal: constant.moderateScale(23),
    paddingVertical: constant.moderateScale(10),
    borderWidth: 0.8,
    borderColor: constant.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#727272",
    marginLeft: constant.moderateScale(4),
    borderRadius: 10,
    elevation: 1,
    marginRight: constant.moderateScale(15),
  },
  printerImage: {
    height: constant.moderateScale(20),
    width: constant.moderateScale(20),
  },
});
