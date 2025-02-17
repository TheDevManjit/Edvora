import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button, Card } from "@mui/material";
import { useState, useEffect } from "react";

const courseVideos = {
  "Web Development": "TlB_eWDSMt4",
  "Data Science": "ua-CiDNNj30",
  "Python": "rfscVS0vtbw",
  "IT Certification": "3Xn6QxZ2X_w",
  "Leadership": "iUc3hJ4GsmY",
};

export default function CourseDetail() {
  const { category } = useParams();
  const [videoId, setVideoId] = useState(courseVideos[category] || courseVideos["Web Development"]);

  useEffect(() => {
    if (category && courseVideos[category]) {
      setVideoId(courseVideos[category]);
    } else {
      setVideoId(courseVideos["Data Science"]);
    }
  }, [category]);

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Left Section: Course Video */}
        <iframe
          className="w-full h-48 sm:h-64 rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={category || "Course Title"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* Right Section: Course Info */}
        <Card className="bg-gray-800 md:col-span-2 shadow-lg rounded-lg p-6">
          <Typography variant="h4" className="font-bold text-gray-800 mb-4">
            {category || "Course Title"}
          </Typography>
          <Typography variant="body1" className="text-black mb-4">
            Master {category} with industry experts. Learn from real-world projects, 
            covering advanced concepts & best practices.
          </Typography>
          <Typography className="text-orange-400 font-semibold">
            Language: Hindi (Hinglish)
          </Typography>
          <Typography className="text-blue-400 underline cursor-pointer mt-2">
            <Link to="#">Check this link</Link>
          </Typography>

          <ul className="list-disc list-inside mt-4 text-black space-y-2">
            <li>Learn essential concepts and real-world applications.</li>
            <li>Work on live projects with hands-on training.</li>
            <li>Master frameworks and industry-standard tools.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
