import React from 'react';

const PostBody = ({poster, content}) => {
    return (
        <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
            <p>{content ?? "No content available" }</p>
            <div className="flex items-center justify-center overflow-hidden">
              {
                poster && (
                    <img
                className="max-w-full"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
                alt="poster"
              />
                )
              }
            </div>
            <p>
              Grateful for the incredible experience of serving as the President
              of the Grand Jury board for this year's Digital Marketing Award
              organized by Bangladesh Brand Forum. Judging the best digital
              marketing campaigns was not just a responsibility but a journey of
              appreciation for innovation and creativity. The judging process,
              ensuring transparency, brought to light so many beautiful
              campaigns. Cheers to the dynamic world of digital marketing!
              sdfasd asdca sdfa sdca sdfa
            </p>
          </div>
    );
};

export default PostBody;