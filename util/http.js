import axios from "axios";

const BACKEND_URL = "https://react-native-assignment-74856-default-rtdb.asia-southeast1.firebasedatabase.app";

export function storeReport(report) {
  axios.post(BACKEND_URL + "/reports.json", report);
}

export async function fetchReports() {
    const response =  await axios.get(BACKEND_URL + "/reports.json");

    const reports = [];

    for (const key in response.data) {
        const reportObj = {
            id: key,
            rating : response.data[key].rating,
            description : response.data[key].description,
        };

        reports.push(reportObj);
    }
    return reports;
}
