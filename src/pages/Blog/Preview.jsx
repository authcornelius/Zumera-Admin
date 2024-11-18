import { Button, Image } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { clearPreviewData } from "../../redux/slice/blogSlice";
import { useNavigate } from "react-router-dom";

function Preview() {
  const navigate = useNavigate()
  const previewData = useSelector((state) => state.blog.previewData);
  const [imageUrls, setImageUrls] = useState({
    image1: null,
    image2: null,
    image3: null
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (previewData?.image1?.file?.originFileObj) {
      setImageUrls(prev => ({
        ...prev,
        image1: URL.createObjectURL(previewData.image1.file.originFileObj)
      }));
    }
    if (previewData?.image2?.file?.originFileObj) {
      setImageUrls(prev => ({
        ...prev,
        image2: URL.createObjectURL(previewData.image2.file.originFileObj)
      }));
    }
    if (previewData?.image3?.file?.originFileObj) {
      setImageUrls(prev => ({
        ...prev,
        image3: URL.createObjectURL(previewData.image3.file.originFileObj)
      }));
    }

    // Cleanup URLs on component unmount

    return () => {
      Object.values(imageUrls).forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previewData]);

  const handlePublish = () => {
    // Your publish logic here
    dispatch(clearPreviewData());
  };

  return (
    <div className="text-center">
      <div className=" mt-10 px-10">
        <h1 className="my-5 font-semibold text-2xl">{previewData?.title}</h1>
        
        {imageUrls.image1 && <Image src={imageUrls.image1} className="!w-screen !h-fit" alt="Blog image 1" />}
        
        <p className=" text-start my-10 text-lg">{previewData?.paragraph1}</p>
        
        {imageUrls.image2 && <Image src={imageUrls.image2} className="!w-screen !h-fit" alt="Blog image 2" />}
        
        <p className=" text-start my-10 text-lg">{previewData?.paragraph2}</p>
        
        {imageUrls.image3 && <Image src={imageUrls.image3} className="!w-screen !h-fit" alt="Blog image 3" />}
        
        <p className=" text-start my-10 text-lg">{previewData?.paragraph3}</p>

        <div className="flex justify-end space-x-5">
          <Button 
            type="primary" 
            className="border-[#8d0a1f] hover:!border-[#8d0a20da] hover:!bg-transparent hover:!text-[#8d0a20da] bg-transparent text-[#8d0a20da]"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>

          <Button 
            type="primary" 
            className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]"
            // htmlType="submit"
            onClick={handlePublish}
          >
            Publish
          </Button>
        </div>
      </div>      
    </div>
  )
}

export default Preview
