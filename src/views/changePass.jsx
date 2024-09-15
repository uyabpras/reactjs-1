import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../redux/actions/authActions"; 
import { Navigate } from "react-router-dom";

export function ChangePass() {
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.auth);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState(""); 
    const [retypePassword, setRetypePassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== retypePassword) {
            alert("New password and retype password do not match.");
            return;
        }

        if (currentPassword && newPassword) {
            dispatch(changePassword(user.id, token, newPassword ));
            Navigate(-1)
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="container md:w-1/3 flex flex-col items-center mx-auto mt-20 border rounded-lg bg-slate-100 shadow-md shadow-gray-300">
            <div className="flex flex-col items-center mb-20 mt-10 w-2/3">
                <div className="rounded-full w-32 h-32 bg-slate-500 flex items-center justify-center">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <h1 className="mt-5 text-2xl font-semibold text-center">{user.name || "name"}</h1>
                <span className="text-center">{user.email || "email"}</span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col md:w-2/3">
                <p>Current Password</p>
                <input
                    type="password"
                    name="current_password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="border rounded-md mb-10"
                />
                <p>New Password</p>
                <input
                    type="password"
                    name="new_password"
                    placeholder="New Password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border rounded-md mb-3"
                />
                <p>Re-Type New Password</p>
                <input
                    type="password"
                    name="retype_password"
                    placeholder="Retype Password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    className="border rounded-md mb-8"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-md mb-20"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
