import React from 'react'
import Header from './Header'
import HeroCarousel from './Hero'
import Footer from './Footer'
import CardSlider from './CardSlider'
import Courses from './Courses'
import { Container } from '@mui/material'



function Home() {
  

    // useEffect(() => {
    //     const fetchCourses = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:4001/api/v1/course/getall");
    //             console.log("Fetched Data:", response.data);
    //         } catch (error) {
    //             console.error("Error in course Fetching:", error.message);
    //         }
    //     };
    //     fetchCourses();
    // }, []);

    

  
    return (
        <div className='bg-gradient-to-r from-cyan-50 from-0% via-blue-50 via-'>

            <Header />
            <Container className='p-6' maxWidth='xl'>
            <HeroCarousel />
            <div className='mb-15'> 
            <CardSlider className="" />
            </div>

            <Courses />
            </Container>
            <Footer />

        </div>
    )
}

export default Home