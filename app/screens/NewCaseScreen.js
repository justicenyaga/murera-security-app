import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import StationPickerItem from "../components/StationPickerItem";
import Text from "../components/Text";
import { Form, FormField, FormPicker, SubmitButton } from "../components/forms";

import casesApi from "../api/cases";
import countiesApi from "../api/counties";
import stationsApi from "../api/stations";
import useApi from "../hooks/useApi";
import useCases from "../hooks/useCases";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(5).label("Title"),
  description: Yup.string().required().min(1).label("Description"),
  county: Yup.object()
    .nonNullable("County is a required field")
    .label("County"),
  subCounty: Yup.object()
    .nonNullable("Sub-county is a required field")
    .label("Sub-county"),
  station: Yup.object()
    .nonNullable("Police Station is a required field")
    .label("Police Station"),
});

const NewCaseScreen = () => {
  const toast = useToast();
  const reportingApi = useApi(casesApi.report);
  const { getCases } = useCases();

  const [stations, setStations] = useState([]);
  const [counties, setCounties] = useState([]);
  const [subCounties, setSubCounties] = useState([]);

  const handleError = () => {
    toast.show("Internal Server Error", { type: "error" });
  };

  const getCounties = async () => {
    const { data, ok } = await countiesApi.getCounties();
    if (ok) setCounties(data.map((c) => ({ value: c.code, label: c.name })));
    else handleError();
  };

  useEffect(() => {
    getCounties();
  }, []);

  const handleCountySelect = async (item) => {
    const { data, ok } = await countiesApi.getSubCounties(item.value);
    if (ok) {
      setSubCounties(data.map((sc) => ({ value: sc._id, label: sc.name })));
    } else handleError();
  };

  const handleSubCountySelect = async (item) => {
    const { data, ok } = await stationsApi.getStations(item.value);
    if (ok) {
      setStations(
        data.map((s) => ({ value: s._id, label: s.name, phone: s.phone })),
      );
    } else handleError();
  };

  const handleSubmit = async (data, { resetForm }) => {
    const caseData = {
      title: data.title,
      description: data.description,
      stationId: data.station.value,
    };

    const { ok, data: response } = await reportingApi.request(caseData);
    if (!ok) return toast.show(response, { type: "error" });

    toast.show("Case reported successfully", { type: "success" });
    resetForm();
    getCases();
  };

  return (
    <>
      <ActivityIndicator visible={reportingApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{
            title: "",
            description: "",
            county: null,
            subCounty: null,
            station: null,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView>
            <Text style={styles.header}>New Case</Text>
            <FormField maxLength={255} name="title" placeholder="Title" />
            <FormField
              maxLength={255}
              multiline
              name="description"
              numberOfLines={3}
              placeholder="Description"
            />
            <FormPicker
              items={counties}
              name="county"
              placeholder="County"
              onItemSelect={handleCountySelect}
            />
            <FormPicker
              items={subCounties}
              name="subCounty"
              placeholder="Sub-county"
              onItemSelect={handleSubCountySelect}
            />
            <FormPicker
              items={stations}
              name="station"
              placeholder="Police Station"
              PickerItemComponent={StationPickerItem}
            />
            <SubmitButton title="Post" />
          </ScrollView>
        </Form>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
  },
});

export default NewCaseScreen;
