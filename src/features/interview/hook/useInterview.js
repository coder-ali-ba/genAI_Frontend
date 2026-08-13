import { useContext } from "react"
import { interviewContext } from "../interview.context"
import {getAllInterviewReports , generateInterviewReport , getInterviewReportbyId} from "../services/api.interview"



export const useInterview = () => {
 const context = useContext(interviewContext)
 if(!context){
    throw new Error("useInterview must be used in interviewProvider")
 }

 const {loading , setLoading , report , setReport , reports , setReports} = context;

 const generateReport = async({selfDescription , jobDescription , resume})=> {
    setLoading(true)
    let response = null
    try {
         response =await generateInterviewReport({selfDescription , jobDescription , resume})
        setReport(response.interviewReport)       
    } catch (error) {
        console.log(error);
        
    }finally{
        setLoading(false)
    }
    return response.interviewReport
 }

 const getReportById = async({interviewId}) =>{
   setLoading(true)
   let response = null
   try {
     response = await getInterviewReportbyId(interviewId);
    setReport(response.interviewReport)
   } catch (error) {
    console.log(error);
    
   }finally{
    setLoading(false)
   }
   return response.interviewReport
 }

 const getReports = async() => {
    setLoading(true)
    let response = null
    try {
         response = await getAllInterviewReports()
        setReports(response.interviewReports)
    } catch (error) {
        console.log(error);
        
    }finally{
        setLoading(false)
    }
    return response.interviewReports
 }
 return {loading , report , reports , generateReport , getReportById , getReports }
}