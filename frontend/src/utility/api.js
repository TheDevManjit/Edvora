import axios from 'axios';

const fetchCourses = async () => {
    try {
        const response = await axios.get('http://localhost:4001/api/v1/course/getall',{withCredentials:true});
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const signup = async (formData) => {
  try{
    const response = await axios.post('http://localhost:4001/api/v1/user/signup',formData);
    return response.data;
  }catch(error){
    console.error("Error in signup",error);
  }

};
export { fetchCourses,signup };