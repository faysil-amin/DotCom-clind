import { useQuery } from "@tanstack/react-query";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";

const DashboardChart = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {} } = useQuery({
        queryKey: ["dashboard-growth"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard-growth");
            return res.data;
        },
    });

    const months = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Merge Lesson + User Data
    const chartData = months
        .map((month, index) => ({
            month,
            lessons:
                data.lessonGrowth?.find((item) => item.month === index)
                    ?.totalLessons || 0,
            users:
                data.userGrowth?.find((item) => item.month === index)?.totalUsers || 0,
        }))
        .filter((item) => item.month !== "");

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Growth Analytics
                </h2>
                <p className="text-gray-500 mt-1">
                    Monthly lesson and user growth overview
                </p>
            </div>

            <ResponsiveContainer width="100%" height={420}>
                <LineChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="5 5" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="lessons"
                        name="Lessons"
                        stroke="#22c55e"
                        strokeWidth={4}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="users"
                        name="Users"
                        stroke="#3b82f6"
                        strokeWidth={4}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardChart;