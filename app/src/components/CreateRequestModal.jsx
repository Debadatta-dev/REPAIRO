import { useState, useEffect } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";

function CreateRequestModal({ onClose, onSuccess }) {

  const [description, setDescription] = useState("");
  const [shopId, setShopId] = useState("");
  const [image, setImage] = useState(null);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH SHOPS
  useEffect(() => {

    const fetchShops = async () => {

      try {

        const res =
          await API.get("/user/shops");

        setShops(res.data);

      } catch (err) {

        console.error(err);
      }
    };

    fetchShops();

  }, []);

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!description || !shopId) {
      alert("Fill all fields");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append(
        "description",
        description
      );

      formData.append(
        "shopId",
        shopId
      );

      if (image) {
        formData.append(
          "image",
          image
        );
      }

      await API.post(
        "/user/createrepairrequest",
        formData
      );

      onSuccess();
      onClose();

    } catch (err) {

      console.error(err);

      alert(
        err?.response?.data?.msg ||
        "Failed to create request"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4">

      <motion.div

        initial={{
          scale: 0.8,
          opacity: 0
        }}

        animate={{
          scale: 1,
          opacity: 1
        }}

        transition={{
          duration: 0.25
        }}

        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/10
          bg-[#111827]/95
          backdrop-blur-2xl
          shadow-[0_0_50px_rgba(139,92,246,0.25)]
          overflow-hidden
        "
      >

        {/* HEADER */}
        <div className="p-6 border-b border-white/10">

          <h2 className="
            text-3xl
            font-extrabold
            text-center
            bg-gradient-to-r
            from-indigo-400
            via-purple-400
            to-pink-500
            bg-clip-text
            text-transparent
          ">
            Create Request
          </h2>

          <p className="
            text-center
            text-gray-400
            mt-2
            text-sm
          ">
            Submit your repair issue
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* DESCRIPTION */}
          <div>

            <label className="
              block
              mb-2
              text-sm
              font-medium
              text-gray-300
            ">
              Problem Description
            </label>

            <textarea
              rows={4}
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                bg-white/5
                border
                border-white/10
                p-4
                text-white
                placeholder-gray-500
                resize-none
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500
                transition
              "
            />

          </div>

          {/* SHOP SELECT */}
          <div>

            <label className="
              block
              mb-2
              text-sm
              font-medium
              text-gray-300
            ">
              Select Repair Shop
            </label>

            <select
              value={shopId}
              onChange={(e) =>
                setShopId(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                bg-white/5
                border
                border-white/10
                p-4
                text-white
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500
              "
            >

              <option
                value=""
                style={{
                  color: "black"
                }}
              >
                Select Shop
              </option>

              {shops.map((shop) => (

                <option
                  key={shop._id}
                  value={shop._id}
                  style={{
                    color: "black"
                  }}
                >
                  {shop.name}
                </option>

              ))}

            </select>

          </div>

          {/* IMAGE */}
          <div>

            <label className="
              block
              mb-2
              text-sm
              font-medium
              text-gray-300
            ">
              Upload Image
            </label>

            <input
              type="file"
              onChange={(e) =>
                setImage(
                  e.target.files[0]
                )
              }
              className="
                w-full
                text-sm
                text-gray-300
                file:mr-4
                file:rounded-xl
                file:border-0
                file:bg-gradient-to-r
                file:from-indigo-500
                file:to-purple-600
                file:px-4
                file:py-3
                file:text-white
                hover:file:opacity-90
              "
            />

          </div>

          {/* BUTTONS */}
          <div className="
            flex
            flex-col
            sm:flex-row
            gap-3
            pt-2
          ">

            <button
              type="submit"
              disabled={loading}
              className="
                flex-1
                bg-gradient-to-r
                from-indigo-500
                to-pink-500
                py-3
                rounded-2xl
                font-semibold
                text-white
                hover:scale-[1.02]
                transition
                disabled:opacity-50
              "
            >

              {loading
                ? "Submitting..."
                : "Submit Request"}

            </button>

            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                bg-white/5
                border
                border-white/10
                py-3
                rounded-2xl
                text-gray-300
                hover:bg-white/10
                transition
              "
            >
              Cancel
            </button>

          </div>

        </form>

      </motion.div>

    </div>
  );
}

export default CreateRequestModal;