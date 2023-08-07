import React from 'react';
import { Bounce } from 'react-awesome-reveal';

const ServiceSection = () => {
  return (
    <section className="bg-green-300 text-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service 1 */}
          <Bounce>  
          <div className="bg-green-500 h-72 rounded-lg p-6 shadow-xl">
            <div className="text-center mb-4">
            <svg
                  className="text-white h-12 w-12 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Language Courses</h3>
            <p className="text-center">
              Choose from a wide range of language courses tailored to your needs and proficiency level. Our experienced instructors will guide you through the learning process.
            </p>
          </div>
        </Bounce>

          {/* Service 2 */}
          <Bounce>  
          <div className="bg-green-500 h-72 rounded-lg p-6 shadow-xl">
            <div className="text-center mb-4">
            <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-16 w-16 mx-auto"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM15 8a6 6 0 00-6-6 6 6 0 00-6 6M4 20h4a1 1 0 011 1h6a1 1 0 011-1h4M12 20V10"
  />
</svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Exam Preparation</h3>
            <p className=" text-center">
              Get ready for language proficiency exams with our specialized preparation courses. We provide comprehensive study materials and practice tests to help you succeed.
            </p>
          </div>
        </Bounce>

          {/* Service 3 */}
          <Bounce>  
          <div className="bg-green-500 h-72 rounded-lg p-6 shadow-xl">
            <div className="text-center mb-4">
            <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-16 w-16 mx-auto"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M10 15v4l5-2.5L20 19V5l-5 2.5L10 5V9"
  />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M16 15h2a2 2 0 012 2v4M8 15H4a2 2 0 00-2 2v4"
  />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M20 9l-2-1-2 1-2-1-2 1-2-1M12 11l-2 1-2-1"
  />
</svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Corporate Training</h3>
            <p className=" text-center">
              We offer customized language training programs for businesses and organizations. Enhance communication within your team and improve your company's language skills.
            </p>
          </div>
        </Bounce>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;