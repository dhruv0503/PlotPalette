import React from 'react';

const CommentSection = () => {
    return (
        <div className="container p-1 mx-auto mt-8">
            <div className="bg-custom-10 p-6 rounded-lg shadow-md">
              
                <form action="#" method="POST" className="mb-4">
                    <textarea
                        name="comment"
                        id="comment"
                        rows="4"
                        placeholder="Add a comment..."
                        className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                    <button type="submit" className="mt-2 px-4 py-2 bg-custom-50 text-white rounded hover:bg-black">
                        Post Comment
                    </button>
                </form>

                
                <div className="space-y-4">
                     <div className="flex">
                        <img src="https://via.placeholder.com/40" alt="User Avatar" className="rounded-full w-8 h-8 mr-2" />
                        <div>
                            <p className="font-semibold">John Doe</p>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla justo id tortor feugiat...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
