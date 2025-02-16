import { Star } from "lucide-react";

export default function CourseCard({ course }) {
  console.log("Card", course)
  return (
    <div className="bg-white rounded-lg my-4 shadow-md overflow-hidden w-[345px] hover:shadow-lg transition-shadow duration-300">
     <img
  src={course.image.url}
  alt={course.title}
  className="w-full aspect-square object-contain rounded-lg"
/>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
        <p className="text-gray-600 text-sm mt-1">By {course.educator}</p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < course.rating ? "text-yellow-500" : "text-gray-300"
              }
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">( reviews)</span>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">₹{course.price}</span>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
