import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const { image, title, educator, rating, reviews, price } = course;

  return (
    <div className="bg-white rounded-lg my-4 shadow-md overflow-hidden w-[345px] hover:shadow-lg transition-shadow duration-300">
      {/* Course Image */}
      <img
        src={image?.url || "https://via.placeholder.com/345"} // Fallback Image
        alt={title}
        className="w-full aspect-square object-cover rounded-lg"
      />

      <div className="p-4">
        {/* Course Title */}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">By {educator}</p>

        {/* Ratings */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={index < Math.round(rating) ? "text-yellow-500" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">({reviews} reviews)</span>
        </div>

        {/* Price & Enroll Button */}
        <div className="mt-3 flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            ₹{price || "Free"} {/* Fallback price */}
          </span>

          <button
            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
            onClick={() => navigate(`/course/${encodeURIComponent(title)}`)} // Ensure proper URL encoding
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
