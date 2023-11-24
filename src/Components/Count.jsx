import { FcCheckmark } from "react-icons/fc";
import { FaUserClock } from "react-icons/fa";
import { FaParachuteBox } from "react-icons/fa";
const Count = () => {
    return (
        <div>
            <div className="stats shadow ">

                <div className="stat">
                    <div className="stat-figure text-primary text-3xl">
                        <FcCheckmark />
                    </div>
                    <div className="stat-title">Booked</div>
                    <div className="stat-value text-primary">25.6K</div>

                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary text-3xl">
                       <FaParachuteBox></FaParachuteBox>
                    </div>
                    <div className="stat-title"> Delivered</div>
                    <div className="stat-value text-secondary">2.6M</div>

                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary text-3xl">
                        <FaUserClock />
                    </div>
                    <div className="stat-title">User</div>
                    <div className="stat-value">86%</div>


                </div>

            </div>

        </div>
    );
};

export default Count;