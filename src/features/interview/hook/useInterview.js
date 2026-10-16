
import { useContext } from "react";
import { interviewContext } from "../interview.context";
import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportbyId,
} from "../services/api.interview";

export const useInterview = () => {
  const context = useContext(interviewContext);

  if (!context) {
    throw new Error("useInterview must be used in interviewProvider");
  }

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
  } = context;

  const generateReport = async ({
    selfDescription,
    jobDescription,
    resume,
  }) => {
    setLoading(true);

    try {
      const response = await generateInterviewReport({
        selfDescription,
        jobDescription,
        resume,
      });

      const generatedReport = response?.interviewReport;

      if (!generatedReport?._id) {
        throw new Error("Saved report ID was not returned by the backend.");
      }

      setReport(generatedReport);
      return generatedReport;
    } catch (error) {
      console.error(
        "Generate report error:",
        error?.response?.data || error
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async ({ interviewId }) => {
    setLoading(true);

    try {
      const response = await getInterviewReportbyId(interviewId);
      const fetchedReport = response?.data;

      setReport(fetchedReport);
      return fetchedReport;
    } catch (error) {
      console.error(
        "Get report error:",
        error?.response?.data || error
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);

    try {
      const response = await getAllInterviewReports();
      const fetchedReports = response?.data || [];

      setReports(fetchedReports);
      return fetchedReports;
    } catch (error) {
      console.error(
        "Get all reports error:",
        error?.response?.data || error
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
  };
};
