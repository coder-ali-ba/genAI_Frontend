import { useContext } from "react"
import { interviewContext } from "../interview.context"
import {getAllInterviewReports , generateInterviewReport , getInterviewReportbyId} from "../services/api.interview"



const useInterview = () => {
 const context = useContext(interviewContext)
 if(!context){
    throw new Error("useInterview must be used in interviewProvider")
 }

 const {loading , setLoading , report , setReport , reports , setReports} = context;

 const generateReport = async({selfDescription , jobDescription , resume})=> {
    setLoading(true)
    try {
        const response =await generateInterviewReport({selfDescription , jobDescription , resume})
        setReport(response.interviewReport)       
    } catch (error) {
        console.log(error);
        
    }finally{
        setLoading(false)
    }
 }

 const getReportById = async({interviewId}) =>{
   setLoading(true)
   try {
    const response = await getInterviewReportbyId(interviewId);
    setReport(response.interviewReport)
   } catch (error) {
    console.log(error);
    
   }finally{
    setLoading(false)
   }
 }

 const getReports = async() => {
    setLoading(true)
    try {
        const response = await getAllInterviewReports()
        setReports(response.interviewReports)
    } catch (error) {
        console.log(error);
        
    }finally{
        setLoading(false)
    }
 }
 return {loading , report , reports , generateReport , getReportById , getReports }
}