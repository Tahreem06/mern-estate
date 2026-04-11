import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { supabase } from "../supabase"; // Ensure this path matches your supabase.js file

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  // 1. Add the states 
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError);
  
  // 2. useEffect to trigger upload when a file is selected
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // 3. Supabase Upload Function
  const handleFileUpload = async (file) => {
    setFileUploadError(false);
    const fileName = new Date().getTime() + file.name;

    const { data, error } = await supabase.storage
      .from('listing-images') // Match your Supabase bucket name
      .upload(fileName, file, {
        onUploadProgress: (progress) => {
          const percentage = Math.round((progress.loaded / progress.total) * 100);
          setFilePerc(percentage);
        },
      });

    if (error) {
      setFileUploadError(true);
      return;
    }

    // Get the Public URL
    const { data: urlData } = supabase.storage
      .from('listing-images')
      .getPublicUrl(fileName);

    setFormData({ ...formData, avatar: urlData.publicUrl });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-6"> {/* Added gap-4 for spacing */}
        <input 
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files[0])} // Capture the file
        />
        
        <img 
          onClick={() => fileRef.current.click()} 
          src={formData.avatar || currentUser.avatar} // Show new upload or current avatar
          alt="profile" 
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        {/* 4. Display Upload Status Messages */}
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error Image upload (image must be less than 2 MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg" />
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg" />
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" />
        
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
