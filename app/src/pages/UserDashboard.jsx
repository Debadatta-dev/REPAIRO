import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import CreateRequestModal from "../components/CreateRequestModal";

function UserDashboard() {

  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [oldPassword, setOldPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [passwordLoading, setPasswordLoading] = useState(false);


  // FETCH REQUESTS
  const fetchRequests = async () => {

    try {

      const res = await API.get("/user/repairstatus");

      setRequests(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchRequests();

  }, []);


  // LOGOUT
  const handleLogout = () => {

    logout();

    navigate("/");
  };


  // CHANGE PASSWORD
  const handleChangePassword = async () => {

    try {

      if (!oldPassword || !newPassword) {

        alert("Fill all fields");

        return;
      }

      setPasswordLoading(true);

      const res = await API.post(
        "/user/changepassword",
        {
          oldPassword,
          newPassword
        }
      );

      alert(res.data.message);

      setShowPasswordModal(false);

      setOldPassword("");

      setNewPassword("");

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.msg ||
        "Failed to change password"
      );

    } finally {

      setPasswordLoading(false);
    }
  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-black to-[#020617] text-white relative overflow-hidden">

      {/* GLOBAL OVERLAY */}
      {showProfile && (
        <div
          className="
            fixed
            inset-0
            bg-black/30
            backdrop-blur-sm
            z-[100]
          "
          onClick={() => setShowProfile(false)}
        />
      )}


      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/20 blur-[140px] rounded-full pointer-events-none" />


      {/* HEADER */}
      <div className="relative z-[200] flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 px-6 md:px-10 pt-10">

        {/* LOGO */}
        <div>

          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-300 to-pink-500 bg-clip-text text-transparent">
            REPAIRO
          </h1>

          <p className="text-gray-400 mt-2 text-lg">
            Smart Repair Management
          </p>

        </div>


        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">

          {/* NEW REQUEST */}
          <button
            onClick={() => setShowModal(true)}
            className="
              px-6 py-4
              rounded-2xl
              bg-gradient-to-r
              from-indigo-500
              to-pink-500
              hover:scale-105
              transition-all
              duration-300
              font-semibold
              shadow-2xl
            "
          >
            + New Request
          </button>


          {/* PROFILE */}
          <div className="relative">

            {/* PROFILE BUTTON */}
            <button
              type="button"
              onClick={() =>
                setShowProfile(!showProfile)
              }
              className="
                w-16 h-16
                rounded-full
                bg-gradient-to-br
                from-indigo-500
                to-purple-500
                flex
                items-center
                justify-center
                text-2xl
                font-bold
                shadow-2xl
                relative
                z-[300]
              "
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </button>


            {/* PROFILE CARD */}
            {showProfile && (

              <div
                className="
                  absolute
                  top-20
                  right-0
                  w-[340px]
                  rounded-3xl
                  overflow-hidden
                  border
                  border-white/10
                  bg-[#0f172a]
                  shadow-2xl
                  z-[300]
                "
              >

                {/* TOP */}
                <div className="p-6 border-b border-white/10">

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-20 h-20
                        rounded-3xl
                        bg-gradient-to-br
                        from-indigo-500
                        to-pink-500
                        flex
                        items-center
                        justify-center
                        text-4xl
                        font-bold
                      "
                    >
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>

                      <h2 className="text-3xl font-bold">
                        {user?.name}
                      </h2>

                      <p className="text-gray-400 capitalize">
                        {user?.role}
                      </p>

                    </div>

                  </div>

                </div>


                {/* ACTIONS */}
                <div className="p-5 space-y-4">

                  {/* CHANGE PASSWORD */}
                  <button
                    type="button"
                    onClick={() => {

                      setShowPasswordModal(true);

                      setShowProfile(false);
                    }}
                    className="
                      w-full
                      p-4
                      rounded-2xl
                      bg-white/10
                      border
                      border-white/10
                      hover:bg-white/20
                      transition
                      text-left
                    "
                  >

                    <p className="font-semibold">
                      Change Password
                    </p>

                    <p className="text-sm text-gray-400">
                      Update your password
                    </p>

                  </button>


                  {/* LOGOUT */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      w-full
                      p-4
                      rounded-2xl
                      bg-red-500/10
                      border
                      border-red-500/20
                      hover:bg-red-500/20
                      transition
                      text-left
                    "
                  >

                    <p className="font-semibold text-red-300">
                      Logout
                    </p>

                    <p className="text-sm text-red-200/60">
                      Sign out from account
                    </p>

                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>


      {/* REQUESTS */}
      <div className="relative z-[1] px-6 md:px-10 pb-16 mt-12">

        {loading ? (

          <div className="text-center text-gray-400">
            Loading...
          </div>

        ) : requests.length === 0 ? (

          <div className="text-center text-gray-400 text-xl mt-24">
            No repair requests found
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {requests.map((req) => (

              <div
                key={req._id}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                  hover:scale-[1.02]
                  transition-all
                  duration-300
                  shadow-xl
                "
              >

                {/* TOP */}
                <div className="flex items-start gap-4">

                  <div
                    className="
                      w-14 h-14
                      rounded-2xl
                      bg-gradient-to-br
                      from-indigo-500
                      to-pink-500
                      flex
                      items-center
                      justify-center
                      text-2xl
                    "
                  >
                    🔧
                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">
                      Repair Request
                    </h2>

                    <p className="text-gray-400 text-sm">
                      {new Date(req.createdAt)
                        .toLocaleDateString()}
                    </p>

                  </div>

                </div>


                {/* DESC */}
                <div className="mt-6">

                  <p className="text-gray-300 text-lg">
                    {req.description}
                  </p>

                </div>


                {/* FOOTER */}
                <div className="mt-8 flex items-center justify-between">

                  <span
                    className="
                      px-5 py-2
                      rounded-full
                      bg-green-500/20
                      text-green-400
                      text-sm
                      capitalize
                      font-semibold
                    "
                  >
                    {req.status}
                  </span>

                  <button
                    onClick={() =>
                      navigate(
                        "/requestdetails",
                        { state: req }
                      )
                    }
                    className="
                      text-indigo-300
                      hover:text-white
                      transition
                      text-lg
                    "
                  >
                    View →
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>


      {/* PASSWORD MODAL */}
      {showPasswordModal && (

        <div
          className="
            fixed
            inset-0
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-[9999]
            px-4
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/10
              bg-[#0f172a]
              p-8
              shadow-2xl
            "
          >

            <h2 className="text-3xl font-bold mb-6">
              Change Password
            </h2>


            {/* OLD PASSWORD */}
            <div className="mb-4">

              <label className="block mb-2 text-sm text-gray-400">
                Old Password
              </label>

              <input
                type="password"
                value={oldPassword}
                onChange={(e) =>
                  setOldPassword(e.target.value)
                }
                placeholder="Enter old password"
                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  outline-none
                "
              />

            </div>


            {/* NEW PASSWORD */}
            <div className="mb-6">

              <label className="block mb-2 text-sm text-gray-400">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  outline-none
                "
              />

            </div>


            {/* BUTTONS */}
            <div className="flex gap-4">

              <button
                type="button"
                onClick={handleChangePassword}
                disabled={passwordLoading}
                className="
                  flex-1
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-500
                  to-pink-500
                  font-semibold
                "
              >
                {passwordLoading
                  ? "Updating..."
                  : "Update Password"}
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowPasswordModal(false)
                }
                className="
                  px-6
                  rounded-2xl
                  bg-white/10
                "
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}


      {/* CREATE REQUEST */}
      {showModal && (

        <CreateRequestModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchRequests}
        />
      )}

    </div>
  );
}

export default UserDashboard;